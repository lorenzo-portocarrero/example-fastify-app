import axios from "axios";

const GeocodingAPI = axios.create({
  baseURL: process.env.GEOCODING_API_URL,
});

class CityService {
  async getCoordinates(city: string, state: string, country: string) {
    const { data } = await GeocodingAPI.get(null, {
      params: {
        q: `${city}, ${state}, ${country}`,
        appid: process.env.OPENWEATHER_API_KEY,
      },
    });

    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  }
}

export default new CityService();
