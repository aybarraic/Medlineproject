import React from 'react';
import Button from "react-bootstrap/Button";


const AddButton = ({ handleSubmit }) => (
  <Button
    onClick={handleSubmit}
    className="btn btn-outline-primary"
    variant="outline-success"
   
  >
    Add
  </Button>
);

export default AddButton;
