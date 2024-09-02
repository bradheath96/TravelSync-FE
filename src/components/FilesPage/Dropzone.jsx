import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../../axios";
import { useContext } from "react";
import { ItineraryContext } from "../Context/ItineraryContextProvider";
import UploadAnimation from "./UploadAnimation";

export default function MyDropzone({ setUpdateFiles }) {
  const { currentItinerary } = useContext(ItineraryContext);
  const [isUploading, setIsUploading] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true);
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });

    uploadFile(currentItinerary.id, formData).then((response) => {
      setIsUploading(false);
      setUpdateFiles(true);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return isUploading ? (
    <UploadAnimation />
  ) : (
    <div {...getRootProps()} className="file_input">
      <input {...getInputProps()} />
      <div className="drop-area">
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}
