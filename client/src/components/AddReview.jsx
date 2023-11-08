import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/restaurants/${id}/add-review`, {
        review,
      });
      console.log(response);
      navigate('/restaurants/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-2">
      <form>
        <div className="form-group mb-3">
          <label htmlFor="review">Comments</label>
          <textarea
            id="review"
            rows="7"
            className="form-control"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={handleSubmitReview}
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
