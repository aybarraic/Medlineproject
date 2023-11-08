import React from "react";
import Header from "../components/Header";
// import AddRestaurant from "../components/AddRestaurant";
import RestaurantsList from "../components/RestaurantsList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


const HomePage = () => {
  return (
    <Container fluid>
      <div>
        <Header />
        <Row>
            <RestaurantsList />
        </Row>
      </div>
    </Container>
  );
};

export default HomePage;
