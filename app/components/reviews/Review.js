import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../heading/AppText'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../../config/colors';
import { getRating } from '../../utils/helpers';


const Review = ({rating}) => {
  return (
    <>
    <View style={styles.reviews}>
              <View style={{ flexDirection: "row", gap: 10,alignItems:"center" }}>
                <Image
                  source={require("../../assets/product_2.png")}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />

                <View>
                  <AppText style={{fontSize:15,fontWeight:500}}>Ronald Richards</AppText>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginTop: 7,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="clock-outline"
                      color={colors.textGray}
                      size={15}
                    />
                    <Text style={{ fontSize: 11, color: colors.textGray }}>
                      13,Sep,2020
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: 600 }}>
                    4.8{" "}
                    <Text
                      style={{
                        color: colors.textGray,
                        marginLeft: 5,
                        fontSize: 11,
                      }}
                    >
                      rating
                    </Text>
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 7 }}>
                   {getRating(4.8).map((star,idx) => <View key={idx}>{star}</View>)}
                  </View>
                </View>
              </View>

              
            </View>
            <View style={{marginTop:10}}>
                <AppText style={{fontSize:15, color:colors.textGray}}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores doloremque officiis accusantium delectus quod,
                  repudiandae, obcaecati praesentium, maiores a sint et vitae
                  veritatis dolores mollitia maxime quae similique distinctio
                  ad....
                </AppText>
            </View>
            </>
  )
}

export default Review

const styles = StyleSheet.create({
    reviews: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
      },
})