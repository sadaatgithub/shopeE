import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

const LoadingModal = ({isLoading}) => {
  return (
    <Modal visible={isLoading} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View style={{
              color: colors.dark,
              width: 110,
              height: 90,
              backgroundColor: colors.white,
              textAlign:"center",
              justifyContent:"center",
              alignItems:"center",
              borderRadius:4
            }}>
          <ActivityIndicator size={40} color={colors.primary}/>
          </View>
        </View>
      </Modal>
  )
}

export default LoadingModal

const styles = StyleSheet.create({})