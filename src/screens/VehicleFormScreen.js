import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicleId) {
      const fetchVehicle = async () => {
        try {
          const { data } = await getVeiculoById(vehicleId);
          setFormData({ ...data, ano: data.ano.toString() });
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
    if (!formData.placa || !formData.marca || !formData.modelo) {
      Alert.alert("Erro", "Placa, Marca e Modelo são obrigatórios.");
      return;
    }

    setLoading(true);
    const vehicleData = {
      ...formData,
      ano: parseInt(formData.ano, 10) || new Date().getFullYear(),
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Placa"
        value={formData.placa}
        onChangeText={(text) => handleChange("placa", text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Marca"
        value={formData.marca}
        onChangeText={(text) => handleChange("marca", text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Modelo"
        value={formData.modelo}
        onChangeText={(text) => handleChange("modelo", text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Ano"
        value={formData.ano}
        onChangeText={(text) => handleChange("ano", text)}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Cor"
        value={formData.cor}
        onChangeText={(text) => handleChange("cor", text)}
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        {vehicleId ? "Atualizar" : "Cadastrar"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
});

export default VehicleFormScreen;
