import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { appStyles } from "../styles/appStyles";

// Inicio de sesión local: solo valida campos, no llama a ningún servidor.
export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (!name.trim() || !email.includes("@") || password.length < 4) {
      setError(
        "Completa tu nombre, un correo válido y una contraseña de 4 caracteres.",
      );
      return;
    }
    onLogin({ name: name.trim(), email: email.trim() });
  }

  return (
    <View style={appStyles.loginScreen}>
      <View style={appStyles.loginBrandRow}>
        <View style={appStyles.loginLogo}>
          <Text style={appStyles.loginLogoText}>C</Text>
        </View>
        <Text style={appStyles.loginBrand}>Cookly</Text>
      </View>
      <View style={appStyles.loginCard}>
        <Text style={appStyles.loginTitle}>Cocina con lo que tienes</Text>
        <Text style={appStyles.loginDescription}>
          Ingresa para guardar tus ideas de comida en una sesión local.
        </Text>
        <Text style={appStyles.inputLabel}>Tu nombre</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ej. Andrea"
          style={appStyles.loginInput}
        />
        <Text style={appStyles.inputLabel}>Correo electrónico</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="tu@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={appStyles.loginInput}
        />
        <Text style={appStyles.inputLabel}>Contraseña</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Mínimo 4 caracteres"
          secureTextEntry
          style={appStyles.loginInput}
        />
        {error ? <Text style={appStyles.loginError}>{error}</Text> : null}
        <Pressable style={appStyles.loginButton} onPress={handleLogin}>
          <Text style={appStyles.loginButtonText}>Entrar a Cookly →</Text>
        </Pressable>
        <Text style={appStyles.loginNote}>
          Modo demostración: tus datos no se envían ni se guardan en un
          servidor.
        </Text>
      </View>
    </View>
  );
}
