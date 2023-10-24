import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

const DownloadProgress = ({ onDone, progress = 0, visible = false }) => {
    // console.log(progress)
  return (
    <View style={{marginLeft:10}}>
      <Progress.Circle
        size={40}
        progress={progress}
        color="white"
        unfilledColor="green"
        showsText
        fill="transparent"
        // endAngle={0.8}
        thickness={1}
        strokeCap="square"
        // indeterminate={true}
        borderWidth={2}
        textStyle={{fontSize:16}}
      />
    </View>
  );
};

export default DownloadProgress;

const styles = StyleSheet.create({});
