import React from "react";
import ItineraryList from "./ItineraryList";
import HomeHeader from "./HomeHeader";
import ReturnToMap from "./ReturnToMap";
import { useContext, useState } from "react";
import { GroupItineraryContext } from "./ItineraryContextProvider";

export default function Itinerary_Page() {
  const { currentGroup, currentItineraryTitle } = useContext(
    GroupItineraryContext
  );

  const [fileUploadForm, setFileUploadForm] = useState(false)

  const [file, setFile] = useState(null)

  function handleClick(){
    setFileUploadForm(!fileUploadForm)
  }

  function handleSubmit(event){
    event.preventDefault()
    console.log(file)
    
  }

  function handleFileChange(event){
    console.log(event.target, 'event.target')
    setFile(event.target.files[0])
  }

  return (
    <div className="itineraryPage">
      <HomeHeader />
      <h1 className="itineraryTitle">{currentItineraryTitle}</h1>
      <button className="styled-button" onClick={handleClick}>File Upload</button>
      {fileUploadForm && <form onSubmit={handleSubmit}><input type="file" onChange={handleFileChange} accept="image/*,video/*,application/pdf" /><button type="submit">Upload</button></form>}
      <ItineraryList />
      <ReturnToMap />
    </div>
  );
}
