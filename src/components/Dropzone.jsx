import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../utils/axios";
import { GroupItineraryContext } from "./ItineraryContextProvider";

export default function MyDropzone() {
  const { currentItineraryId } = useContext(GroupItineraryContext);

  const onDrop = useCallback((acceptedFiles) => {
    if (currentItineraryId) {
      console.log(acceptedFiles);
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append("files", file);
      });
      console.log(currentItineraryId, "ID");

      return uploadFile(currentItineraryId, acceptedFiles);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
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
