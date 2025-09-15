import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput, // Importar TextInput
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getVeiculos } from "../services/api";

const VehicleListScreen = ({ navigation }) => {
  const [veiculos, setVeiculos] = useState([]);
  const [filteredVeiculos, setFilteredVeiculos] = useState([]); // Lista para exibição
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
      setFilteredVeiculos(response.data); // Inicializa a lista filtrada
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

  // Efeito para aplicar os filtros
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
      <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("VehicleDetail", { vehicleId: item.id })
      }
    >
      <Text style={styles.itemTitle}>
        {item.marca} {item.modelo}
      </Text>
      <Text style={styles.itemSubtitle}>
        {item.placa} - {item.ano} - {item.cor}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Seção de Filtros */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Filtrar por Placa"
          value={filters.placa}
          onChangeText={(text) => handleFilterChange("placa", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Filtrar por Marca"
          value={filters.marca}
          onChangeText={(text) => handleFilterChange("marca", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Filtrar por Modelo"
          value={filters.modelo}
          onChangeText={(text) => handleFilterChange("modelo", text)}
        />
      </View>

      <FlatList
        data={filteredVeiculos} // Usar a lista filtrada
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("VehicleForm")}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: "#007bff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabIcon: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 24,
  },
});

export default VehicleListScreen;
