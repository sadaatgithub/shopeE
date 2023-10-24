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
      "https://file-examples.com/storage/fe1207564e65327fe9c8723/2017/04/file_example_MP4_480_1_5MG.mp4",
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
  const [prevVideoId, setPrevVideoId] = useState("");
  const [nextVideoId, setNextVideoId] = useState(null);
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
  const [proposedAd,setProposedAd] = useState(false)

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
        `videoProgress_${videoUri.id}`
      );
      setSavedProgress(savedProgress);
    } catch (error) {
      console.error("Error saving video progress:", error);
    }
  };

  const progressHandler = async (progress) => {
    const { currentTime, playableDuration } = progress;
    setProgress(progress);


    if(!showAd){
      if (playableDuration - currentTime < 10 && !isNextVideoScheduled) {
        showNextVideo();
        setIsNextVideoScheduled(true);
      } else if (playableDuration - currentTime >= 10) {
        setIsNextVideoScheduled(false);
        setNextVideo(null);
      }
      // if(playableDuration - currentTime <= 60 && !proposedAd){
      //   setProposedAd(true)
      //   setVideoUri(adds[0])
      //   console.log(adds[0])
      //   console.log("Add will start from here")

      // }

    }
    
    if (!showAd) {
      try {
        await AsyncStorage.setItem(
          `videoProgress_${videoUri.id}`,
          currentTime.toString()
        );
      } catch (error) {
        console.error("Error saving video progress:", error);
      }
    }
  };
  const showNextVideo = () => {
    const currentVideoIndex = videoArray.findIndex((v) => v.id === videoUri.id);
    const nextVideo = videoArray[currentVideoIndex + 1];
    // console.log(nextVideo)
    if (nextVideo !== undefined) {
      // setVideoUri({uri:nextVideo.url})
      setNextVideo(nextVideo);
    } else {
      // console.log("no more video");
      setNextVideo(null);
    }
  };
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
    // !repeat && nextVideo && setVideoUri(videoArray[currentVideoIndex]);
    !repeat &&  setVideoUri(videoArray[currentVideoIndex]);
    // !nextVideo && setVideoUri(videoArray[0]);
    showAd ? (setIsAdshowed(true), setShowAd(false)) : setIsAdshowed(false);
  };

  const onVideoLoad = () => (
    castState === "connected" ? setIsPaused(true) : setIsPaused(false),
    setNextVideo(null),
    !showAd && videoRef.current.seek(parseFloat(savedProgress)),
    setIsVideoLoading(false),
    showAd
      ? setVideoUri(adds[0])
      : (setVideoUri(videoArray[currentVideoIndex]),
        setCurrentVideoIndex(currentVideoIndex + 1))

    // setShowAd(true)
  );
  const onVideoLoadStart = () => {
    setIsVideoLoading(true);

    !isAdshowed && setShowAd(true);
  };

  const onCardpressPlayVideo = (video) => {
    // console.log("video", video);
    const videoIndex = videoArray.findIndex((v) => v.id === video.id);
    console.log(videoIndex)
    !showAd ? setShowAd(true):setIsAdshowed(false)
    setCurrentVideoIndex(videoIndex)
    setVideoUri(videoArray[videoIndex])
    
  }

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
    if (!showAd) {
      loadProgress();
    }
    if (videoUri && !nextVideo) {
      setNextVideo(null);
    }
  }, [videoUri, defaultBrightness, showAd]);

  useEffect(() => {
    Brightness.setBrightnessAsync(brightness);
  }, [brightness]);
  useEffect(() => {
    if (downLoadedVideo) {
      console.log(downLoadedVideo);
      setVideoUri(downLoadedVideo);
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
  // console.log("current vdo idx",currentVideoIndex);
  // console.log("show ad",showAd);
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
            audioOnly={false}
            poster="https://baconmockup.com/300/200/"
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
          {nextVideo && !showAd && (
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
                setVideoUri={() => onCardpressPlayVideo(nextVideo)}
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
              showAd={showAd}
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
          .filter((video) => video.id !== videoUri.id)
          .map((video, index) => (
            <VideoCard
              video={video}
              key={video.id}
              // setVideoUri={setVideoUri}
              onPress={()=>onCardpressPlayVideo(video)}
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
