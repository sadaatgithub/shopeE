import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Categories from "../components/Categories";
import BannerSlider from "../components/BannerSlider";
import AdBanner from "../components/AdBanner";
import CustomCarousel from "../components/CustomCarousel";


const sliderProp = {
  section_heading:"",
  slidePerview:1/1.2,
  speed:3000,
  images : [
    {
      id: 1,
      image: require("../assets/banner_1.jpg"),
      // url:'',
      url_type:1 ,
      // = App page, 2 = External URL 
      redirect_url:'Wishlist' 
      // ( if redirect URL not blank then add hyperlink )
    },
    {
      id: 2,
      image: require("../assets/banner_2.jpg"),
    },
    {
      id: 3,
      image: require("../assets/banner_4.jpg"),
    },
  ],
}

const HomeScreen = ({ navigation }) => {
  // const { data, isLoading } = useGetProductsQuery();
  const { user } = useAuthentication()

// console.log(data)
  // const categories = [
  //   "All",
  //   ...new Set(
  //     data?.map(
  //       (item) => item.category.charAt(0).toUpperCase() + item.category.slice(1)
  //     )
  //   ),
  // ];
  // const [filterValue, setFilterValue] = useState("All");

  // const filteredProducts = data?.filter((product) => {
  //   if (filterValue === "All") {
  //     return true;
  //   } else {
  //     return product.category === filterValue.toLocaleLowerCase();
  //   }
  // });

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {/* <BannerSlider {...sliderProp}/> */}
        <CustomCarousel {...sliderProp}/>
      </View>




        {/* <LoadingModal isLoading={isLoading} /> */}
        {/* <View style={{ paddingHorizontal: 20 }}>
          <AppText style={{ fontSize: 28, fontWeight: 600 }}>Hello {user?.displayName}</AppText>
          <AppText style={styles.subTitle}>Welcome to ShopeE</AppText>
        </View> */}
      

        {/* <View style={styles.search}>
          <View style={styles.searchInner}>
            <MaterialCommunityIcons
              name="search-web"
              size={26}
              color={colors.textGray}
            />
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
        </View> */}
        <View style={styles.brandAll}>
          {/* <CardTitle
            heading="Choose Category"
            subheading="View All"
            style={{ paddingRight: 20 }}
          /> */}

          <View style={{ marginTop: 2, gap: 20,width:"100%"}}>

            <Categories/>
            
          </View>
          

          {/* new arrival------------------- */}
          {/* <View style={styles.container}>
            <CardTitle
              heading="New Arrival"
              subheading="View All"
              style={{ paddingRight: 20 }}
            />
            
          </View>
          <View style={styles.cardContainer}>
              {data?.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.name}
                  price={product.price}
                  imageUrl={product.images[0].src}
                  onPress={() =>
                    navigation.navigate("ProductDetail", product.id)
                  }
                />
              ))}
    

            </View> */}
          
        </View>
        <View style={{marginTop:20}}>
          <AdBanner/>
          </View>
      </ScrollView>
    </View>
    
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex:1,

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
    marginTop: 15,
    gap: 20,
    paddingVertical: 10,
    // flex:1
    flexDirection:"row",
    flexWrap:"wrap"
  },
});
