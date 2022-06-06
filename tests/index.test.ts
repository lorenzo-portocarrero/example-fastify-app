import "dotenv/config";
import { build } from "../src/app";

const app = build();

describe("Weather API", () => {
  test("temperature endpoint should return status 400 when a parameter is missing", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/weather/temperature",
    });

    expect(response.statusCode).toBe(400);
  });

  test("temperature endpoint should return a correct response when passed a correct city, state and country", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/weather/temperature`,
      query: {
        city: "Rio Cuarto",
        state: "Cordoba",
        country: "Argentina",
      },
    });

    expect(response.statusCode).toBe(200);
    expect(typeof JSON.parse(response.payload).temperature).toBe("number");
    expect(
      typeof JSON.parse(response.payload).isGreaterThanFifteenDegrees
    ).toBe("boolean");
  });

  test("temperature endpoint should return a faster response from cache on the second hit", async () => {
    const getExecutionTime = async (fn: Function, args: Object[]) => {
      const start = Date.now();
      await fn(...args);
      return Date.now() - start;
    };

    const functionArguments = [
      {
        method: "GET",
        url: `/weather/temperature`,
        query: {
          city: "Rosario",
          state: "Santa Fe",
          country: "Argentina",
        },
      },
    ];

    const firstHitExecutionTime = await getExecutionTime(
      app.inject,
      functionArguments
    );

    const secondHitExecutionTime = await getExecutionTime(
      app.inject,
      functionArguments
    );

    expect(firstHitExecutionTime).toBeGreaterThan(secondHitExecutionTime);
  });
});
