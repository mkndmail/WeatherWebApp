console.log("Client site javascript file is loaded");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const message = document.querySelector("#message");
const error = document.querySelector("#error");
message.textContent = "";
error.textContent = "";
const fetchLocation = (location) => {
    message.textContent = "Loading..."
  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          error.textContent = data.error;
          message.textContent = "";
          return console.log(data.error);
        } else {
          message.textContent = data.forecast;
          error.textContent = data.location+", "+data.address;
          console.log(data);
        }
      });
    }
  );
};
weatherform.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  console.log(location);
  fetchLocation(location);
});
