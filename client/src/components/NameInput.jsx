import React, { useState } from "react";

const NameInput = ({
  inputValue,
  setInputValue,
  filteredRestaurants,
  setName,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setName(e.target.value);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input type="text" value={inputValue} onChange={handleChange} />
      {isHovered && (
        <div>
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => {
                setName(restaurant.name);
                setInputValue(restaurant.name);
              }}
            >
              {restaurant.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NameInput;
