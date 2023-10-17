import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as VideoThumbnails from "expo-video-thumbnails";
import colors from "../config/colors";

const VideoCard = ({ videoUrl, onPress,title }) => {
  const [image, setImage] = useState(null);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUrl, {
        time: 15000,
      });
      setImage(uri);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generateThumbnail();
  }, []);
  return (
    <Pressable onPress={onPress} style={{paddingHorizontal:10}}>
      <View style={styles.videoCard}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.detail}>
        <Text style={{fontWeight:600,padding:8,color:colors.white}}>{title}</Text>
        <Text style={{fontWeight:400,padding:8,color:colors.white}}>विडिओ बद्दल विस्तृत माहिती इथे...</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  videoCard: {
    flexDirection: "row",
    // alignItems: "stretch",
    marginTop: 20,
    gap:20,
    padding:10,
    backgroundColor:'#363636',
    borderRadius:10
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 6,
  },
  detail:{
    justifyContent:"flex-start",
    alignItems:"flex-start",
    // borderWidth:1
  }
});
