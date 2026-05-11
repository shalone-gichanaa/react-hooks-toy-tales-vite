import React, { useState } from "react";

function ToyForm({ toys, setToys }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        setToys((prev) => [...prev, createdToy]);
      });

    setFormData({
      name: "",
      image: "",
    });
  }

  return (
    <form className="add-toy-form" onSubmit={handleSubmit}>
      <h3>Create New Toy</h3>

      <input
        type="text"
        name="name"
        placeholder="Enter a toy's name..."
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        placeholder="Enter a toy's image URL..."
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default ToyForm;