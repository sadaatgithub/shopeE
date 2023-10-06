import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useGetProductsByCategoryQuery } from "../redux/feature/categoryApiSlice";
import LoadingModal from "../components/modal/LoadingModal";
import ProductCard from "../components/ProductCard";
import colors from "../config/colors";
import AppText from "../components/heading/AppText";
import AppButton from "../components/button/AppButton";
import { useRef } from "react";

const ProductListingScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const [type, setType] = useState(!categoryId ? null : "category");
  const [id, setId] = useState(!categoryId ? null : categoryId);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const flatListRef = useRef();
  const queryParams = new URLSearchParams();

  if (categoryName) {
    queryParams.append(type, categoryId);
  } else {
    queryParams.delete(type, categoryId);
  }
  if (page) {
    queryParams.append("page", page);
  }
  const apiUrl = `products/?${queryParams.toString()}`;
  const { data, isLoading, isError, isFetching } =
    useGetProductsByCategoryQuery(apiUrl);
  //   console.log(data);
  useEffect(() => {
    if (page > 1) {
      flatListRef.current.scrollToIndex({
        index: 0,
        animation: true,
      });
    }
  }, [page]);

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <LoadingModal isLoading={isFetching} />
      {/* <ScrollView> */}
      {categoryName && (
        <AppText style={{ paddingHorizontal: 20 }}>{categoryName}</AppText>
      )}
      <AppText style={{ position: "absolute", right: 15 }}>Page {page}</AppText>

      <View style={styles.cardContainer}>
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                marginTop: 20,
                paddingHorizontal: 20,
              }}
            >
              {page > 1 && (
                <AppButton
                  title="Prev"
                  style={{ flex: 1 }}
                  onPress={() => setPage((prevpage) => prevpage - 1)}
                />
              )}
              <AppButton
                title="Next Page"
                style={{ flex: 1 }}
                onPress={() => setPage((prevpage) => prevpage + 1)}
              />
            </View>
          }
          ListFooterComponentStyle={{ display: !isFetching ? "flex" : "none" }}
          renderItem={({ item }) => (
            <ProductCard
              key={item.id}
              title={item.name}
              price={item.price}
              imageUrl={item?.images[0]?.src}
              onPress={() => navigation.navigate("ProductDetail", item.id)}
            />
          )}
        />

        {/* {data?.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              price={product.price}
              imageUrl={product.images[0].src}
              onPress={() => navigation.navigate("ProductDetail", product.id)}
            />
          ))} */}
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default ProductListingScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: "100%",
    flex: 1,

    // backgroundColor:colors.light
  },
  cardContainer: {
    width: "100%",
    marginTop: 15,
    gap: 20,
    paddingVertical: 10,
    flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "center",
  },
});
