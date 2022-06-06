import fastify, { FastifyInstance } from "fastify";
import cache from "./plugins/cache";
import routes from "./routes";

function build(options = {}): FastifyInstance {
  const app = fastify(options);

  app.register(cache);

  routes.forEach((route) => {
    app.route(route);
  });

  return app;
}

export { build };
