import { HTTPMethods } from "fastify";
import WeatherController from "../controllers/WeatherController";

const routes = [
  {
    url: "/weather/temperature",
    method: "GET" as HTTPMethods,
    handler: WeatherController.getTemperature,
  },
];

export default routes;
