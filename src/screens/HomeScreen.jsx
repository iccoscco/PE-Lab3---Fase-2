import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import IngredientSelector from "../components/IngredientSelector";
import RecipeDetailModal from "../components/RecipeDetailModal";
import RecipeResults from "../components/RecipeResults";
import { findMealsByIngredients, getMealById } from "../services/mealService";
import { appStyles } from "../styles/appStyles";

const normalizeIngredient = (text) =>
  text.trim().toLowerCase().replace(/\s+/g, " ");

export default function HomeScreen({ user, onLogout }) {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState(["pollo", "arroz"]);
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState(
    "Añade lo que tienes y encontraremos una idea para cocinar.",
  );
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const buttonLabel = useMemo(() => {
    if (!ingredients.length) return "Añade un ingrediente";
    return `Buscar con ${ingredients.length} ingrediente${ingredients.length === 1 ? "" : "s"}`;
  }, [ingredients]);

  function addIngredient(value = inputValue) {
    const clean = normalizeIngredient(value);
    if (!clean || ingredients.includes(clean)) {
      setInputValue("");
      return;
    }
    setIngredients((current) => [...current, clean]);
    setInputValue("");
  }

  function removeIngredient(ingredient) {
    setIngredients((current) => current.filter((item) => item !== ingredient));
  }

  async function searchRecipes() {
    if (!ingredients.length) return;
    setIsSearching(true);
    setRecipes([]);
    setMessage("Buscando combinaciones...");
    try {
      const results = await findMealsByIngredients(ingredients);
      setRecipes(results.slice(0, 12));
      setMessage(
        results.length
          ? `Encontramos ${results.length} receta${results.length === 1 ? "" : "s"} que combinan con tu despensa.`
          : "No encontramos recetas para esa combinación. Revisa los nombres o prueba con menos ingredientes.",
      );
    } catch {
      setMessage(
        "No se pudo conectar con el recetario. Revisa tu conexión e inténtalo otra vez.",
      );
    } finally {
      setIsSearching(false);
    }
  }

  async function openRecipe(id) {
    setIsLoadingDetail(true);
    try {
      setSelectedRecipe(await getMealById(id));
    } finally {
      setIsLoadingDetail(false);
    }
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={appStyles.screen}
        keyboardShouldPersistTaps="handled"
      >
        <View style={appStyles.header}>
          <View>
            <Text style={appStyles.logo}>Cookly</Text>
            <Text style={appStyles.headerSubtitle}>Hola, {user.name}</Text>
          </View>
          <Pressable
            onPress={onLogout}
            accessibilityLabel="Cerrar sesión local"
          >
            <Text style={appStyles.headerSubtitle}>Salir</Text>
          </Pressable>
        </View>
        <View style={appStyles.hero}>
          <Text style={appStyles.heroTitle}>Decide tu próxima comida</Text>
          <Text style={appStyles.heroDescription}>
            Usa los ingredientes que ya tienes y encuentra una receta para hoy.
          </Text>
        </View>
        <IngredientSelector
          value={inputValue}
          ingredients={ingredients}
          onChange={setInputValue}
          onAdd={addIngredient}
          onRemove={removeIngredient}
        />
        <View style={appStyles.searchWrap}>
          <Pressable
            style={[
              appStyles.searchButton,
              !ingredients.length && appStyles.disabledButton,
            ]}
            onPress={searchRecipes}
            disabled={!ingredients.length || isSearching}
          >
            {isSearching ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={appStyles.searchButtonText}>🔍 {buttonLabel}</Text>
            )}
          </Pressable>
        </View>
        <RecipeResults
          recipes={recipes}
          message={message}
          onOpenRecipe={openRecipe}
        />
      </ScrollView>
      <RecipeDetailModal
        recipe={selectedRecipe}
        isLoading={isLoadingDetail}
        onClose={() => setSelectedRecipe(null)}
      />
      <View style={appStyles.bottomNav}>
        <View style={appStyles.navItem}>
          <Text style={[appStyles.navIcon, appStyles.navActiveIcon]}>▰</Text>
          <Text style={[appStyles.navLabel, appStyles.navActiveLabel]}>
            Inicio
          </Text>
        </View>
        <View style={appStyles.navItem}>
          <Text style={appStyles.navIcon}>♡</Text>
          <Text style={appStyles.navLabel}>Guardados</Text>
        </View>
        <View style={appStyles.navItem}>
          <Text style={appStyles.navIcon}>◷</Text>
          <Text style={appStyles.navLabel}>Historial</Text>
        </View>
        <View style={appStyles.navItem}>
          <Text style={appStyles.navIcon}>◉</Text>
          <Text style={appStyles.navLabel}>Perfil</Text>
        </View>
      </View>
    </>
  );
}
