import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { useState } from 'react';
import colors from '../config/colors';


const CustomCarousel = ({ section_heading, slidePerview, speed, images }) => {
    const navigation = useNavigation()
  const screenWidth = Dimensions.get("window").width;
    const [activeIndex,setActiveIndex] = useState(0)

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
  return (
    <View>
  <Carousel 
        loop
        data={images} 
        renderItem={renderItem} 
        // mode="vertical-stack"
        // windowSize={1}
        snapEnabled={true}
        width={screenWidth} 
        height={200}
        scrollAnimationDuration={500}
        autoPlayInterval={speed}
        autoPlay={true}
        pagingEnabled={true}
        onSnapToItem={index => setActiveIndex(index)}
        // onProgressChange={(index) =>console.log(index)}
        />
        <View style={styles.dotContainer}>{renderDotIndicators()}</View>
     </View>
  )
}

export default CustomCarousel

const styles = StyleSheet.create({
    image:{
        height:200,
        objectFit: "cover",

    },
    dotContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12,
      },
})