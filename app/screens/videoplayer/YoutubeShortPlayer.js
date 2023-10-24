import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Pressable,
} from "react-native";
import React from "react";
import Video from "react-native-video";
import { useRef } from "react";
import { useState } from "react";
import YoutubeShortControls from "./YoutubeShortControls";
import { TouchableOpacity } from "react-native-gesture-handler";

const YoutubeShortPlayer = ({ video, index, currentIndex }) => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const [isMute, setMute] = useState(false);
  const [progress, setProgress] = useState({});

  const handleProgress = (progress) => {
    setProgress(progress);
  };
//   console.log(progress);
  return (
    <View
      style={{
        width: width,
        height: height,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5,
      }}
    >
      <Video
        ref={videoRef}
        
        style={[styles.videoBackground, { height: height, width: width }]}
        source={{ uri: video.videoUrl }}
        paused={isPaused}
        fullscreen
        muted={isMute}
        onProgress={handleProgress}
        onLoad={() =>
          index === currentIndex ? setIsPaused(false) : setIsPaused(true)
        }
        resizeMode="cover"
      />
      <YoutubeShortControls
        onMute={() => setMute(!isMute)}
        isPaused={isPaused}
        isMute={isMute}
        progress={progress}
        title={video.title}
        url={video.videoUrl}
      />
    </View>
  );
};

export default YoutubeShortPlayer;

const styles = StyleSheet.create({
  //   videoBackground: {
  //     position: "absolute",
  //     width: "100%",
  //     height: "100%",
  //   },
});
