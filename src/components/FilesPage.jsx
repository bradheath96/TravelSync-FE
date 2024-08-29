import React from "react";
import MyDropzone from "./Dropzone";

export default function FilesPage() {
  return (
    <div className="filePage">
      <h1>Holiday Files</h1>
      <MyDropzone />
      <h3>Your Group Files:</h3>
      <div className="filesListContainer"></div>
    </div>
  );
}
