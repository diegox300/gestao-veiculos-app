// src/screens/VehicleDetailScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Importar useFocusEffect
import { getVeiculoById, deleteVeiculo } from "../services/api";

const VehicleDetailScreen = ({ route, navigation }) => {
  const { vehicleId } = route.params;
  const [vehicle, setVehicle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchVehicle = async () => {
    console.log("Buscando dados atualizados do veículo...");
    try {
      const { data } = await getVeiculoById(vehicleId);
      setVehicle(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do veículo:", error);
    }
  };

  // Usar useFocusEffect para re-buscar os dados sempre que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      fetchVehicle();
    }, [vehicleId])
  );

  const handleDeletePress = () => {
    console.log("Botão Excluir pressionado, mostrando o modal.");
    setIsModalVisible(true);
  };

  const performDelete = async () => {
    console.log("Usuário confirmou a exclusão. Tentando apagar...");
    try {
      await deleteVeiculo(vehicleId);
      console.log("Veículo apagado com sucesso.");
      setIsModalVisible(false);
      navigation.goBack();
    } catch (error) {
      setIsModalVisible(false);
      console.error(
        "Erro ao excluir veículo:",
        error.toJSON ? error.toJSON() : error
      );
      Alert.alert("Erro", "Não foi possível excluir o veículo.");
    }
  };

  if (!vehicle) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalText}>
              Você tem certeza que deseja excluir este veículo?
            </Text>
            <View style={styles.modalButtonContainer}>
              <Button
                title="Cancelar"
                onPress={() => setIsModalVisible(false)}
              />
              <Button title="Excluir" color="red" onPress={performDelete} />
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.detailText}>Placa: {vehicle.placa}</Text>
      <Text style={styles.detailText}>Marca: {vehicle.marca}</Text>
      <Text style={styles.detailText}>Modelo: {vehicle.modelo}</Text>
      <Text style={styles.detailText}>Ano: {vehicle.ano}</Text>
      <Text style={styles.detailText}>Cor: {vehicle.cor}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Editar"
          onPress={() =>
            navigation.navigate("VehicleForm", { vehicleId: vehicle.id })
          }
        />
        <Button title="Excluir" color="red" onPress={handleDeletePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 16 },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default VehicleDetailScreen;
