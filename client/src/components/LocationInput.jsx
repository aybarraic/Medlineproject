import React from 'react';

const LocationInput = ({ location, setLocation }) => (
  <input
    type="text"
    className="form-control"
    placeholder="location"
    value={location}
    onInput={(e) => setLocation(e.target.value)}
  />
);

export default LocationInput;
