import React from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  function handleHomeClick() {
    navigate("/");
  }
  return <button onClick={handleHomeClick}>Home</button>;
}
