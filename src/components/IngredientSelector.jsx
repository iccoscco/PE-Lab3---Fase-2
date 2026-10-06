import { Pressable, Text, TextInput, View } from "react-native";
import { INGREDIENT_SUGGESTIONS } from "../config/api";
import { appStyles } from "../styles/appStyles";

export default function IngredientSelector({
  value,
  ingredients,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <View style={appStyles.section}>
      <Text style={appStyles.label}>¿Qué ingredientes tienes?</Text>
      <View style={appStyles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Ej. cebolla"
          placeholderTextColor="#8A8A8A"
          style={appStyles.input}
          onSubmitEditing={() => onAdd()}
          returnKeyType="done"
        />
        <Pressable
          style={appStyles.addButton}
          onPress={() => onAdd()}
          accessibilityLabel="Agregar ingrediente"
        >
          <Text style={appStyles.addButtonText}>+</Text>
        </Pressable>
      </View>
      <View style={appStyles.chips}>
        {ingredients.map((item) => (
          <Pressable
            key={item}
            style={appStyles.chip}
            onPress={() => onRemove(item)}
          >
            <Text style={appStyles.chipText}>{item} ×</Text>
          </Pressable>
        ))}
      </View>
      <Text style={appStyles.helper}>Sugerencias rápidas</Text>
      <View style={appStyles.suggestions}>
        {INGREDIENT_SUGGESTIONS.filter(
          (item) => !ingredients.includes(item),
        ).map((item) => (
          <Pressable
            key={item}
            onPress={() => onAdd(item)}
            style={appStyles.suggestion}
          >
            <Text style={appStyles.suggestionText}>+ {item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
