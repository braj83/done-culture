"use client";

import { Player } from "@lottiefiles/react-lottie-player";

const LottieAnimation = () => {
  return (
    <Player
      src="/RubikCube.json"
      loop
      autoplay
      style={{ width: 300, height: 300 }}
    />
  );
};

export default LottieAnimation;