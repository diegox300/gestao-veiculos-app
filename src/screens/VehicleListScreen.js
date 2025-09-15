import React, { useState, useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Card,
  FAB,
  TextInput,
  Avatar,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { getVeiculos } from "../services/api";

const VehicleListScreen = ({ navigation }) => {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVeiculos, setFilteredVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    placa: "",
    marca: "",
    modelo: "",
  });

  const fetchVeiculos = async () => {
    try {
      setLoading(true);
      const response = await getVeiculos();
      setVeiculos(response.data);
      setFilteredVeiculos(response.data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      alert("Não foi possível carregar os veículos.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchVeiculos();
    }, [])
  );

  useEffect(() => {
    let data = [...veiculos];
    if (filters.placa) {
      data = data.filter((v) =>
        v.placa.toLowerCase().includes(filters.placa.toLowerCase())
      );
    }
    if (filters.marca) {
      data = data.filter((v) =>
        v.marca.toLowerCase().includes(filters.marca.toLowerCase())
      );
    }
    if (filters.modelo) {
      data = data.filter((v) =>
        v.modelo.toLowerCase().includes(filters.modelo.toLowerCase())
      );
    }
    setFilteredVeiculos(data);
  }, [filters, veiculos]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <ActivityIndicator
        animating={true}
        size="large"
        style={styles.loader}
      />
    );
  }

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("VehicleDetail", { vehicleId: item.id })
      }
    >
      <Card.Title
        title={`${item.marca} ${item.modelo}`}
        subtitle={`${item.placa} - ${item.ano} - ${item.cor}`}
        left={(props) => <Avatar.Icon {...props} icon="car" />}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          label="Filtrar por Placa"
          value={filters.placa}
          onChangeText={(text) => handleFilterChange("placa", text)}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="magnify" />}
        />
        <TextInput
          label="Filtrar por Marca"
          value={filters.marca}
          onChangeText={(text) => handleFilterChange("marca", text)}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="magnify" />}
        />
        <TextInput
          label="Filtrar por Modelo"
          value={filters.modelo}
          onChangeText={(text) => handleFilterChange("modelo", text)}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>

      <FlatList
        data={filteredVeiculos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("VehicleForm")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  input: {
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 90, // Espaço para o FAB não sobrepor o último item
  },
  card: {
    marginVertical: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default VehicleListScreen;
