import "dotenv/config";
import { build } from "./app";

const server = build({
  logger: process.env.ENVIRONMENT === "development",
  prettyPrint: true,
});

server.listen(process.env.PORT ?? 80, (err, address) => {
  if (err) {
    server.log.error(err);
  }

  server.log.info(`Server listening at ${address}`);
});
