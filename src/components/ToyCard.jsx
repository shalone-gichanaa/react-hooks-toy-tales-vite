import React, { useState } from "react";

function ToyCard({ toy, setToys }) {
  const [likes, setLikes] = useState(toy.likes);

  function handleLike() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setLikes(updatedToy.likes);
      });
  }

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prev) => prev.filter((t) => t.id !== toy.id));
    });
  }

  return (
    <li data-testid="toy-card">
      <h2 className="name">{toy.name}</h2>

      <img
        className="toy-avatar"
        src={toy.image}
        alt={toy.name}
      />

      <p>{likes} Likes </p>

      <button onClick={handleLike}>
        Like &lt;3
      </button>

      <button onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </li>
  );
}

export default ToyCard;