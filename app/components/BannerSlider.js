import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import { useState, useEffect } from "react";
import { useRef } from "react";
import AppText from "./heading/AppText";
import { useNavigation } from "@react-navigation/native";

const BannerSlider = ({ section_heading, slidePerview, speed, images }) => {
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          item.url_type === 1
            ? navigation.navigate(item.redirect_url)
            : console.log(index)
        }
      >
        <Image
          source={item.image}
          style={[styles.image, { width: screenWidth }]}
        />
      </TouchableWithoutFeedback>
    );
  };
  // indicators

  const renderDotIndicators = () =>
    images.map((dot, index) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor:
              activeIndex === index ? colors.secondary : colors.light,
            height: 10,
            width: activeIndex === index ? 15 : 10,
            borderRadius: 5,
            marginHorizontal: 6,
          }}
        ></View>
      );
    });

  // handlescroll

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // console.log(scrollPosition);

    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === images.length - 1) {
        flatListRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatListRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, speed);

    return () => clearInterval(interval);
  }, [activeIndex]);

  
  return (
    <View>
      {section_heading && <AppText>{section_heading}</AppText>}
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        // onMomentumScrollEnd={(e) =>{
        //   const contentOffset = e.nativeEvent.contentOffset;
        //   const viewSize = e.nativeEvent.layoutMeasurement;
        //   const index = Math.floor(contentOffset.x / viewSize.width);
        //   console.log(index)
        //   if(index===images.length-1){

        //     setActiveIndex(index);
        //   }
        // }}
      />
      <View style={styles.dotContainer}>{renderDotIndicators()}</View>
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  image: {
    height: 200,
    objectFit: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
});
