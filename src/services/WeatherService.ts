import axios from "axios";

const OneCallAPI = axios.create({
  baseURL: process.env.ONECALL_API_URL,
});

enum TemperatureUnit {
  KELVIN = "standard",
  CELSIUS = "metric",
  FAHRENHEIT = "imperial",
}

class WeatherService {
  async getTemperature(
    latitude: number,
    longitude: number,
    unit: TemperatureUnit = TemperatureUnit.CELSIUS
  ) {
    const { data } = await OneCallAPI.get(null, {
      params: {
        lat: latitude,
        lon: longitude,
        units: unit,
        appid: process.env.OPENWEATHER_API_KEY,
      },
    });

    return data.current.temp;
  }
}

export default new WeatherService();
