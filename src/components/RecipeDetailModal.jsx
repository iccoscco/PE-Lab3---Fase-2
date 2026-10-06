import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { getIngredientLines } from "../services/mealService";
import { appStyles } from "../styles/appStyles";
import { colors } from "../styles/theme";

export default function RecipeDetailModal({ recipe, isLoading, onClose }) {
  return (
    <Modal
      visible={Boolean(recipe) || isLoading}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={appStyles.modal}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={appStyles.detailLoader}
          />
        ) : (
          recipe && (
            <ScrollView>
              <Pressable onPress={onClose} style={appStyles.closeButton}>
                <Text style={appStyles.closeButtonText}>← Volver</Text>
              </Pressable>
              <Image
                source={{ uri: recipe.strMealThumb }}
                style={appStyles.detailImage}
              />
              <View style={appStyles.detailBody}>
                <Text style={appStyles.detailTitle}>{recipe.strMeal}</Text>
                <Text style={appStyles.category}>
                  {recipe.strCategory} · {recipe.strArea}
                </Text>
                <Text style={appStyles.detailHeading}>Ingredientes</Text>
                {getIngredientLines(recipe).map((item) => (
                  <Text style={appStyles.ingredientLine} key={item}>
                    • {item}
                  </Text>
                ))}
                <Text style={appStyles.detailHeading}>Preparación</Text>
                <Text style={appStyles.instructions}>
                  {recipe.strInstructions}
                </Text>
              </View>
            </ScrollView>
          )
        )}
      </SafeAreaView>
    </Modal>
  );
}
