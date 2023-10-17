import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppFormInputField from './form/AppFormInputField'
import { useState } from 'react';
import useDebounce from '../utils/hooks/useDebounce';
import { useEffect } from 'react';
import { useLazyGetProductsQuery } from '../redux/feature/productApiSlice';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

const SearchProducts = () => {
  const [search, setSearch] = useState("");
  const [product,setProduct] = useState([])
  const debouncedValue = useDebounce(search)
  const navigation = useNavigation()
  const [getProducts, { isLoading, isError, isFetching }] =
    useLazyGetProductsQuery();

  const getProduct = () =>{
    getProducts(`products/?search=${debouncedValue}`)
    .unwrap()
    .then((data) =>{
      
      setProduct(data)
    })

}
  useEffect(() => {
    if(debouncedValue){
      getProduct()
    }

  }, [debouncedValue]);

  return (
    <View>
        <AppFormInputField
            placeholder="Search product"
            onChangeText={(text)=> setSearch(text)}
          />
           {product?.length > 0 && debouncedValue && (
          <View
            style={{
              position: "absolute",
              backgroundColor: colors.white,
              width: "100%",
              // height: 200,
              top: 60,
              padding: 20,
              borderRadius: 14,
            }}
          >
            {isFetching? <ActivityIndicator/>:<FlatList
              data={product}
              keyExtractor={(product) => product.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                    onPress={() =>
                      navigation.navigate("ProductDetail", item.id)
                    }
                  >
                    <Image
                      source={{ uri: `${item?.images[0]?.src}` }}
                      style={{ width: 40, height: 40, borderRadius: 10 }}
                    />
                    <Text style={{ fontWeight: 700 }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            ></FlatList>}
            
          </View>
        )}

    </View>
  )
}

export default SearchProducts

const styles = StyleSheet.create({})