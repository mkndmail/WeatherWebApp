import path from "path";
import express from "express";
import hbs from "hbs";
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";
const publicpath = path.join(
   __dirname,
  "public"
);
const viewsPath = path.join(
   __dirname,
  "templates/views"
);
const partialsPath = path.join(
<<<<<<< HEAD
 __dirname,
=======
   __dirname,
>>>>>>> 3200273dd3fbdf98091fe27d17854bcec85e65cd
  "templates/partials"
);


const app = express();
app.use(express.static(publicpath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    author: "Mukund Gururani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    path: "../images/robot.png",
    title: "About",
    author: "Mukund Gururani",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    author: "Mukund Gururani",
    message: "Our reprentatives are already reviewing your query kindly wait.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address" });
  }
  geocode(req.query.address, (error, {latitude,longitude,place}={}) => {
    if (error) {
      res.send({error});
    } else {
      console.log(latitude,longitude,place);
      forecast(latitude,longitude,(error,data={})=>{
        if (error) {
          return res.send({error})
        }
        return res.send({
          forecast:data.forecast,
          location: `${data.place}`,
          address:req.query.address
        })
      })
    }
  });
  
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Please provide a search term " });
  }
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    author: "Mukund Gururani",
    errorMessage: "The help page you are looking is not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    author: "Mukund Gururani",
    errorMessage: "The page you are looking is not found",
  });
});
app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
