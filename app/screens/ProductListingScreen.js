import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../redux/feature/categoryApiSlice";
import LoadingModal from "../components/modal/LoadingModal";
import ProductCard from "../components/ProductCard";
import colors from "../config/colors";
import AppText from "../components/heading/AppText";
import AppButton from "../components/button/AppButton";
import { useRef } from "react";
import AppPicker from "../components/form/AppPicker";
import CategoryList from "../components/CategoryList";
import {
  useGetProductsQuery,
  useLazyGetProductQuery,
  useLazyGetProductsQuery,
} from "../redux/feature/productApiSlice";

const sortingBy = [
  {
    id: 1,
    label: "Default",
    value: "menu_order",
  },
  {
    id: 2,
    label: "Popularity",
    value: "popularity",
  },
  {
    id: 3,
    label: "Average Rating",
    value: "rating",
  },
  {
    id: 4,
    label: "Latest",
    value: "date",
  },
  {
    id: 5,
    label: "Price:Low to High",
    value: "price",
  },
  {
    id: 6,
    label: "Price:High to Low",
    value: "price-desc",
  },
  {
    id: 7,
    label: "SKU",
    value: "sku",
  },
];

const ProductListingScreen = ({ route, navigation }) => {
  const [getProducts, { data, isLoading, isError, isFetching }] =
    useLazyGetProductsQuery();
  const { categoryId, categoryName } = route.params;
  const [catId, setCatId] = useState(categoryId);
  const [product, setProduct] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("menu_order");
  const [hasData,setHasData] = useState(true)
  const [hasReachedEnd,setHasReachedEnd] = useState(false)

  let queryParams = new URLSearchParams();

  if (catId) {
    queryParams.append('category', catId);
  }
  if (page) {
    queryParams.append("page", page);
  }
  if (sortBy) {
    queryParams.append("orderby", sortBy);
  }
  const apiUrl = `products/?${queryParams.toString()}`;

  

  const flatListRef = useRef();

  const handleSort = (sort) =>{
    setPage(1)
    setSortBy(sort)
    
  }
  const handleCategory = (category) =>{
    setCatId(category)
    // queryParams.append('category', catId);
  }
  const loadData = () => {
    // setPage((prevPage) => prevPage+1)
      getProducts(apiUrl, { preferCacheValue: true })
      .unwrap()
      .then((data) => {
        // console.log(data)
        if(data.length===0){
          setHasData(false)
        }
        if(page>1){
          setProduct((prevProducts) => [...prevProducts,...data])

        }else setProduct(data)
      });
  };
  useEffect(() => {
    loadData();
  }, [page, sortBy,catId]);

  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <LoadingModal isLoading={isLoading} />
      <View>
        <CategoryList 
          selectedValue={catId}
          onValueChange={handleCategory}/>
        {/* <AppText>{categoryName}</AppText> */}

        <AppPicker
          placeholder="Sorting"
          items={sortingBy}
          prompt="Sort by"
          selectedValue={sortBy}
          onValueChange={handleSort}
          // onValueChange={(itemValue) => setSortBy(itemValue)}
          style={{
            width: "50%",
            position: "absolute",
            right: 0,
            top: -2,
            zIndex: 2,
          }}
        />
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          ref={flatListRef}
          data={product}
          onEndReached={()=> hasData? (setPage(prevPage => prevPage+1)):null}
          onEndReachedThreshold={0}
          keyExtractor={(item) => item.id}
          numColumns={2}
          // scrollEventThrottle={50}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <ActivityIndicator size={30} />
            // <View
            //   style={{
            //     flexDirection: "row",
            //     gap: 12,
            //     marginTop: 20,
            //     paddingHorizontal: 20,
            //   }}
            // >
            //   {page > 1 && (
            //     <AppButton
            //       title="Prev"
            //       style={{ flex: 1 }}
            //       onPress={() => setPage((prevpage) => prevpage - 1)}
            //     />
            //   )}
            //   <AppButton
            //     title="Next Page"
            //     style={{ flex: 1 }}
            //     onPress={() => setPage((prevpage) => prevpage + 1)}
            //   />
            // </View>
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
      </View>
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
    marginTop: 20,
    gap: 20,
    paddingVertical: 10,
    flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "center",
  },
});
