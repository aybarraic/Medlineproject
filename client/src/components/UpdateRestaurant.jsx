import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("default");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
        const { restaurant } = response.data.data;
        setName(restaurant.name);
        setLocation(restaurant.location);
        setPriceRange(restaurant.price_range);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestaurantFinder.put(`/restaurants/${id}`, {
        name: name,
        location: location,
        price_range: priceRange,
      });
      navigate("/restaurants/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <div className="form-group mb-4">
          <label htmlFor="name">Standard</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onInput={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="location">Criteria</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onInput={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="price_range">Score</label>
          <select
            id="price_range"
            className="custom-select form-select"
            value={priceRange}
            onInput={(e) => {
              setPriceRange(e.target.value);
            }}
          >
            <option value="default" disabled>
              Score
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
