import React, { useRef } from "react";

const Photo = () => {
  const videoRef = useRef(null);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  return (
    <div>
      <button onClick={handleStartCamera}>Start Camera</button>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

export default Photo;
