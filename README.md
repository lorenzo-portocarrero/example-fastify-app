# Example Fastify App

## Set Up

Install the dependencies

```bash
npm install
```

Start the server

```bash
npm start
```

The app will run in http://localhost/ by default

To run the tests execute

```bash
npm run test
```

There's one endpoint implemented that will return the temperature of a desired city: http://localhost/weather/temperature?city=Rio%20Cuarto&state=Cordoba&country=Argentina

You can also change the URL parameters to get the temperature for another city: http://localhost/weather/temperature?city=Rosario&state=Santa%20Fe&country=Argentina
