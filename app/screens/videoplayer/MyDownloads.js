import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as FileSystem from "expo-file-system";
import { useState } from 'react';
import { useEffect } from 'react';
import DownloadedVideoCard from '../../components/video/DownloadedVideoCard';



const MyDownloads = () => {
  const [downloadedItems, setDownloadedItems] = useState([]);
  const validExtensions = ['.jpg', '.png', '.jpeg', '.gif', '.mp4', '.mov', '.avi', '.mkv'];
  

  const fetchDownloadedItems = async () => {
    try {
      const directory = FileSystem.documentDirectory;
      const items = await FileSystem.readDirectoryAsync(directory);
      setDownloadedItems(items);
    } catch (error) {
      console.error('Error fetching downloaded items:', error);
    }
  };
// const fetchItemUri = async (uri) =>{
//   try {
//     const directory = FileSystem.documentDirectory + 'swayam.mp4'

//     const result = await FileSystem.readAsStringAsync(directory)
//     console.log(result)
//   } catch (error) {
    
//   }
// }

  // console.log(downloadedItems)


  useEffect(() =>{
    fetchDownloadedItems()
    

  },[])

  return (
    <View style={{paddingHorizontal:10, gap:10}}>
      {downloadedItems.filter((item) =>{
        const extension = item.split('.').pop();
        return validExtensions.includes(`.${extension.toLowerCase()}`)
      })
      .map((item,index) =>
      <DownloadedVideoCard item={item} key={index}/>
      )}
    </View>
  )
}

export default MyDownloads

const styles = StyleSheet.create({})