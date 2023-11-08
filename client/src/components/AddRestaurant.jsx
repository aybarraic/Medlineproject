import React, { useEffect, useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import NameInput from "./NameInput";
import LocationInput from "./LocationInput";
import ScoreRangeSelect from "./ScoreRangeSelect";
import AddButton from "./AddButton";

const AddRestaurant = (props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("default");
  const { addRestaurant } = useContext(RestaurantsContext);
  const [inputValue, setInputValue] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  
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

  useEffect(() => {
    setFilteredRestaurants(
      restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, restaurants]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/restaurants/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      <Form>
        <Row>
          <Col>
            <NameInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              filteredRestaurants={filteredRestaurants}
              setName={setName}
              type="text"
              placeholder="comment"
            />
          </Col>
          <Col>
            <LocationInput 
            location={location} 
            setLocation={setLocation} />
          </Col>
          <Col>
            <ScoreRangeSelect
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              
              
            />
          </Col>
          <Col>
            {/* Add a new input field for additional data */}
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="comment"
                // Add state and set function for this input
              />
            </Form.Group>
          </Col>
          <Col>
            <AddButton handleSubmit={handleSubmit} />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddRestaurant;
