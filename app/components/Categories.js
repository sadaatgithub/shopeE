import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useGetCategoriesQuery } from "../redux/feature/categoryApiSlice";
import BrandCard from "./BrandCard";
import colors from "../config/colors";
import AppText from "./heading/AppText";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const navigation = useNavigation()

  // console.log("category", data);
  let categories
  if(data){
    categories = [{name:"All"},...data]

  }
  
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(category, idx) => idx}
      ListHeaderComponent={<AppText>Categories</AppText>}
      // style={{gap:20}}
      numColumns={2}
      renderItem={({ item }) => (
        <BrandCard
          title={item?.name}
          count={item?.count}
            onPress={() => navigation.navigate('ProductListings',{
              categoryId:item.id,
              categoryName:item.name
            })}
          //   category={filterValue}
        />
      )}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({});
