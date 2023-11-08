require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id"
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    // `SELECT * FROM restaurants WHERE id = ${req.params.id}` - never do this!
    // string templating or concatenation make your db vulnerable
    const restaurant = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );

    res.status(201).json({
      status: "success",
      // results: restaurant.rows.length,
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(202).send({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//updeate restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(203).send({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
    res.send("hello");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/restaurants/:id/add-review", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO reviews (name, rating, review, restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.body.name, req.body.rating, req.body.review, req.params.id]
    );
    res.status(202).send({
      status: "success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3008;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
//atticus was here
