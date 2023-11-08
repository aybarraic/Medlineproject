import React, { useState } from 'react';

const EditableTable = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 },
  ]);

  const [editingId, setEditingId] = useState(null);

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleSaveClick = (id, updatedData) => {
    // Update the data in the state
    const updatedItems = data.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setData(updatedItems);

    // Clear the editing flag
    setEditingId(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              {editingId === item.id ? (
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleSaveClick(item.id, { name: e.target.value })}
                />
              ) : (
                item.name
              )}
            </td>
            <td>
              {editingId === item.id ? (
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleSaveClick(item.id, { price: parseFloat(e.target.value) })}
                />
              ) : (
                item.price
              )}
            </td>
            <td>
              {editingId === item.id ? (
                <button onClick={() => handleSaveClick(item.id, {})}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(item.id)}>Edit</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
