import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import NewRow from './NewRow';
import AddRestaurant from '../components/AddRestaurant';
import '../index.css';

const RestaurantsList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/restaurants/");
        setRestaurants(response.data.data.restaurants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/restaurants/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-light table-striped">
        <thead>
          <tr>
            <th scope="col">Standard</th>
            <th scope="col">Criteria</th>
            <th scope="col">Score</th>
            <th scope="col">Comments</th>
            
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <NewRow 
                key={restaurant.id} 
                restaurant={restaurant} 
                handleUpdate={handleUpdate} 
                handleDelete={handleDelete} 
                handleRestaurantSelect={handleRestaurantSelect} 
              />
            ))}
    
        </tbody>
      </table>
      <AddRestaurant/>
    </div>
  );
};

export default RestaurantsList;
