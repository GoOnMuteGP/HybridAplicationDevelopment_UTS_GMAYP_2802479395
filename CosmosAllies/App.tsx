
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import HomePage from "./src/homepage";
import LoginScreen from "./src/login_signup";
import "./src/global.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "login">("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      {currentPage === "home" ? (
        <HomePage
          isLoggedIn={isLoggedIn}
          onLoginPress={() => setCurrentPage("login")}
          onLogout={handleLogout}
        />
      ) : (
        <LoginScreen
          onBack={() => setCurrentPage("home")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </View>
  );
}
