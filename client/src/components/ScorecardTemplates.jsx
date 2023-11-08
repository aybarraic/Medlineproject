import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate } from "react-router-dom";


function AuditTemplate() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/templates')
      .then(response => {
        setTemplates(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, []);

    const handleUpdate = async (id, name, categories, criteria) => {
    e.stopPropagation();
    navigate(`/criteria_for_individuals/${id}/update`);
  };

  const handleDelete = async (id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`criteria_for_individuals/${id}`);
      setTemplates(templates.filter((template) => template.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {templates.map(template => (
        <div key={template.id}>
          <h2 style={{display: "inline-block"}}>{template.name}</h2>
          <span style={{float: "right"}}>Created by: {template.creator}</span> 
          <h3>Subject: {template.subject}</h3> 
          <table>
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Scoring Method</th> 
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {template.categories.map((category, index) => (
                <tr key={index}>
                  <td>{category}</td>
                  <td>{template.criteria[index]}</td>
                  <td>
                    <button onClick={() => handleUpdate(template.id, template.name, template.categories, template.criteria)}>Update</button> 
                    <button onClick={() => handleDelete(template.id)}>Delete</button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AuditTemplate;
