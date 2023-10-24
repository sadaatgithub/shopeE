import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const DownloadedVideoCard = ({ item = "Downloaded Video" }) => {
  const navigation = useNavigation();
  const [video, setVideo] = useState({ title: item, videoUrl: "" });
  // console.log(video)

  const printVideoDetail = async () => {
    console.log("video detail");

    try {
      const directory = FileSystem.documentDirectory + item;
      const result = await FileSystem.getInfoAsync(directory);
      setVideo((prev) => ({ ...prev, videoUrl: result.uri }));
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  };
const onDelete = async () =>{
console.log(video.videoUrl)

    try {
        const result = await FileSystem.deleteAsync(video.videoUrl)
        console.log(result)
        
    } catch (error) {
        console.log(error)
        
    }
}

  useEffect(() => {
    printVideoDetail();
  }, []);
  return (
    // navigation.navigate('Video',video)
    <View
      style={{
        width: "100%",
        height: 100,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal:4
      }}
    >
      <Text>{item}</Text>
      <View style={{alignSelf:"flex-end", justifyContent:"space-evenly", flexDirection:"row",gap:20}}>
        <MaterialIcons name="play-arrow" size={25} color="gray" onPress={() => navigation.navigate('VideoPlayer',video)}/>
        <MaterialIcons name="delete" size={25} color="gray" onPress={onDelete}/>
      </View>
    </View>
  );
};

export default DownloadedVideoCard;

const styles = StyleSheet.create({});
