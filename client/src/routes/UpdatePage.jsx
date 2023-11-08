import UpdateRestaurant from "../components/UpdateRestaurant";
import Header from "../components/Header";
import React, { useContext, useEffect } from "react";
import { RestaurantsContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";

const RestaurantUpdate = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setSelectedRestaurant]);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <Header text={selectedRestaurant.restaurant.name} />
        </>
      )}
      <h1 className="text-center">Update Restaurant</h1>
      <UpdateRestaurant />
    </div>
  );
};

export default RestaurantUpdate;
