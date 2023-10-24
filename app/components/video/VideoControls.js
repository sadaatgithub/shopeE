import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  useWindowDimensions
} from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";
import CastBtn from "../button/CastBtn";
import colors from "../../config/colors";
import VideoProgressBar from "./VideoProgressBar";

const VideoControls = ({
  progress,
  videoUri,
  isVideoLoading,
  showAd,
  onPlayChange,
  onControlClose,
  isCaption,
  onCaptionChange,
  isMuted,
  onMutedChange,
  isPaused,
  onSettingModalChange,
  brightness,
  onBrightnessChange,
  volume,
  onVolumeChange,
  isFullscreen,
  onFullScreenChange,
  repeat,
  onRepeatChange,
  onBackSeek,
  onForwardSeek,
  onSeek,
}) => {
  const format = (seconds) => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, "0");
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };
  const { height, width } = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onControlClose}
    >
      {/* setting caption and volume------------- */}
    
        <View
          style={{
            position: "absolute",
            right: 20,
            top: 10,
            flexDirection: "row",
            gap: 16,
            display:showAd? "none":"flex"
          }}
        >
          {/* <CastBtn videoUri={videoUri} /> */}

          <Switch
            value={repeat}
            trackColor={{ false: colors.dark, true: colors.white }}
            thumbColor={"gray"}
            onValueChange={onRepeatChange}
          />

          <TouchableOpacity>
            <MaterialIcons
              name={`${
                isCaption ? "closed-caption" : "closed-caption-disabled"
              }`}
              color={colors.white}
              size={30}
              onPress={onCaptionChange}
            />
          </TouchableOpacity>

          <MaterialIcons
            name={`${isMuted || volume === 0 ? "volume-off" : "volume-up"}`}
            color={"white"}
            size={30}
            style={{}}
            onPress={onMutedChange}
          />
          <MaterialIcons
            name="settings"
            color={"white"}
            size={30}
            style={{}}
            onPress={onSettingModalChange}
          />
        </View>

        {/* brightenss slider */}
        <View
          style={{
            position: "absolute",
            left: -40,
            transform: [{ rotate: "-90deg" }],
            display:showAd? "none":"flex"
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
            onValueChange={onBrightnessChange}
          />
        </View>

        {/* volume bar-------------------------> */}

       {!showAd && <View
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
            onValueChange={onVolumeChange}
          />
        </View>
        }

        {/* play/pause/seek control-------------------------> */}

        <View style={{ flexDirection: "row",gap:showAd? 0:40,justifyContent:"center",alignItems:"center" }}>
          <MaterialIcons
            name="replay-10"
            color={colors.white}
            size={isFullscreen ? 40 : 30}
            onPress={onBackSeek}
            style={{
            display:showAd? "none":"flex"

            }}
          />
          <MaterialIcons
            name={`${isPaused ? "play-arrow" : "pause"}`}
            color={colors.white}
            size={isFullscreen ? 40 : 30}
            onPress={onPlayChange}
          />
          <MaterialIcons
            name="forward-10"
            color={colors.white}
            size={isFullscreen ? 40 : 30}
            onPress={onForwardSeek}
            style={{
              display:showAd? "none":"flex"
  
              }}
          />
        </View>

        {/* bottom progress bar-------------------------> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            bottom: isFullscreen ? -130 : -85,
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
           
            <VideoProgressBar
              value={progress.currentTime}
              maxValue={progress.seekableDuration}
              onSeek={!showAd && onSeek}
            />
            <Text style={{ color: colors.white }}>
              {format(progress.seekableDuration)}
            </Text>
          </View>

          <MaterialIcons
            name={`${isFullscreen ? "fullscreen-exit" : "fullscreen"}`}
            color={"white"}
            size={35}
            // style={{ position: "absolute", top: 5, left: 5 }}
            onPress={onFullScreenChange}
          />
        </View>

        <Text style={{ color: "white",alignSelf:"flex-start",display:showAd? "flex":"none",paddingHorizontal:20 }}>Video will play after Ad</Text>
    </TouchableOpacity>
  );
};

export default VideoControls;

const styles = StyleSheet.create({});
