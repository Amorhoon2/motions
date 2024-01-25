// App.js

import React, { useState } from 'react';
import WebcamPoseNet from './WebcamPoseNet';
import PoseCanvas from './PoseCanvas';
import GameLogic from './GameLogic';
import * as tf from '@tensorflow/tfjs';

function App() {
  // (async () => {
  //   await tf.setBackend('webgl');
  //   await tf.ready();
  //   // Your other initialization code here
  // })();
  const [currentPose, setCurrentPose] = useState(null);

  const handlePoseDetected = (pose) => {
    setCurrentPose(pose);
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100vh' }}>
      <WebcamPoseNet onPoseDetected={handlePoseDetected} />
      {currentPose && (
        <>
          <PoseCanvas pose={currentPose} videoWidth={640} videoHeight={480} sensitivity={50} />
          <GameLogic pose={currentPose} videoWidth={640} sensitivity={50} />
        </>
      )}
    </div>
  );
}

export default App;
