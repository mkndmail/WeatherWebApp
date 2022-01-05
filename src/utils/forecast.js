import request from "request";
const forecast = (latitude, longitude, callback) => {
  console.log("Inside weather");
  const url =
    "http://api.weatherstack.com/current?access_key=03e87cf96a38d102a582638821d2ef61&query=" +
    latitude +
    "," +
    longitude;
  console.log(url);
  request({ url, json: true }, (error, response, { location, current }) => {
    if (error) {
      callback("Unable to connect to weather service.");
    } else if (response.body.error) {
      callback(response.body.error.info);
    } else {
      const { name, country, region } = location;
      const { temperature, feelslike } = current;
      callback(undefined, {
        place: name,
        country,
        region,
        temperature,
        forecast:
          current.weather_descriptions[0] +
          ". It's currently " +
          temperature +
          " degrees out. and It feels like " +
          feelslike +
          " degrees out",
      });
    }
  });
};
export default forecast;
