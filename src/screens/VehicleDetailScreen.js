import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  ActivityIndicator,
  Card,
  Paragraph,
  Button,
  Dialog,
  Portal,
  useTheme,
  Avatar, // 1. Importar Avatar
  Text as PaperText, // 2. Renomear Text para evitar conflito
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { getVeiculoById, deleteVeiculo } from "../services/api";

const VehicleDetailScreen = ({ route, navigation }) => {
  // ... (código existente sem alterações)

  const { vehicleId } = route.params;
  const [vehicle, setVehicle] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const { colors } = useTheme();

  const fetchVehicle = async () => {
    try {
      const { data } = await getVeiculoById(vehicleId);
      setVehicle(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do veículo:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchVehicle();
    }, [vehicleId])
  );

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => setIsDialogVisible(false);

  const performDelete = async () => {
    hideDialog();
    try {
      await deleteVeiculo(vehicleId);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      Alert.alert("Erro", "Não foi possível excluir o veículo.");
    }
  };

  if (!vehicle) {
    return (
      <ActivityIndicator animating={true} size="large" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Confirmar Exclusão</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Você tem certeza que deseja excluir este veículo?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={performDelete} textColor={colors.error}>
              Excluir
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Card style={styles.card}>
        <Card.Title
          title="Detalhes do Veículo"
          titleStyle={styles.cardTitle}
          left={(props) => <Avatar.Icon {...props} icon="car-info" />} // 3. Usar Avatar.Icon
        />
        <Card.Content>
          {/* 4. Usar PaperText para os detalhes */}
          <View style={styles.detailRow}>
            <PaperText style={styles.detailLabel}>Placa:</PaperText>
            <PaperText style={styles.detailValue}>{vehicle.placa}</PaperText>
          </View>
          <View style={styles.detailRow}>
            <PaperText style={styles.detailLabel}>Marca:</PaperText>
            <PaperText style={styles.detailValue}>{vehicle.marca}</PaperText>
          </View>
          <View style={styles.detailRow}>
            <PaperText style={styles.detailLabel}>Modelo:</PaperText>
            <PaperText style={styles.detailValue}>{vehicle.modelo}</PaperText>
          </View>
          <View style={styles.detailRow}>
            <PaperText style={styles.detailLabel}>Ano:</PaperText>
            <PaperText style={styles.detailValue}>{vehicle.ano}</PaperText>
          </View>
          <View style={styles.detailRow}>
            <PaperText style={styles.detailLabel}>Cor:</PaperText>
            <PaperText style={styles.detailValue}>{vehicle.cor}</PaperText>
          </View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            icon="pencil"
            mode="contained"
            onPress={() =>
              navigation.navigate("VehicleForm", { vehicleId: vehicle.id })
            }
          >
            Editar
          </Button>
          <Button
            icon="delete"
            mode="outlined"
            onPress={showDialog}
            textColor={colors.error}
            style={{ borderColor: colors.error }}
          >
            Excluir
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
  },
  actions: {
    justifyContent: "space-around",
    padding: 16,
  },
});

export default VehicleDetailScreen;
