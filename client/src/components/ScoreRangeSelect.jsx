import React from 'react';

const ScoreRangeSelect = ({ priceRange, setPriceRange }) => (
  <select
    className="custom-select form-control"
    value={priceRange}
    onChange={(e) => setPriceRange(e.target.value)}
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
);

export default ScoreRangeSelect;
