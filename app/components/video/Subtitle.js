import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const Subtitle = ({ currentTime }) => {
  const [subtitle, setSubtitle] = useState([]);
  const [currentCaption, setCurrentCaption] = useState(" ");

  function parseVTT(vttData) {
    const captions = [];
    const lines = vttData.split("\n");
    let caption = null;

    for (const line of lines) {
      if (line.trim() === "") {
        // Empty line indicates the end of a caption
        if (caption) {
          captions.push(caption);
          caption = null;
        }
      } else if (line.includes("-->")) {
        // Line contains a time range, e.g., "00:00:27.760 --> 00:00:30.720"
        const [startTime, endTime] = line
          .split(" --> ")
          .map((time) => time.trim());
        caption = { startTime, endTime, text: "" };
      } else if (caption) {
        // Line contains caption text
        caption.text += `${line.trim()} `;
      }
    }

    return captions;
  }

  // console.log(subtitle)

  const loadSubtitle = async () => {
    try {
      const response = await fetch(
        "https://swayamtalks.org/wp-content/uploads/2023/09/Miraj-English.vtt"
      );
      if (response.ok) {
        const subText = await response.text();
        setSubtitle(parseVTT(subText));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateCurrentCaption = () => {
    const formatedCurrenttime = format(currentTime);

    // console.log(formatedCurrenttime)
    const caption = subtitle.find(
      (c) =>
        c.startTime <= formatedCurrenttime && c.endTime >= formatedCurrenttime
    );
    if (caption) {
      setCurrentCaption(caption.text);
    } else {
      setCurrentCaption("");
    }
  };
  const format = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsWithoutMinutes = remainingSeconds % 60;
    const milliseconds = Math.round(
      (remainingSecondsWithoutMinutes % 1) * 1000
    );

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${Math.floor(remainingSecondsWithoutMinutes)
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
  };

  useEffect(() => {
    loadSubtitle();
  }, []);
  useEffect(() => {
    updateCurrentCaption();
  }, [currentTime]);

  return (
    <>
      {currentCaption && (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            right: 0,
            left: 0,
            paddingHorizontal: 10,
            paddingVertical:5,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white",fontSize:18 }}>{currentCaption}</Text>
        </View>
      )}
    </>
  );
};

export default Subtitle;

const styles = StyleSheet.create({});
