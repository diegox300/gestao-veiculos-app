// src/screens/VehicleFormScreen.js
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getVeiculoById, createVeiculo, updateVeiculo } from "../services/api";

const VehicleFormScreen = ({ route, navigation }) => {
  const { vehicleId } = route.params || {};
  const [formData, setFormData] = useState({
    placa: "",
    marca: "",
    modelo: "",
    ano: "",
    cor: "",
  });

  useEffect(() => {
    if (vehicleId) {
      const fetchVehicle = async () => {
        try {
          const { data } = await getVeiculoById(vehicleId);
          setFormData({ ...data, ano: data.ano.toString() }); // Converte ano para string
        } catch (error) {
          console.error("Erro ao buscar dados do veículo:", error);
        }
      };
      fetchVehicle();
    }
  }, [vehicleId]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Validação simples
    if (!formData.placa || !formData.marca || !formData.modelo) {
      Alert.alert("Erro", "Placa, Marca e Modelo são obrigatórios.");
      return;
    }

    const vehicleData = {
      ...formData,
      ano: parseInt(formData.ano, 10) || new Date().getFullYear(), // Converte ano para número
    };

    try {
      if (vehicleId) {
        await updateVeiculo(vehicleId, vehicleData);
        Alert.alert("Sucesso", "Veículo atualizado com sucesso!");
      } else {
        await createVeiculo(vehicleData);
        Alert.alert("Sucesso", "Veículo cadastrado com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      Alert.alert("Erro", "Não foi possível salvar o veículo.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Placa"
        value={formData.placa}
        onChangeText={(text) => handleChange("placa", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={formData.marca}
        onChangeText={(text) => handleChange("marca", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={formData.modelo}
        onChangeText={(text) => handleChange("modelo", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano"
        value={formData.ano}
        onChangeText={(text) => handleChange("ano", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cor"
        value={formData.cor}
        onChangeText={(text) => handleChange("cor", text)}
      />
      <Button
        title={vehicleId ? "Atualizar" : "Cadastrar"}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  itemContainer: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemTitle: { fontSize: 18, fontWeight: "bold" },
  itemSubtitle: { fontSize: 14, color: "gray" },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#007bff",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: { fontSize: 30, color: "white" },
});

export default VehicleFormScreen;
