import { Text, View } from "react-native";
import RecipeCard from "./RecipeCard";
import { appStyles } from "../styles/appStyles";

export default function RecipeResults({ recipes, message, onOpenRecipe }) {
  return (
    <>
      <View style={appStyles.resultsHeader}>
        <Text style={appStyles.resultsTitle}>Recetas para ti</Text>
        <Text style={appStyles.resultsDescription}>{message}</Text>
      </View>
      <View style={appStyles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onPress={() => onOpenRecipe(recipe.idMeal)}
          />
        ))}
      </View>
    </>
  );
}
