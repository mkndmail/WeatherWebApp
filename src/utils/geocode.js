import request from "request";
const geocode = (place, callback,) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(place) +
    ".json?access_token=pk.eyJ1IjoibXltYXBzYm94IiwiYSI6ImNreDAybWwzczE0YW8ydWxhMHQ5Yzdqb3cifQ.bKMN5hDiJoNhcSAakI1TgA";
  console.log("MapBoxUrl", url);
  request({ url, json: true }, (error, { message }={}, { features }={}) => {
    if (error) {
      callback("Unable to connect. Please try again");
    } else if (message) {
      callback(message);
    } else {
      if (features.length > 0) {
        callback(undefined, {
          latitude: features[0].center[1],
          longitude: features[0].center[0],
          place: features[0].place_name,
        });
      } else {
        callback(
          "No results found for the searched query. Try again with a new search"
        );
      }
    }
  });
};

export default geocode;
