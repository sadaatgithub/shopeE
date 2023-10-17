import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetCategoriesQuery } from '../redux/feature/categoryApiSlice'
import AppPicker from './form/AppPicker'

const CategoryList = ({selectedValue,onValueChange}) => {
    const { data:category} = useGetCategoriesQuery()
    const allCategory = [{ label: "All", value: 0 },...category?.map(({id,name}) => ({value:id,label:name}))]



  return (
      <AppPicker 
      selectedValue={selectedValue}
      onValueChange={onValueChange}
            items={allCategory} 
            style={{width:"50%"}} 
            placeholder="Category"/>
  )
}

export default CategoryList

const styles = StyleSheet.create({})