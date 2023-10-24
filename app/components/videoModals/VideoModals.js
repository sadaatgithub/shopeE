import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import colors from "../../config/colors";
import { MaterialIcons } from "@expo/vector-icons";

const VideoModals = ({
  isVisible,
  onPress,
  isFullscreen,
  setRating,
  speed,
}) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={onPress}
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
        }} onPress={onPress}
      >
        <View
          style={{
            height: 320,
            width: isFullscreen ? width / 2 : "100%",
            backgroundColor: colors.white,
            borderRadius: 12,
            padding: 20,
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
            onPress={onPress}
          ></Pressable>
          <View style={{ marginTop: 10, gap: 15 }}>
            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
              <Pressable
                key={rate}
                onPress={() => (setRating(rate), onPress())}
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                {speed === rate ? (
                  <MaterialIcons name="check" color={colors.dark} size={16} />
                ) : (
                  <View style={{ marginLeft: 18 }} />
                )}

                <Text
                  style={{
                    color: colors.dark,
                    fontWeight: speed === rate ? 700 : 400,
                    fontSize: 16,
                  }}
                >
                  {rate === 1 ? "Normal" : rate + " x"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default VideoModals;

const styles = StyleSheet.create({});
