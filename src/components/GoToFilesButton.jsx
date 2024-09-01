import React from "react";
import fileImage from "../assets/files.png";
import { useNavigate } from "react-router-dom";

export default function GoToFilesButton() {
  const navigate = useNavigate();

  function handleFilesPageClick() {
    navigate("/files_page");
  }

  return (
    <button
      className="goToFilesButton bottomNavButton"
      onClick={handleFilesPageClick}
    >
      <img src={fileImage} alt="go to files button" />
    </button>
  );
}
