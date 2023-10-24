import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  useWindowDimensions
} from "react-native";
import React, { useState } from "react";
import YoutubeShortPlayer from "./YoutubeShortPlayer";

const videoArray = [
  {
    id: 1,
    title: "Video One",
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/732018129/rendition/360p/file.mp4?loc=external&log_user=0&signature=cac17e733b782ac4f64a797bd0439a8f6eafe67c34b8db90d4990f587c80323e",
  },
  {
    id: 2,
    title: "सुसंवादक | डॉ. उदय निरगुडकर",
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/726913491/rendition/240p/file.mp4?loc=external&log_user=0&signature=30bb84a938af39d2b68806be36a6802e6e8c84df67fb1162b4ec043729f222bc",
  },
  {
    id: 3,
    title: "अक्षरांची आवड ",
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/759503929/rendition/240p/file.mp4?loc=external&log_user=0&signature=e6f3d0bd8803b749e1dc007ce0528b3f0e68fcf2cc654fed34e30a4f0e152c0b",
  },
];
const YoutubeStoryScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { width,height} = useWindowDimensions()
  const [horizontal,setHorizontal] = useState(false)

  const handleScroll = (event) => {
    const scrollPosition = horizontal? event.nativeEvent.contentOffset.x:event.nativeEvent.contentOffset.y
    // console.log(scrollPosition);

    const index = Math.round(scrollPosition / (horizontal? width:height));
    // console.log(index);
    setCurrentIndex(index);
  };
  return (
    <>
      <StatusBar hidden />

      <View
        style={{
          width: width,
          height: height,
          position: "relative",
          backgroundColor: 'black',
        }}
      >

      <FlatList
        data={videoArray}
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(data) => data.id}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <YoutubeShortPlayer
            video={item}
            index={index}
            currentIndex={currentIndex}
            mode={horizontal}
          />
        )}
      />
      </View>
    </>
  );
};

export default YoutubeStoryScreen;

const styles = StyleSheet.create({
  screen: {
    // alignItems:"center",
    // justifyContent:"center"
  },
});
