import React from 'react';
import StarRating from './StarRating';
import '../index.css';

const NewRow = ({ restaurant, handleUpdate, handleDelete, handleRestaurantSelect }) => {
  const priceRangeValues = ['1', '2', '3', '4', '5'];

  return (
    <tr onClick={() => handleRestaurantSelect(restaurant.id)}>
      <td className="align-middle">{restaurant.name}</td>
      <td className='lightgray'>{restaurant.location}</td>
      <td className='darkgray'>{priceRangeValues[restaurant.price_range - 1]}</td>
  
      <td>
        <StarRating
          rating={restaurant.average_rating}
          quantity={restaurant.count}
        />
      </td>
      <td>
        <button
          onClick={(e) => handleUpdate(e, restaurant.id)}
          className="btn btn-outline-primary"
          variant="outline-success"
        >
          Update
        </button>
      </td>
      <td>
        <button
          onClick={(e) => handleDelete(e, restaurant.id)}
          className="btn btn-outline-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default NewRow;
