import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "../components/heading/AppText";
import BrandCard from "../components/BrandCard";
import CardTitle from "../components/heading/CardTitle";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../redux/feature/productApiSlice";
import LoadingModal from "../components/modal/LoadingModal";
import { useAuthentication } from "../utils/hooks/useAuthentication";

const HomeScreen = ({ navigation }) => {
  const { data, isLoading } = useGetProductsQuery();
  const { user } = useAuthentication()
  const categories = [
    "All",
    ...new Set(
      data?.map(
        (item) => item.category.charAt(0).toUpperCase() + item.category.slice(1)
      )
    ),
  ];
  const [filterValue, setFilterValue] = useState("All");

  const filteredProducts = data?.filter((product) => {
    if (filterValue === "All") {
      return true;
    } else {
      return product.category === filterValue.toLocaleLowerCase();
    }
  });

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LoadingModal isLoading={isLoading} />
        <View style={{ paddingHorizontal: 20 }}>
          <AppText style={{ fontSize: 28, fontWeight: 600 }}>Hello {user?.email}</AppText>
          <AppText style={styles.subTitle}>Welcome to ShopeE</AppText>
        </View>

        <View style={styles.search}>
          <View style={styles.searchInner}>
            <MaterialCommunityIcons
              name="search-web"
              size={26}
              color={colors.textGray}
            />
            <TextInput placeholder="Search..." style={styles.input} />
          </View>
          <MaterialCommunityIcons
            name="microphone-outline"
            size={24}
            color={colors.white}
            style={{
              backgroundColor: colors.primary,
              padding: 15,
              borderRadius: 10,
            }}
          />
        </View>
        <View style={styles.brandAll}>
          <CardTitle
            heading="Choose Category"
            subheading="View All"
            style={{ paddingRight: 20 }}
          />

          <View style={{ marginTop: 20, gap: 20 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(brand, idx) => idx}
              // style={{gap:20}}
              renderItem={({ item }) => (
                <BrandCard
                  title={item}
                  onPress={() => setFilterValue(item)}
                  category={filterValue}
                />
              )}
            />
          </View>

          {/* new arrival------------------- */}
          <View style={styles.container}>
            <CardTitle
              heading="New Arrival"
              subheading="View All"
              style={{ paddingRight: 20 }}
            />
            <View style={styles.cardContainer}>
              {filteredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.image}
                  onPress={() =>
                    navigation.navigate("ProductDetail", product.id)
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },

  title: {},
  subTitle: {
    fontSize: 14,
    fontWeight: 400,
    marginTop: 5,
    color: colors.textGray,
  },
  search: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 20,
  },
  searchInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    flex: 1,
    padding: 15,
    borderRadius: 15,
    gap: 10,
    width: "100%",
  },

  input: {
    flex: 1,
    paddingHorizontal: 5,
  },
  brandAll: {
    marginTop: 20,
    paddingLeft: 20,
  },
  brandTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    alignItems: "center",
  },
  container: {
    marginTop: 15,
    width: "100%",
    // backgroundColor:colors.light
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    gap: 20,
    paddingVertical: 10,
  },
});
