import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { appStyles } from "./src/styles/appStyles";

// App.js se mantiene pequeño: solo prepara la pantalla principal.
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <SafeAreaView style={appStyles.safeArea}>
      <StatusBar style="dark" />
      {currentUser ? (
        <HomeScreen user={currentUser} onLogout={() => setCurrentUser(null)} />
      ) : (
        <LoginScreen onLogin={setCurrentUser} />
      )}
    </SafeAreaView>
  );
}
