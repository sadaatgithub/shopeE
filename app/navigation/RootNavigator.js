import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import AddReviewScreen from "../screens/AddReviewScreen";
import Header from "../components/Header";

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Root"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="All Review"
      component={ReviewsScreen}
      options={{ headerTitle: "All Reviews" }}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={{
        header: ({ navigation, route }) => (
          <Header navigation={navigation} route={route} isHome={false} title="Product Detail"/>
        ),
      }}
    />
    <Stack.Screen
      name="Add Review"
      component={AddReviewScreen}
      options={{ headerTitle: "Add Reviews" }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
