import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";

// 1. Definir o tema customizado
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007bff", // Cor primária azul
    accent: "#f1c40f", // Uma cor de destaque, se necessário
  },
};

export default function App() {
  return (
    // 2. Aplicar o tema no PaperProvider
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
