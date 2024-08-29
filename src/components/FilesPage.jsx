import React from "react";
import MyDropzone from "./Dropzone";
import deleteBin from "../assets/deleteBin.png";
import documentIcon from "../assets/document.png";
import { useNavigate } from "react-router-dom";
import FlightTickets from "../assets/FlightTickets.pdf";

export default function FilesPage() {
  const navigate = useNavigate();
  function handleGoToItineraryClick() {
    navigate(`/itinerary_page`);
  }
  //  a download pdf option
  return (
    <div className="filePage">
      <button
        className="return-button fileReturnButton"
        onClick={handleGoToItineraryClick}
      >
        Return
      </button>
      <h1>Holiday Files</h1>
      <MyDropzone />
      <h3>Your Group Files:</h3>
      <div className="filesListContainer">
        <ul>
          <li className="savedFile">
            <a href={FlightTickets} download>
              <img src={documentIcon} alt="pdf" className="documentIcon" />
            </a>
            <p>FlightTickets.pdf</p>
            <img src={deleteBin} className="binImg" alt="delete button" />
          </li>
          <li className="savedFile">
            <img src={documentIcon} alt="pdf" className="documentIcon" />
            <p>AirbnbBooking.pdf</p>
            <img src={deleteBin} className="binImg" alt="delete button" />
          </li>
          <li className="savedFile">
            <img src={documentIcon} alt="pdf" className="documentIcon" />
            <p>VISA-Granted.pdf</p>
            <img src={deleteBin} className="binImg" alt="delete button" />
          </li>
        </ul>
      </div>
    </div>
  );
}
