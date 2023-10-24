import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Modal,
  Pressable,
  Button,
  ActivityIndicator,
  ToastAndroid,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Video from "react-native-video";
import VideoCard from "./VideoCard";
import colors from "../config/colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect } from "@react-navigation/native";
import VideoModals from "./videoModals/VideoModals";
import { setStatusBarHidden } from "expo-status-bar";
import * as Brightness from "expo-brightness";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Subtitle from "./video/Subtitle";
import CastBtn from "./button/CastBtn";
import {
  useCastState,
  useMediaStatus,
  useRemoteMediaClient,
  useDevices,
  useCastSession,
} from "react-native-google-cast";
import VideoControls from "./video/VideoControls";
import VideoDownloadButton from "./video/VideoDownloadButton";
import CastControls from "./video/CastControls";

const videoArray = [
  // {
  //   id: 1,
  //   title: "Video One",
  //   videoUrl:
  //     "https://player.vimeo.com/progressive_redirect/playback/732018129/rendition/360p/file.mp4?loc=external&log_user=0&signature=cac17e733b782ac4f64a797bd0439a8f6eafe67c34b8db90d4990f587c80323e",
  // },
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

const adds = [
  {
    id: 1,
    title: "Add One",
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/732018129/rendition/360p/file.mp4?loc=external&log_user=0&signature=cac17e733b782ac4f64a797bd0439a8f6eafe67c34b8db90d4990f587c80323e",
    // "https://www.youtube.com/watch?v=M853v2oFQRs",
  },
];

const VideoPlayer = ({ navigation, route }) => {
  const downLoadedVideo = route.params;
  const videoRef = useRef();
  const { height, width } = useWindowDimensions();
  const castState = useCastState();

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoUri, setVideoUri] = useState(videoArray[currentVideoIndex]);

  const [isControl, setIsControl] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState({});
  const [landscape, setLandscape] = useState(false);
  const [isFullscreen, setIsfullscreen] = useState(false);
  const [isMuted, setIsmuted] = useState(false);

  const [rate, setRate] = useState(1);
  const [rateModal, setRateModal] = useState(false);
  const [volumeBar, setVolumeBar] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false); //   const [inFullscreen,setInFullscreen] = useState(false)
  const [volume, setVolume] = useState(1.0);
  const [permissionResponse, requestPermission] = Brightness.usePermissions();
  const [isCaption, setIsCaption] = useState(false);
  const [isNextVideoScheduled, setIsNextVideoScheduled] = useState(false);
  const [nextVideo, setNextVideo] = useState({});
  const [repeat, setRepeat] = useState(false);
  const [defaultBrightness, setDefaultbrightness] = useState("");
  const [savedProgress, setSavedProgress] = useState("");
  const [isCastConnected, setIsCastConnected] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const [isAdshowed, setIsAdshowed] = useState(false);
  const [isAdScheduled, setIsAdScheduled] = useState(false);
  const [ifAd, setIfAd] = useState(false);

  const [brightness, setBrightness] = useState(0.2);
  const setFullscreen = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
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
        if (landscape) {
          setLandscape(false);
          exitFullscreen();
          return true;
        } else return false;
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [landscape, exitFullscreen])
  );

  // const requestPermit = async () => {
  //   const { granted } = await requestPermission();
  //   if (!granted) {
  //     alert("You need to enable permission to access the library");
  //   }
  // };

  const getDefaultBrightness = async () => {
    console.log("calling defaultbrightness");

    const bri = await Brightness.getBrightnessAsync();
    setBrightness(bri);
    setDefaultbrightness(bri);
  };

  const loadProgress = async () => {
    console.log("calling loadprogress");

    try {
      const savedProgress = await AsyncStorage.getItem(
        `videoProgress_${videoArray[currentVideoIndex].id}`
      );
      setSavedProgress(savedProgress);
    } catch (error) {
      console.error("Error saving video progress:", error);
    }
  };

  const progressHandler = (progress) => {
    const { currentTime, playableDuration } = progress;
    setProgress(progress);
    const halfDuration = playableDuration/2
    // if(halfDuration >60){
    //   console.log("in add function")
    //   scheduleNextAd(currentTime,halfDuration)
    // }
    !ifAd &&
      (scheduledNextVideo(currentTime, playableDuration),
      
      
      saveProgress(currentTime));
    // if(!ifAd && !isAdScheduled){
    //   if(currentTime >= halfDuration){
    //       // setIsPaused(true)
    //       setIfAd(true)
    //       setIsAdScheduled(true)
    //       console.log("calling scheduled ad")

    //   }
    // }
      
    
  };
  const saveProgress = async (currentTime) => {
    try {
      await AsyncStorage.setItem(
        `videoProgress_${videoArray[currentVideoIndex].id}`,
        currentTime.toString()
      );
    } catch (error) {
      console.error("Error saving video progress:", error);
    }
  };

  const scheduledNextVideo = (currentTime, playableDuration) => {
    if (playableDuration - currentTime < 10 && !isNextVideoScheduled && !repeat) {
      showNextVideo();
      setIsNextVideoScheduled(true);
    } else if (playableDuration - currentTime >= 10) {
      setIsNextVideoScheduled(false);
      setNextVideo(null);
    }
  };
  const showNextVideo = () => {
    const videoIndex = videoArray.findIndex(
      (v) => v.id === videoArray[currentVideoIndex].id
    );
    if (videoIndex === videoArray.length - 1) {
      console.log("index equal");
      setNextVideo(null);
    } else setNextVideo(videoArray[currentVideoIndex + 1]);
    // const nextVideo = videoArray[currentVideoIndex + 1];
    // // console.log(nextVideo)
    // if (nextVideo !== undefined) {
    //   // setVideoUri({uri:nextVideo.url})
    //   setNextVideo(nextVideo);
    // } else {
    //   // console.log("no more video");
    //   setNextVideo(null);
    // }
  };
const scheduleNextAd = (currentTime,halfDuration) =>{

  if (currentTime > halfDuration && !isAdScheduled) {
    console.log("scceduled")
    setIsNextVideoScheduled(true);
  } else if (currentTime >= halfDuration) {
    setIsNextVideoScheduled(false);
    console.log("not scheduled")
  }

}
  // const onMuteHandler = async () => {
  //   try {
  //     const mute = await castSession.isMute();
  //     castSession.setMute(!mute);
  //     setIsCastMute(!mute);
  //   } catch (error) {}
  // };
  const controllHandler = () => {
    setIsControl(!isControl);
  };
  const onCaptionChange = () => {
    setIsCaption(!isCaption);
    showToastWithGravity("Subtitles/CC is", isCaption);
  };
  const onRepeatModeChange = () => {
    setRepeat(!repeat);
    showToastWithGravity("Repeat Mode", repeat);
  };
  const showToastWithGravity = (msg, state) => {
    ToastAndroid.showWithGravity(
      `${msg} ${state ? "OFF" : "ON"}`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  const onVideoEnd = () => {
    ifAd
      ? (setIsAdshowed(true), setIfAd(false))
      : currentVideoIndex < videoArray.length - 1
      ? (setIfAd(true),
        setIsAdshowed(false),
        !repeat? setCurrentVideoIndex(currentVideoIndex + 1):
        setCurrentVideoIndex(currentVideoIndex + 1))
      : (setIfAd(true), setCurrentVideoIndex(0));
  };

  const onVideoLoad = () => {
    !ifAd && videoRef.current.seek(parseFloat(savedProgress));
    ifAd ? setNextVideo(null) : null;
    setIsVideoLoading(false);
    // castState === "connected" ? setIsPaused(true) : setIsPaused(false),
  };

  const onVideoLoadStart = () => {
    setIsVideoLoading(true);
    !isAdshowed && !downLoadedVideo && setIfAd(true);
    setIsControl(false);
  };

  const onCardpressPlayVideo = (video) => {
    const videoIndex = videoArray.findIndex((vid) => vid.id === video.id);
    setCurrentVideoIndex(videoIndex);
  };

  // useEffect(() => {
  //   let autoHide;
  //   if (isControl) {
  //     autoHide = setTimeout(() => {
  //       setIsControl(false);
  //     }, 5000);
  //   }
  //   return () => clearTimeout(autoHide);
  // }, [isControl]);

  useEffect(() => {
    if (!defaultBrightness) {
      getDefaultBrightness();
    }
    if (!ifAd) {
      loadProgress();
    }
    // if (videoUri && !nextVideo) {
    //   setNextVideo(null);
    // }
  }, [defaultBrightness, ifAd]);

  useEffect(() => {
    Brightness.setBrightnessAsync(brightness);
  }, [brightness]);

  useEffect(() => {
    if (downLoadedVideo) {
      // console.log(downLoadedVideo);
      // setVideoUri(downLoadedVideo);
    }
  }, [downLoadedVideo]);

  useEffect(() => {
    if (castState === "connected") {
      setIsPaused(true);
      setNextVideo(null);
      setIsControl(false);
      setIsCastConnected(true);
    } else if (castState === "notConnected") {
      setIsCastConnected(false);
      // removeCastprogressHandler()
    }
  }, [castState]);

  //
  // console.log("ad scheduled", isAdScheduled);
  // console.log("show ad", ifAd);
  // console.log("showed Ad",isAdshowed);

  return (
    <View style={styles.screen}>
      <View
        style={{
          width: width,
          height: isFullscreen ? height : 224,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          disabled={castState === "connected"}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          onPress={controllHandler}
        >
          <Video
            source={{
              uri: ifAd
                ? adds[0].videoUrl
                : downLoadedVideo? downLoadedVideo.videoUrl:videoArray[currentVideoIndex].videoUrl,
            }}
            ref={videoRef}
            paused={isPaused}
            muted={isMuted}
            onProgress={progressHandler}
            style={styles.backgroundVideo}
            resizeMode="contain"
            volume={volume}
            rate={rate}
            repeat={repeat}
            onError={(error) => console.log("video error", error)}
            onBuffer={(error) => console.log("video buffering", error)}
            onEnd={onVideoEnd}
            onLoad={onVideoLoad}
            onLoadStart={onVideoLoadStart}
            onSeek={(x) => {
              const updatedProgress = {
                ...progress,
                currentTime: x.currentTime,
              };
              setProgress(updatedProgress);
            }}
            // onReadyForDisplay={() => }
            // audioOnly={false}
            // poster="https://baconmockup.com/300/200/"
            posterResizeMode="cover"
            fullscreen={landscape}
            onFullscreenPlayerDidPresent={() => setIsfullscreen(true)}
            onFullscreenPlayerWillDismiss={exitFullscreen}
            onFullscreenPlayerDidDismiss={() => setIsfullscreen(false)}
            onFullscreenPlayerWillPresent={setFullscreen}
          />
          {isCaption && <Subtitle currentTime={progress.currentTime} />}
          <View
            style={{ position: "absolute", right: 210, top: 10, zIndex: 10 }}
          >
            <CastBtn videoUri={videoUri} />
          </View>
          {/* screen lock unclock */}
          {isFullscreen && (
            <MaterialIcons
              name={`${isLocked ? "lock-outline" : "lock-open"}`}
              color={"white"}
              size={35}
              style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
              onPress={() => setIsLocked(!isLocked)}
            />
          )}
          {nextVideo && true && (
            <View style={{ width: 380, position: "relative" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  position: "absolute",
                  zIndex: 1,
                  right: 20,
                  top: 20,
                }}
              >
                Next
              </Text>
              <VideoCard
                video={nextVideo}
                onPress={() => onCardpressPlayVideo(nextVideo)}
              />
            </View>
          )}

          {/* control pannel ------ start */}
          {isCastConnected && <CastControls isFullscreen={isFullscreen} />}

          {/* video players control------------ */}
          {isControl && !isLocked && (
            <VideoControls
              videoUri={videoUri}
              progress={progress}
              showAd={ifAd}
              isVideoLoading={isVideoLoading}
              onControlClose={controllHandler}
              isPaused={isPaused}
              onPlayChange={() => setIsPaused(!isPaused)}
              isCaption={isCaption}
              onCaptionChange={onCaptionChange}
              repeat={repeat}
              onRepeatChange={onRepeatModeChange}
              isMuted={isMuted}
              onMutedChange={() => setIsmuted(!isMuted)}
              onSettingModalChange={() => setIsVisible(!isVisible)}
              brightness={brightness}
              onBrightnessChange={(x) => setBrightness(x)}
              volume={volume}
              onVolumeChange={(x) => setVolume(x)}
              onBackSeek={() =>
                videoRef.current.seek(progress.currentTime - 10)
              }
              onForwardSeek={() =>
                videoRef.current.seek(progress.currentTime + 10)
              }
              isFullscreen={isFullscreen}
              onFullScreenChange={() => setLandscape(!landscape)}
              onSeek={(x) => videoRef.current.seek(x)}
            />
          )}
          {/* control pannel--------------- end */}
        </Pressable>
        {isVideoLoading && (
          <ActivityIndicator
            animating={isVideoLoading}
            style={{ position: "absolute" }}
            size={35}
            color="white"
          />
        )}
      </View>

      <View style={{ marginTop: 20 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 20,
            paddingHorizontal: 20,
            display: ifAd ? "none" : "flex",
          }}
        >
          <VideoDownloadButton {...videoUri} />
          <Button
            title="My Downloads"
            onPress={() => navigation.navigate("My_Downloads")}
          />
          {/* <Button title="Stop Casting" onPress={()=> client.stop()}/> */}
        </View>
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
          .filter((video) => video.id !== videoArray[currentVideoIndex].id)
          .map((video, index) => (
            <VideoCard
              video={video}
              key={video.id}
              // setVideoUri={setVideoUri}
              onPress={() => onCardpressPlayVideo(video)}
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
              width: isFullscreen ? width / 2 : "100%",
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
        isFullscreen={isFullscreen}
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
