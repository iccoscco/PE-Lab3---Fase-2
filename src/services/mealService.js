import { MEAL_DB_URL } from "../config/api";

// TheMealDB's free filter accepts English ingredient names. Keep these aliases
// here so the rest of the app can stay in Spanish.
const INGREDIENT_ALIASES = {
  pollo: "chicken",
  gallina: "chicken",
  arroz: "rice",
  huevo: "egg",
  huevos: "egg",
  tomate: "tomato",
  jitomate: "tomato",
  papa: "potato",
  patata: "potato",
  papas: "potato",
  atun: "tuna",
  cebolla: "onion",
  ajo: "garlic",
  zanahoria: "carrot",
  zanahorias: "carrot",
  queso: "cheese",
  leche: "milk",
  mantequilla: "butter",
  harina: "flour",
  limon: "lemon",
  lima: "lime",
  pescado: "fish",
  salmon: "salmon",
  carne: "beef",
  res: "beef",
  cerdo: "pork",
  tocino: "bacon",
  frijol: "kidney beans",
  frijoles: "kidney beans",
  maiz: "sweetcorn",
  choclo: "sweetcorn",
  champinon: "mushroom",
  champinones: "mushroom",
  hongos: "mushroom",
  crema: "double cream",
  aceite: "olive oil",
  "aceite de oliva": "olive oil",
};

function normalizeIngredient(ingredient) {
  return ingredient
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

export function toApiIngredient(ingredient) {
  const normalized = normalizeIngredient(ingredient);
  return INGREDIENT_ALIASES[normalized] || normalized.replace(/\s+/g, "_");
}

async function getMealsByIngredient(ingredient) {
  const apiIngredient = toApiIngredient(ingredient);
  const response = await fetch(
    `${MEAL_DB_URL}/filter.php?i=${encodeURIComponent(apiIngredient)}`,
  );
  if (!response.ok) {
    throw new Error(`TheMealDB respondió con estado ${response.status}.`);
  }
  const data = await response.json();
  return data.meals || [];
}

export async function findMealsByIngredients(ingredients) {
  const mealLists = await Promise.all(ingredients.map(getMealsByIngredient));
  if (mealLists.length === 0) return [];
  const matchingIds = mealLists.slice(1).reduce(
    (ids, meals) =>
      ids.filter((id) => meals.some((meal) => meal.idMeal === id)),
    mealLists[0].map((meal) => meal.idMeal),
  );
  return mealLists[0].filter((meal) => matchingIds.includes(meal.idMeal));
}

export async function getMealById(id) {
  const response = await fetch(`${MEAL_DB_URL}/lookup.php?i=${id}`);
  if (!response.ok) {
    throw new Error(`TheMealDB respondió con estado ${response.status}.`);
  }
  const data = await response.json();
  return data.meals?.[0] || null;
}

export function getIngredientLines(meal) {
  return Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    const ingredient = meal[`strIngredient${number}`];
    const measure = meal[`strMeasure${number}`];
    return ingredient?.trim() ? `${measure || ""} ${ingredient}`.trim() : null;
  }).filter(Boolean);
}
