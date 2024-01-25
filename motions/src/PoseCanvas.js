// PoseCanvas.js

import React, { useEffect, useRef } from 'react';
import { drawKeypointsFlipped, drawKeypoints, drawSkeleton } from './utilities';

const PoseCanvas = ({ pose, videoWidth, videoHeight, sensitivity }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const drawCanvas = () => {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const centerX = videoWidth / 2;
      drawKeypointsFlipped(pose.keypoints, 0.5, ctx, centerX);
      drawKeypoints(pose.keypoints, 0.5, ctx);
      drawSkeleton(pose.keypoints, 0.5, ctx);

      drawLine(ctx, centerX, videoHeight, "blue");
      if (sensitivity > 0) {
        drawLine(ctx, centerX + sensitivity, videoHeight, "pink");
        drawLine(ctx, centerX - sensitivity, videoHeight, "pink");
      }
    };

    drawCanvas();
  }, [pose, videoWidth, videoHeight, sensitivity]);

  const drawLine = (ctx, X, Y, color) => {
    ctx.beginPath();
    ctx.moveTo(X, 0);
    ctx.lineTo(X, Y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        zIndex: 2,
        width: '640px',
        height: '100%',
      }}
    />
  );
};

export default PoseCanvas;
