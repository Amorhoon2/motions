// WebcamPoseNet.js

import React, { useEffect, useRef } from 'react';
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";

const WebcamPoseNet = ({ onPoseDetected }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const runPosenet = async () => {
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.5
      });

      setInterval(() => {
        detect(net);
      }, 300);
    };

    const detect = async (net) => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const pose = await net.estimateSinglePose(video);
        onPoseDetected(pose);
      }
    };

    runPosenet();
  }, [onPoseDetected]);

  return (
    <div style={{ position: 'relative', height: '480px' }}>
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '640px',
          height: '100%',
        }}
        mirrored={true}
      />
    </div>
  );
};

export default WebcamPoseNet;
