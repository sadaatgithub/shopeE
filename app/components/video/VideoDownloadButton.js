import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import DownloadProgress from "./DownloadProgress";

const VideoDownloadButton = ({ title, videoUrl }) => {
//   console.log(uri);
  const [progress, setProgress] = useState();
  const [totalSize,setTotalSize] = useState()
  const [receivedSize,setReceivedSize] = useState()
  const [fileUri,setFileUri] = useState('')
//   console.log(progress)
//   console.log(fileUri)

  const callback = (downloadProgress) => {
    console.log(downloadProgress, "dwnld prog")
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgress({
      downloadProgress: progress,
    });
  };
  const downloadResumable = FileSystem.createDownloadResumable(
    videoUrl,
    FileSystem.documentDirectory + title +'.mp4',
    {},
    callback,
    
    
  );
  const downloadHandler = async () => {
    console.log("download")
    try {
      const { uri } = await downloadResumable.downloadAsync();
      setFileUri(uri)
      console.log("Finished downloading to ", uri);
    } catch (error) {
        console.log(error)
    }
  };
  const printVideoDetail = async () =>{
    console.log("video detail")

    try {
        const file = await FileSystem.readAsStringAsync(fileUri)
        
        
    } catch (error) {
        console.log(error)
        
    }

  }

  return (
    <>
    <View style={{gap:30,width:"50%"}}>
    <Button
      title="Download"
      style={{ width: 150 }}
      onPress={downloadHandler}
    />
    {/* <DownloadProgress progress={progress?.downloadProgress}/> */}
   
    </View>
    </>
  );
};

export default VideoDownloadButton;

const styles = StyleSheet.create({});
