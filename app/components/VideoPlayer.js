import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Modal,
  Pressable,
  Switch
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Video, { TextTrackType } from "react-native-video";
import { Constants } from "expo-constants";
import VideoCard from "./VideoCard";
import colors from "../config/colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native";
import VideoModals from "./videoModals/VideoModals";
import { setStatusBarHidden } from "expo-status-bar";
import * as Brightness from "expo-brightness";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Subtitle from "./video/Subtitle";

const videoArray = [
  {
    id: 1,
    title: "स्वयं | पुणे	, Talks | २०२२",
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/732018129/rendition/360p/file.mp4?loc=external&log_user=0&signature=cac17e733b782ac4f64a797bd0439a8f6eafe67c34b8db90d4990f587c80323e",
  },
  {
    id: 2,
    title: "सुसंवादक	| डॉ. उदय	निरगुडकर",
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

const VideoPlayer = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  // const [currentVideoIndex,setCurrentVideoIndex] = useState(0)
  const [videoUri, setVideoUri] = useState(videoArray[0]);
  const [isControl, setIsControl] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState({});
  const [inFullscreen, setInFullscreen] = useState(false);
  const [isMuted, setIsmuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [rateModal, setRateModal] = useState(false);
  const [volumeBar, setVolumeBar] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false); //   const [inFullscreen,setInFullscreen] = useState(false)
  const [volume, setVolume] = useState(1.0);
  const [subtitle, setSubtitle] = useState([]);
  const videoRef = useRef();
  const [permissionResponse, requestPermission] = Brightness.usePermissions();
  const [isCaption, setIsCaption] = useState(false);
  const [seek, setSeek] = useState();
  const [isNextVideoScheduled,setIsNextVideoScheduled] = useState(false)
  const [nextVideo, setNextVideo] = useState({})
  const [repeat,setRepeat] = useState(false)
  // const defaultBrightness = Brightness.getBrightnessAsync()
  const [defaultBrightness, setDefaultbrightness] = useState("");
  const [savedProgress, setSavedProgress] = useState("");

  const [brightness, setBrightness] = useState("");

  const format = (seconds) => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, "0");
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const setFullscreen = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
    // videoRef.current.play();
    setIsPaused(false);
    setStatusBarHidden(true, "fade");
  };

  const exitFullscreen = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.DEFAULT
    );
    setStatusBarHidden(false, "fade");
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (inFullscreen) {
          setInFullscreen(false);
          exitFullscreen();
          return true;
        } else return false;
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [inFullscreen, exitFullscreen])
  );

  const requestPermit = async () => {
    const { granted } = await requestPermission();
    if (!granted) {
      alert("You need to enable permission to access the library");
    }
  };

  const getDefaultBrightness = async () => {
    const bri = await Brightness.getBrightnessAsync();
    setBrightness(bri);
    setDefaultbrightness(bri);
  };

  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem(
        `videoProgress_${videoUri.id}`
      );
      setSavedProgress(savedProgress);
    } catch (error) {
      console.error("Error saving video progress:", error);
    }
  };

  const progressHandler = async (progress) => {
    const { currentTime, playableDuration } = progress;
    // console.log(progress)
  
    if(playableDuration - currentTime < 10 && !isNextVideoScheduled){
      showNextVideo()
     setIsNextVideoScheduled(true)
    } else if(playableDuration - currentTime >=10){
      setIsNextVideoScheduled(false)
      setNextVideo(null)


    }
    // console.log(playableDuration-currentTime)
    setProgress(progress);

    try {
      await AsyncStorage.setItem(
        `videoProgress_${videoUri.id}`,
        currentTime.toString()
      );
    } catch (error) {
      console.error("Error saving video progress:", error);
    }
  };
  const showNextVideo = () =>{
    const currentVideoIndex = videoArray.findIndex(v => v.id === videoUri.id)
    const nextVideo = videoArray[currentVideoIndex+1]
    // console.log(nextVideo)
    if(nextVideo !== undefined){
      // setVideoUri({uri:nextVideo.url})
      setNextVideo(nextVideo)

      } else{
        console.log("no more video")
        setNextVideo(null)
      }
  

  }
  useEffect(() => {
    inFullscreen ? setFullscreen() : exitFullscreen();
    getDefaultBrightness();
    // requestPermit()
    loadProgress();
    if(videoUri && !nextVideo){
      setNextVideo(null)

    }

  }, [inFullscreen, videoUri]);

  useEffect(() => {
    Brightness.setBrightnessAsync(brightness);
  }, [brightness]);

  return (
    <View style={styles.screen}>
      <View
        style={{
          width: width,
          height: inFullscreen ? height : 224,
        }}
      >
        <Pressable
          style={{
            width: inFullscreen
              ? Dimensions.get("window").width
              : Dimensions.get("window").width,
            height: inFullscreen ? Dimensions.get("window").height : 224,
          }}
          onPress={() => setIsControl(!isControl)}
        >
          <Video
            source={{ uri: videoUri.videoUrl }}
            ref={videoRef}
            paused={isPaused}
            muted={isMuted}
            onProgress={progressHandler}
            style={styles.backgroundVideo}
            resizeMode="contain"
            volume={volume}
            rate={rate}
            repeat={repeat}
            onEnd={() => !repeat && nextVideo && setVideoUri(nextVideo)}
            onBuffer={x => console.log("buffer")}
            preventsDisplaySleepDuringVideoPlayback={false}
            onLoad={(x) => (
              setIsPaused(false),
              videoRef.current.seek(parseFloat(savedProgress))
            )}
          />
          {isCaption && <Subtitle currentTime={progress.currentTime} />}

          {/* screen lock unclock */}
          {inFullscreen && (
            <MaterialIcons
              name={`${isLocked ? "lock-outline" : "lock-open"}`}
              color={"white"}
              size={35}
              style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
              onPress={() => setIsLocked(!isLocked)}
            />
          )}
          {nextVideo &&<View style={{width:380,position:"relative"}}>
            <Text style={{color:"white",fontSize:22,position:"absolute",zIndex:1,right:20,top:20}}>Next</Text>
            <VideoCard 
              {...nextVideo}
              onPress={() => setVideoUri(nextVideo)}/>
              </View>}

          {/* control pannel */}
          {isControl && !isLocked && (
            <TouchableOpacity
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setIsControl(!isControl)}
            >

              {/* setting caption and volume------------- */}

              <View style={{ position: "absolute", right: 10, top: 10, flexDirection:"row",gap:16 }}>
              <MaterialIcons
                name="cloud-download"
                color={"white"}
                size={30}
                style={{
                 
                  // display: "none",
                }}
                onPress={()=> console.log("save")}
              />
                <Switch value={repeat} trackColor={{false:colors.dark,true:colors.white}} thumbColor={'gray'} onValueChange={()=> setRepeat(!repeat)}/>

                <TouchableOpacity>
                  <MaterialIcons
                    name={`${
                      isCaption ? "closed-caption" : "closed-caption-disabled"
                    }`}
                    color={colors.white}
                    size={30}
                    onPress={() => setIsCaption(!isCaption)}
                  />
                </TouchableOpacity>
                
               <MaterialIcons
                name={`${isMuted || volume === 0 ? "volume-off" : "volume-up"}`}
                color={"white"}
                size={30}
                style={{}}
                onPress={() => setIsmuted(!isMuted)}
              />
              <MaterialIcons
                name="settings"
                color={"white"}
                size={30}
                style={{}}
                onPress={() => setIsVisible(!isVisible)}
              />

              </View>



              {/* brightenss slider */}

              <View
                style={{
                  position: "absolute",
                  left: -40,
                  transform: [{ rotate: "-90deg" }],
                }}
              >
                <Slider
                  style={{ width: 150 }}
                  vertical
                  minimumTrackTintColor="white"
                  maximumTrackTintColor="white"
                  thumbTintColor="white"
                  minimumValue={0}
                  maximumValue={1}
                  // thumbImage={require('../assets/sun.png')}

                  step={0.1}
                  value={brightness}
                  onValueChange={(x) => setBrightness(x)}
                />
              </View>
             
              {/* volume bar-------------------------> */}

             
              {volumeBar && (
                <View
                  style={{
                    position: "absolute",
                    // bottom: 100,
                    right: -40,
                    // width: "50%",
                    transform: [{ rotate: "-90deg" }],
                  }}
                >
                  <Slider
                    style={{ width: 150 }}
                    vertical
                    maximumTrackTintColor="gray"
                    minimumTrackTintColor="#FFF"
                    minimumValue={0}
                    maximumValue={1.0}
                    thumbTintColor="white"
                    step={0.2}
                    value={volume}
                    onValueChange={(volume) => setVolume(volume)}
                  />
                </View>
              )}

              

              {/* play/pause/seek control-------------------------> */}

              <View style={{ flexDirection: "row", gap: 40 }}>
                <MaterialIcons
                  name="replay-10"
                  color={colors.white}
                  size={inFullscreen ? 40 : 30}
                  onPress={() => (
                    // setSeek(10)
                    videoRef.current.seek(progress.currentTime - 10)
                  )}
                />
                <MaterialIcons
                  name={`${isPaused ? "play-arrow" : "pause"}`}
                  color={colors.white}
                  size={inFullscreen ? 40 : 30}
                  onPress={() => setIsPaused(!isPaused)}
                />
                <MaterialIcons
                  name="forward-10"
                  color={colors.white}
                  size={inFullscreen ? 40 : 30}
                  onPress={() =>
                    videoRef.current.seek(progress.currentTime + 10)
                  }
                />
              </View>

              {/* bottom progress bar-------------------------> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  bottom: inFullscreen ? -130 : -85,
                  paddingHorizontal: 20,
                  gap: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // width: "100%",
                    flex: 1,
                  }}
                >
                  <Text style={{ color: colors.white }}>
                    {format(progress.currentTime)}
                  </Text>
                  <Slider
                    style={{ flex: 1 }}
                    maximumTrackTintColor="gray"
                    minimumTrackTintColor="#FFF"
                    minimumValue={0}
                    thumbTintColor="white"
                    value={progress.currentTime}
                    maximumValue={progress.seekableDuration}
                    onValueChange={(x) => videoRef.current.seek(x)}
                  />
                  <Text style={{ color: colors.white }}>
                    {format(progress.seekableDuration)}
                  </Text>
                </View>

                <MaterialIcons
                  name={`${inFullscreen ? "fullscreen-exit" : "fullscreen"}`}
                  color={"white"}
                  size={35}
                  // style={{ position: "absolute", top: 5, left: 5 }}
                  onPress={() => setInFullscreen(!inFullscreen)}
                />
              </View>

              {/* <Text style={{ color: "white",alignSelf:"flex-start" }}>{videoUri.title}</Text> */}
            </TouchableOpacity>
          )}
        </Pressable>
      </View>

      <View style={{ marginTop: 20 }}>
        {/* <Button title="fullscreen" onPress={()=> videoRef.current.presentFullscreenPlayer()}/> */}
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: 18,
            fontWeight: 600,
            color: colors.white,
          }}
        >
          Episode ({videoArray.length})
        </Text>
        {videoArray
          .filter((video) => video.id !== videoUri.id)
          .map((video,index) => (
            <VideoCard
              {...video}
              key={video.id}
              onPress={() => setVideoUri(video)}
            />
          ))}
      </View>

      <Modal
        visible={isVisible}
        transparent
        // style={{backgroundColor:'rgba(0,0,0,0.5)'}}
        onRequestClose={() => setIsVisible(false)}
        animationType="slide"
      >
        <Pressable
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            bottom: 0,
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 10,
          }}
          onPress={() => setIsVisible(false)}
        >
          <View
            style={{
              // flex: 1,
              width: inFullscreen ? width / 2 : "100%",
              height: 320,

              backgroundColor: colors.white,
              borderRadius: 12,
              padding: 20,
              // left: inFullscreen ? 0 : 0,
            }}
          >
            <Pressable
              style={{
                position: "absolute",
                width: 80,
                height: 6,
                borderRadius: 40,
                backgroundColor: colors.mediumDark,
                top: 8,
                left: "50%",
                transform: [{ translateX: -20 }],
              }}
              onPress={() => setIsVisible(false)}
            ></Pressable>
            <View style={{ marginTop: 20 }}>
              <View
                style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
              >
                <MaterialIcons name="speed" color={"gray"} size={25} />
                <Text>Playback Speed</Text>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: colors.medium,
                  }}
                />
                <Pressable
                  onPress={() => (setRateModal(true), setIsVisible(false))}
                >
                  <Text>Normal</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
      <VideoModals
        isVisible={rateModal}
        inFullscreen={inFullscreen}
        setRating={setRate}
        speed={rate}
        onPress={() => setRateModal(false)}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.black,
    flex: 1,
  },

  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
