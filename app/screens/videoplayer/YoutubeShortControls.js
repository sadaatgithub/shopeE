import { Pressable, StyleSheet, Text, View } from "react-native";
import React,{ useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import colors from "../../config/colors";
// import * as Sharing from 'expo-sharing';
import Share from "react-native-share"

const YoutubeShortControls = ({
  onMute,
  isMute,
  isPaused,
  progress,
  title,
  url,
  desc = "This is a beautifull description, you should read again and again",
}) => {
    // const url = "file:///data/user/0/com.sada_at_expo.shopEe/files/%E0%A4%B8%E0%A5%81%E0%A4%B8%E0%A4%82%E0%A4%B5%E0%A4%BE%E0%A4%A6%E0%A4%95%09%7C%20%E0%A4%A1%E0%A5%89.%20%E0%A4%89%E0%A4%A6%E0%A4%AF%09%E0%A4%A8%E0%A4%BF%E0%A4%B0%E0%A4%97%E0%A5%81%E0%A4%A1%E0%A4%95%E0%A4%B0.mp4"
const [result,setResult] = useState()
    const handleShare = async ()=>{
        try {
            const result = await Sharing.isAvailableAsync()
            console.log(result)
            if(result){
                Sharing.shareAsync(url)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onShare = async () =>{
        // try {
            const shareOptions = {
                title: title,
                message: 'Hey..! Have a look at the Sawaym Talks app',
                url:url,
              };
              try {
                const ShareResponse = await Share.open(shareOptions);
                console.log('Result =>', ShareResponse);
                setResult(JSON.stringify(ShareResponse, null, 2));
              } catch (error) {
                console.log('Error =>', error);
                setResult('error: ',error);
              }
    
    }
  return (
    <Pressable style={styles.youtubeControl} onPress={onMute}>
      <View
        style={{
          position: "absolute",
          left: 20,
          top: 80,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          backgroundColor: "gray",
          paddingVertical: 6,
          paddingHorizontal: 16,
          borderRadius: 18,
        }}
      >
        <MaterialCommunityIcons
          name="youtube-subscription"
          color={"white"}
          size={22}
        />
        <Text style={{ color: "white" }}>Subscriptions</Text>
      </View>
      {isMute && (
        <View
          style={{
            padding: 12,
            backgroundColor: "rgba(0,0,0,0.9)",
            borderRadius: 50,
          }}
        >
          <MaterialCommunityIcons
            name="volume-mute"
            size={40}
            color="white"
          />
        </View>
      )}


{/* like share vertical banner----------------- */}
      <View
        style={{
          position: "absolute",
          right: 12,
          top: 300,
          gap: 31,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <MaterialCommunityIcons name="thumb-up" size={26} color={"white"} />
          <Text style={{ color: "white" }}>Like</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <MaterialCommunityIcons name="thumb-down" size={26} color={"white"} />
          <Text style={{ color: "white" }}>Dislike</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="comment-text"
            size={26}
            color={"white"}
          />
          <Text style={{ color: "white" }}>0</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <MaterialCommunityIcons name="share" size={26} color={"white"} onPress={onShare}/>
          <Text style={{ color: "white" }}>Share</Text>
        </View>
        {/* <View style={{justifyContent:"center", alignItems:"center"}}>
            <MaterialCommunityIcons name="comment-text" size={26} color={'white'}/>
            <Text style={{color:"white"}}>Like</Text>
        </View> */}
      </View>


{/* title desc----------------------------- */}
      <View style={{ position: "absolute", bottom: 30, left: 20, gap: 14 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <MaterialCommunityIcons name="face-man" size={35} color={"white"} />
          <Text style={{ color: "white" }}>@username</Text>
          <Text
            style={{
              color: "white",
              paddingHorizontal: 6,
              paddingVertical: 2,
              backgroundColor: "red",
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            Subscribe
          </Text>
        </View>
        <View style={{ width: 299 }}>
          <Text style={{ color: "white", fontWeight: 700 }}>{title}</Text>
          <Text style={{ color: "white" }}>{desc}</Text>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Slider
          style={{ flex: 1, width: "100%" }}
          thumbTintColor="red"
          value={progress?.currentTime}
          minimumValue={0}
          maximumValue={progress?.playableDuration}
          minimumTrackTintColor="red"
          maximumTrackTintColor={colors.light}
        />
      </View>
    </Pressable>
  );
};

export default YoutubeShortControls;

const styles = StyleSheet.create({
  youtubeControl: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
