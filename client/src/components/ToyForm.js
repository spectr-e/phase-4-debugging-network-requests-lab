import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newToy = {
      ...formData,
      likes: 0,
    };

    const response = await fetch("/toys", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    });
    const data = await response.json();
    if (response.ok) {
      setFormData({
        name: "",
        image: "",
      });
      onAddToy(data);
    } else {
      setErrors((errors) => [...errors, data.error]);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          onChange={handleChange}
          value={formData.image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        {errors.length > 0 && (
          <ul
            style={{ color: "yellow", fontWeight: "bold", listStyle: "none" }}
          >
            {errors.map((error) => (
              <li key={Math.random()}>{error}</li>
            ))}
          </ul>
        )}
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
