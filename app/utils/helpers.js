import {MaterialCommunityIcons} from "@expo/vector-icons";

export const getRating = (rating,size = 14) =>{
    const ratingStar = [];
    const fullStar = <MaterialCommunityIcons name="star" size={size} color="#ffa41c"/>
    const halfStar = <MaterialCommunityIcons name="star-half-full" size={size} color="#ffa41c"/>
    const emptyStar = <MaterialCommunityIcons name="star-outline" size={size} color="#ffa41c"/>

    for (let i = 0; i < 5; i++){
        if(i<rating){
            ratingStar.push(fullStar);
        } else {
            ratingStar.push(emptyStar);
        }
       
    }
    if(rating % 1 !== 0){
        ratingStar[Math.floor(rating)] = halfStar;
    }
    return ratingStar
}

export function findProductIdByAttributes(data, color, grams) {
    // Iterate through the variations in the data
    for (const variation of data) {
      // Check if the variation's attributes match the desired values
      const attributes = variation.attributes;
      const isColorMatch = attributes.some(attr => attr.name === "Color" && attr.option === color);
      const isGramsMatch = attributes.some(attr => attr.name === "Grams" && attr.option === grams);
  
      // If both attributes match, return the product ID
      if (isColorMatch && isGramsMatch) {
        return variation.id;
      }
    }
  
    // Return null if no matching product is found
    return null;
  }