import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ItineraryContext } from "./ItineraryContextProvider";
import { getFiles } from "../axios";
import deleteBin from "../assets/deleteBin.png";
import documentIcon from "../assets/document.png";
import BottomNav from "./BottomNav";

export default function FilesList({ updateFiles, setUpdateFiles }) {
  const { currentItinerary } = useContext(ItineraryContext);
  const [currentFiles, setCurrentFiles] = useState([]);

  useEffect(() => {
    getFiles(currentItinerary.id).then((data) => {
      console.log(data);
      setCurrentFiles(data);
      setUpdateFiles(false);
    });
  }, [updateFiles]);

  return (
    <div className="filesListContainer">
      <ul>
        {currentFiles.map((file) => (
          <li key={file.id} className="savedFile">
            <a href={file.file_path} download>
              <img src={documentIcon} alt="pdf" className="documentIcon" />
            </a>
            <p>{file.file_name}</p>
            <img src={deleteBin} className="binImg" alt="delete button" />
          </li>
        ))}
      </ul>
    </div>
  );
}
