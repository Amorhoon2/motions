// GameLogic.js

import React from 'react';

const GameLogic = ({ pose, videoWidth, sensitivity }) => {
  const poseNose = pose.keypoints[0].position.x;
  const centerX = videoWidth / 2;

  if (poseNose < centerX - sensitivity) {
    console.log("Right");
    // 오른쪽으로 이동하는 게임 로직 추가
  } else if (poseNose > centerX + sensitivity) {
    console.log("Left");
    // 왼쪽으로 이동하는 게임 로직 추가
  } else {
    console.log("Forward");
    // 앞으로 이동하는 게임 로직 추가
  }

  return null; // 렌더링할 것이 없으므로 null 반환
};

export default GameLogic;
