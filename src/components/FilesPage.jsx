import React from "react";
import MyDropzone from "./Dropzone";
import deleteBin from "../assets/deleteBin.png";
import documentIcon from "../assets/document.png";

export default function FilesPage() {
  return (
    <div className="filePage">
      <h1>Holiday Files</h1>
      <MyDropzone />
      <h3>Your Group Files:</h3>
      <div className="filesListContainer">
        <ul>
          <li className="savedFile">
            <img src={documentIcon} alt="pdf" className="documentIcon" />
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
