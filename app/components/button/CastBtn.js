import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import  GoogleCast,{ CastButton,useRemoteMediaClient} from "react-native-google-cast";

const CastBtn = ({videoUri}) => {
  // const sessionManager = GoogleCast.getSessionManager()
  const client = useRemoteMediaClient()
  
  // 
  

  if (client) {
    // Send the media to your Cast device as soon as we connect to a device
    // (though you'll probably want to call this later once user clicks on a video or something)
    client.loadMedia({
      mediaInfo: {
        contentUrl:
          videoUri.videoUrl,
          metadata: {
            // images: [
            //   {
            //     url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/BigBuckBunny.jpg',
            //   },
            // ],
            title: videoUri.title,
            subtitle:
            'A short description',
            studio: 'Swayam ',
            type: 'movie',
          },
      },
    })
    
  }

  return <CastButton style={{ width: 24, height: 24, tintColor: 'white', backgroundColor:'rgba(0,0,0,0.8)', padding:14, borderRadius:12}} />

  
}

export default React.memo(CastBtn)

const styles = StyleSheet.create({})