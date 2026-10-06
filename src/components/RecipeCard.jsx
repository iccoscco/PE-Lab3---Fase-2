import { Image, Pressable, Text, View } from "react-native";
import { appStyles } from "../styles/appStyles";

export default function RecipeCard({ recipe, onPress }) {
  return (
    <Pressable style={appStyles.card} onPress={onPress}>
      <Image
        source={{ uri: recipe.strMealThumb }}
        style={appStyles.cardImage}
      />
      <View style={appStyles.cardBody}>
        <Text numberOfLines={2} style={appStyles.cardTitle}>
          {recipe.strMeal}
        </Text>
        <Text style={appStyles.cardLink}>Ver receta →</Text>
      </View>
    </Pressable>
  );
}
