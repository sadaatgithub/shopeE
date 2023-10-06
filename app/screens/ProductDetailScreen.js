import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import AppText from "../components/heading/AppText";
import CardTitle from "../components/heading/CardTitle";
import AppButton from "../components/button/AppButton";
import Review from "../components/reviews/Review";
import { useGetProductsQuery } from "../redux/feature/productApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/feature/cartSlice";

const images = [
  { id: 1, image: require("../assets/product_1.png") },
  { id: 2, image: require("../assets/product_1.png") },
  { id: 3, image: require("../assets/product_1.png") },
  { id: 4, image: require("../assets/product_1.png") },
];

const ProductDetailScreen = ({ navigation, route }) => {
  const id = route.params;
  const { product } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      product: data?.find((product) => product.id === id),
    }),
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: product?.image }} />
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <View style={{ marginTop: 15 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <AppText style={{ fontSize: 13, color: colors.textGray }}>
                {product.category}
              </AppText>
              <AppText style={{ fontSize: 13, color: colors.textGray }}>
                Price
              </AppText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
                flex: 1,
              }}
            >
              <AppText
                style={{
                  fontSize: 20,
                  color: colors.medium,
                  fontWeight: 600,
                  width: "80%",
                }}
              >
                {product.title}
              </AppText>
              <AppText
                style={{ fontSize: 20, color: colors.medium, fontWeight: 600 }}
              >
                Rs. {product.price}
              </AppText>
            </View>
          </View>
          {/* image variants------------- */}

          <View style={styles.featuredImages}>
            {images.map((img) => (
              <Image
                key={img.id}
                source={img.image}
                style={styles.featuredImage}
              />
            ))}
          </View>
          <View style={{ marginTop: 15 }}>
            <CardTitle heading="Size" subheading="Size Guide" />
            <View style={styles.size}>
              {["S", "M", "L", "XL", "2XL"].map((size, idx) => (
                <View key={idx} style={styles.eachSize}>
                  <AppText>{size}</AppText>
                </View>
              ))}
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <AppText style={{ fontSize: 17 }}>Description</AppText>
            <View style={styles.description}>
              <AppText
                style={styles.descText}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {product.description}
              </AppText>
              <Pressable style={styles.readMore}>
                <Text style={{ fontWeight: 600 }}>Read More...</Text>
              </Pressable>
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <CardTitle
              heading="Reviews"
              subheading="View All"
              onPress={() => navigation.navigate("All Review")}
            />
            <AppText style={{ fontSize: 15, fontWeight: 600 }}>
              {product.rating.count + " " + "Reviews"}
            </AppText>
            <AppText style={{ fontSize: 12 }}>
              {product.rating.rate + " " + "Stars"}
            </AppText>
            <Review />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <View>
                <AppText
                  style={{ fontSize: 15, fontWeight: 600, color: colors.dark }}
                >
                  Total Price
                </AppText>
                <AppText style={{ fontSize: 11, color: colors.textGray }}>
                  with VAT,SD
                </AppText>
              </View>
              <AppText style={{ fontWeight: 800 }}>
                {`$ `}
                {product.price}
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row" }}>
        <AppButton
          title="Add to Cart"
          style={{ borderRadius: 0, height: 60, width: "50%" }}
          onPress={() => dispatch(addToCart(product))}
        />
        <AppButton
          title="Buy Now"
          style={{ borderRadius: 0, height: 60, width: "50%" }}
          color="light"
        />
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  imageContainer: {
    width: "100%",
    height: 318,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 287,
    objectFit: "scale-down",
  },
  featuredImages: {
    flexDirection: "row",
    gap: 9,
    justifyContent: "space-around",
  },
  featuredImage: {
    width: 77,
    height: 77,
    borderRadius: 10,
    marginTop: 20,
  },
  size: {
    flexDirection: "row",
    gap: 9,
    marginTop: 10,
    justifyContent: "space-around",
  },
  eachSize: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  description: {
    marginTop: 12,
    paddingBottom: 10,
  },
  descText: {
    fontSize: 15,
    color: colors.textGray,
  },
  // readMore: {
  //   position: "absolute",
  //   bottom: 8,
  //   right: 12,
  //   backgroundColor: colors.white,
  // },
});
