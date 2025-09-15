import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import VehicleListScreen from "../screens/VehicleListScreen";
import VehicleDetailScreen from "../screens/VehicleDetailScreen";
import VehicleFormScreen from "../screens/VehicleFormScreen";

const Stack = createStackNavigator();

const CustomHeaderTitle = ({ title, iconName }) => (
  <View style={styles.headerContainer}>
    <MaterialCommunityIcons name={iconName} size={24} color="#fff" />
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

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
        options={{
          headerTitle: () => (
            <CustomHeaderTitle title="Garagem" iconName="garage" />
          ),
        }}
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default AppNavigator;
