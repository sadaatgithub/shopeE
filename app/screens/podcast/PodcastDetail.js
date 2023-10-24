import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import React from "react";
// import { LinearGradient } from 'expo-linear-gradient';
import * as VideoThumbnails from "expo-video-thumbnails";
import { useState } from "react";
import { useEffect } from "react";
import AppButton from "../../components/button/AppButton";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
const videoArray = [
  // {
  //   id: 1,
  //   title: "Video One",
  //   videoUrl:
  //     "https://player.vimeo.com/progressive_redirect/playback/732018129/rendition/360p/file.mp4?loc=external&log_user=0&signature=cac17e733b782ac4f64a797bd0439a8f6eafe67c34b8db90d4990f587c80323e",
  // },
  {
    id: 2,
    title: "सुसंवादक | डॉ. उदय निरगुडकर",
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/726913491/rendition/240p/file.mp4?loc=external&log_user=0&signature=30bb84a938af39d2b68806be36a6802e6e8c84df67fb1162b4ec043729f222bc",
  },
  {
    id: 3,
    title: "अक्षरांची आवड	",
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/759503929/rendition/240p/file.mp4?loc=external&log_user=0&signature=e6f3d0bd8803b749e1dc007ce0528b3f0e68fcf2cc654fed34e30a4f0e152c0b",
  },
];
const PodcastDetail = () => {
  const [image, setImage] = useState(null);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        videoArray[0]?.videoUrl,
        {
          time: 15000,
        }
      );
      setImage(uri);
    } catch (error) {
      console.log(error);
    }
  };
  //   useEffect(() => {
  //     generateThumbnail();
  //     // isPreDownloaded()
  //   }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#428749"} barStyle="light-content" />
      <View
        style={{
          flex: 1,
          //   height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 275,
            backgroundColor: "#428749",
            flexDirection: "row",
            justifyContent: "center",
            // alignItems: "center",
            // position:"relative"
          }}
        >
            <View style={{marginTop:50, flexDirection: "row",
            gap: 20,
            justifyContent: "center",}}>
            <View>
            {!image && (
              <Image
                source={require("../../assets/banner_1.jpg")}
                style={styles.image}
              />
            )}
          </View>
          <View>
            <Text style={{ fontSize: 22, color: "white" }} ellipsizeMode="clip">
              {videoArray[0].title}
            </Text>
            <Text style={{ fontSize: 17, color: "white", marginTop: 6 }}>
              मनDay with अनघा - Seacon 2 Ep१०
            </Text>
            <Text style={{ color: "white", marginTop: 6 }}>
              "सैषा गणेशविद्ध्या
            </Text>
            <Text style={{ fontSize: 15, color: "white", marginTop: 10 }}>
              20:40 / 30 min
            </Text>
          </View>

            </View>
        
          <Pressable
            style={{
              position: "absolute",
              bottom: 20,
              width: "35%",
              backgroundColor: "#f5dd67",
              zIndex: 2,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              borderRadius: 12,
              gap: 10,
              marginTop:10
            }}
          >
            <MaterialIcons name="play-circle-outline" size={30} />
            <Text style={{ fontWeight: 600, fontSize: 18 }}>PLAY</Text>
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: "#252525",
            paddingHorizontal: 10,
            paddingVertical: 20,
            gap: 20,
          }}
        >
          <View style={{}}>
            <Text style={{ color: "white", marginTop: 10 }}>
              गणेशविद्ध्या म्हणजे काय हे माहीत आहे का? श्रीगणेशाच्या नावाने
              प्रसिद्ध असलेल्या ह्या विद्धेचे नेमके स्वरूप जाणून घेऊया आजच्या
              मनDay with अणघा मधे..
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <View style={{ alignItems: "center", gap: 10 }}>
                <MaterialCommunityIcons
                  name="cards-heart"
                  size={25}
                  color={"red"}
                />
                <Text style={{ color: "white" }}>Liked</Text>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <MaterialCommunityIcons
                  name="check-all"
                  size={25}
                  color={"green"}
                />
                <Text style={{ color: "white" }}>In Playlist</Text>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <MaterialCommunityIcons
                  name="cloud-download-outline"
                  size={25}
                  color={"white"}
                />
                <Text style={{ color: "white" }}>Download</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              backgroundColor: "#363636",
              padding: 12,
              borderRadius: 8,
              gap: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: 700 }}>
              COMMENTS (3)
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image
                source={require("../../assets/user.png")}
                style={{ width: 40, height: 40 }}
              />
              <View style={{ gap: 8 }}>
                <Text style={{ color: "white" }}>
                  Madhuri | Sep 26, 2023 08:09 PM
                </Text>
                <Text style={{ color: "gray" }}>खूप खूप सुंदर माहिती</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 6 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18, fontWeight: 700, color: "white" }}>
                ALL EPISODES
              </Text>
              <Text style={{ color: "gray" }}>Sort v</Text>
            </View>
            <View style={{ gap: 10, marginTop: 20 }}>
              {videoArray?.map((video) => (
                  <Pressable key={video.id} style={{ backgroundColor: "#363636",
                  padding: 16,
                  borderRadius: 12,
                  gap:14}}>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#363636",
                    borderRadius: 12,
                    gap:14
                  }}
                >
                  <View>
                    {!image && (
                      <Image
                        source={require("../../assets/banner_1.jpg")}
                        style={styles.image}
                      />
                    )}
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 22, color: "white" }}
                      ellipsizeMode="clip"
                    >
                      {video.title}
                    </Text>
                    <Text
                      style={{ fontSize: 15, color: "white", marginTop: 10 }}
                    >
                        अनघा
                      
                    </Text>
                    
                  
                   
                  </View>
                </View>
                <View>
                    <Text style={{color:"white"}}>
                    गणेशविद्ध्या म्हणजे काय हे माहीत आहे का? श्रीगणेशाच्या नावाने
              प्रसिद्ध असलेल्या ह्या विद्धेचे नेमके स्वरूप जाणून घेऊया आजच्या
              मनDay with अणघा मधे..
                    </Text>

                </View>
                <Text
                      style={{ fontSize: 15, color: "white", marginTop: 10 }}
                    >
                      20:40 / 30 min
                    </Text>
                    <MaterialCommunityIcons
                  name="cloud-download-outline"
                  size={25}
                  color={"white"}
                  style={{position:"absolute", bottom:28,right:16}}
                />

                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PodcastDetail;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    objectFit: "fill",
  },
});
