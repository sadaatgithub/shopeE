import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Review from '../components/reviews/Review'
import Screen from '../components/Screen'
import AppText from '../components/heading/AppText'
import AppButton from '../components/button/AppButton'
import colors from '../config/colors'

const ReviewsScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
        <View style={styles.heading}>
            <View>
                <AppText style={{fontSize:15,fontWeight:600}}>245 Reviews</AppText>
                <AppText style={{fontSize:12}}>4.8 Stars</AppText>

            </View>
            <AppButton title="Add Review" color="secondary" style={{width:130}} onPress={() => navigation.navigate("Add Review")}/>
            </View>
            <ScrollView style={{marginTop:32}} showsVerticalScrollIndicator={false}>
               <View style={{paddingBottom:60}}>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                </View>
        </ScrollView>
    </View>
  )
}

export default ReviewsScreen

const styles = StyleSheet.create({
    screen:{
        paddingHorizontal:20,
        backgroundColor:colors.white
    },
    heading:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
})