import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((prev) => !prev);
  }

  useEffect(() => {
  fetch("http://localhost:3001/toys")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setToys(data);
      }
    })
    .catch(() => setToys([]));
}, []);
  return (
    <>
      <Header />

      {showForm && (
        <ToyForm toys={toys} setToys={setToys} />
      )}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer toys={toys} setToys={setToys} />
    </>
  );
}

export default App;