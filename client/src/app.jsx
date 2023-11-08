import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage";
import RestaurantUpdate from "./routes/UpdatePage";
import { RestaurantsContextProvider } from "./context/RestaurantContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} exact />
            <Route
              exact
              path="/restaurants/:id/update"
              element={<RestaurantUpdate/>}
            />
            <Route
              exact
              path="/restaurants/:id"
              element={<RestaurantDetailsPage/>}
            />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
