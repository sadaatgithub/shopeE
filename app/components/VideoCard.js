import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as VideoThumbnails from "expo-video-thumbnails";
import colors from "../config/colors";
import * as FileSystem from "expo-file-system";

const VideoCard = ({ video,onPress }) => {
  const [image, setImage] = useState(null);
  // const [dowloadedVideo, setDownloadedVideo] = useState({})
  // console.log(video)
  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(video?.videoUrl, {
        time: 15000,
      });
      setImage(uri);
    } catch (error) {
      console.log(error);
    }
  };
  const isPreDownloaded = async () =>{
    const fileUri = FileSystem.documentDirectory + video?.title.toString()
      try {
        const file = await FileSystem.readAsStringAsync(encodeURI(fileUri))
        // console.log(file)
        setDownloadedVideo(file)
      } catch (error) {
        console.log(error)
        
      }
  }


  useEffect(() => {
    generateThumbnail();
    // isPreDownloaded()
  }, []);
  return (
    <Pressable onPress={onPress} style={{paddingHorizontal:10}}>
      <View style={styles.videoCard}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.detail}>
        <Text style={{fontWeight:600,padding:8,color:colors.white}}>{video?.title}</Text>
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
