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