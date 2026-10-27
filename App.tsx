
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomePage from "./src/homepage";
import LoginScreen from "./src/login_signup";
import "./src/global.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "login">("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <View className="flex-1">
        <StatusBar style="light" />

        {currentPage === "home" ? (
          <HomePage
            isLoggedIn={isLoggedIn}
            onLoginPress={() => setCurrentPage("login")}
            onLogout={() => {
              setIsLoggedIn(false);
              setCurrentPage("home");
            }}
          />
        ) : (
          <LoginScreen
            onBack={() => setCurrentPage("home")}
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setCurrentPage("home");
            }}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}
