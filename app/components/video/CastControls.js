import { Pressable, StyleSheet, Text, View } from 'react-native'
import React,{ useState } from 'react'
import colors from '../../config/colors'
import {
    useCastState,
    useMediaStatus,
    useRemoteMediaClient,
    useDevices,
    useCastSession,
  } from "react-native-google-cast";
import { MaterialIcons } from "@expo/vector-icons";
import { msTosec } from '../../utils/helpers';
import VideoProgressBar from './VideoProgressBar';


const CastControls = ({isFullscreen}) => {
  const [isCastMute, setIsCastMute] = useState(Boolean);
  const [castProgress, setCastProgress] = useState(0);


  const castState = useCastState();
  const client = useRemoteMediaClient();
  const devices = useDevices();
  const mediaStatus = useMediaStatus();
  const castSession = useCastSession();
  if (client) {
    client?.onMediaProgressUpdated((x) => setCastProgress(x), 1);
  }
  const onMuteHandler = async () => {
    try {
      const mute = await castSession.isMute();
      castSession.setMute(!mute);
      setIsCastMute(!mute);
    } catch (error) {}
  };

  return (
    <View
    style={{
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        position: "absolute",
        top: 10,
        left: "25%",
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 4,
      }}
    >
      <Text style={{ color: colors.white }}>
        Connected to {devices[0]?.friendlyName}
      </Text>
    </View>
    <View>
      <Pressable
        style={{
          padding: 8,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 25,
        }}
      >
        <MaterialIcons
          name={`${
            mediaStatus?.playerState === "paused"
              ? "play-arrow"
              : "pause"
          }`}
          color="white"
          size={30}
          onPress={() =>
            mediaStatus?.playerState === "paused"
              ? client.play()
              : client.pause()
          }
        />
      </Pressable>
    </View>

    {/* video progress bar-------------------- */}

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        bottom: isFullscreen ? -130 : -75,
        paddingHorizontal: 20,
        alignItems: "center",
        // gap: 30,
      }}
    >
      <Text style={{ color: "white" }}>{msTosec(castProgress)}</Text>
      <VideoProgressBar
        value={castProgress}
        maxValue={mediaStatus?.mediaInfo?.streamDuration}
        onSeek={(x) => client.seek(x)}
      />
      <Text style={{ color: "white" }}>
        {msTosec(mediaStatus?.mediaInfo?.streamDuration)}
      </Text>
    </View>

    <View
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        flexDirection: "row",
        gap: 20,
      }}
    >
      <MaterialIcons
        name={`${isCastMute ? "volume-off" : "volume-up"}`}
        color={"white"}
        size={30}
        style={{}}
        onPress={onMuteHandler}
      />
      <MaterialIcons
        name="settings"
        color={"white"}
        size={30}
        style={{}}
        // onPress={onSettingModalChange}
      />
    </View>
  </View>
  )
}

export default CastControls

const styles = StyleSheet.create({})