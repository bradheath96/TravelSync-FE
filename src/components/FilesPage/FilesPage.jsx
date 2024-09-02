import React from "react";
import MyDropzone from "./Dropzone";
import { useNavigate } from "react-router-dom";
import FilesList from "./FilesList";
import { useState } from "react";
import BottomNav from "../NavBar/BottomNav";
import TopNav from "../NavBar/TopNav";

export default function FilesPage() {
  const navigate = useNavigate();
  const [updateFiles, setUpdateFiles] = useState(false);

  return (
    <div className="filePage">
      <TopNav />
      <h1>Holiday Files</h1>
      <MyDropzone setUpdateFiles={setUpdateFiles} />
      <h3>Your Itinerary Files:</h3>
      <FilesList setUpdateFiles={setUpdateFiles} updateFiles={updateFiles} />
      <BottomNav />
    </div>
  );
}
