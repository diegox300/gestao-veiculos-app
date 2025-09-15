import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VehicleListScreen from "../screens/VehicleListScreen";
import VehicleDetailScreen from "../screens/VehicleDetailScreen";
import VehicleFormScreen from "../screens/VehicleFormScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="VehicleList"
      screenOptions={{
        headerStyle: { backgroundColor: "#007bff" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="VehicleList"
        component={VehicleListScreen}
        options={{ title: "Garagem" }}
      />
      <Stack.Screen
        name="VehicleDetail"
        component={VehicleDetailScreen}
        options={{ title: "Detalhes do Veículo" }}
      />
      <Stack.Screen
        name="VehicleForm"
        component={VehicleFormScreen}
        options={({ route }) => ({
          title: route.params?.vehicleId
            ? "Editar Veículo"
            : "Cadastrar Veículo",
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
