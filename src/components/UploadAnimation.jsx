import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/uploadAnimation.json";

export default function UploadAnimation() {
  return (
    <div>
      <Lottie
        animationData={animationData}
        loop={true}
        className="uploadAnimation"
      />
    </div>
  );
}
