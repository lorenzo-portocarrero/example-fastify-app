import { FastifyRequest, FastifyReply } from "fastify";
import CityService from "../services/CityService";

import WeatherService from "../services/WeatherService";

class WeatherController {
  async getTemperature(request: FastifyRequest, reply: FastifyReply) {
    const missingParams: string[] = [];

    const city = request.query["city"] || missingParams.push("city");
    const state = request.query["state"] || missingParams.push("state");
    const country = request.query["country"] || missingParams.push("country");

    if (missingParams.length > 0) {
      return reply.code(400).send({
        message: `Missing required parameters: ${missingParams.join(", ")}`,
      });
    }

    const { lat, lon } = await CityService.getCoordinates(city, state, country);
    const temperature = await WeatherService.getTemperature(lat, lon);

    return reply.send({
      temperature: temperature,
      isGreaterThanFifteenDegrees: temperature > 15,
    });
  }
}

export default new WeatherController();
