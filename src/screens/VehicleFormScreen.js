import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
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
  const [errors, setErrors] = useState({});
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
    // Se o campo for 'ano', permite apenas números
    if (name === "ano") {
      if (!/^[0-9]*$/.test(value)) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.placa) newErrors.placa = "Placa é obrigatória";
    if (!formData.marca) newErrors.marca = "Marca é obrigatória";
    if (!formData.modelo) newErrors.modelo = "Modelo é obrigatório";
    if (!formData.ano) newErrors.ano = "Ano é obrigatório";
    if (!formData.cor) newErrors.cor = "Cor é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
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
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Placa"
          value={formData.placa}
          onChangeText={(text) => handleChange("placa", text)}
          style={styles.input}
          mode="outlined"
          error={!!errors.placa}
        />
        <HelperText type="error" visible={!!errors.placa}>
          {errors.placa}
        </HelperText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Marca"
          value={formData.marca}
          onChangeText={(text) => handleChange("marca", text)}
          style={styles.input}
          mode="outlined"
          error={!!errors.marca}
        />
        <HelperText type="error" visible={!!errors.marca}>
          {errors.marca}
        </HelperText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Modelo"
          value={formData.modelo}
          onChangeText={(text) => handleChange("modelo", text)}
          style={styles.input}
          mode="outlined"
          error={!!errors.modelo}
        />
        <HelperText type="error" visible={!!errors.modelo}>
          {errors.modelo}
        </HelperText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Ano"
          value={formData.ano}
          onChangeText={(text) => handleChange("ano", text)}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
          error={!!errors.ano}
        />
        <HelperText type="error" visible={!!errors.ano}>
          {errors.ano}
        </HelperText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Cor"
          value={formData.cor}
          onChangeText={(text) => handleChange("cor", text)}
          style={styles.input}
          mode="outlined"
          error={!!errors.cor}
        />
        <HelperText type="error" visible={!!errors.cor}>
          {errors.cor}
        </HelperText>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        {vehicleId ? "Atualizar" : "Cadastrar"}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    // O marginBottom foi movido para o inputContainer
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
});

export default VehicleFormScreen;
