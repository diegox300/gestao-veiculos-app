import axios from "axios";

// Troque pelo IP correto se não estiver usando emulador iOS
const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

export const getVeiculos = () => api.get("/veiculos");
export const getVeiculoById = (id) => api.get(`/veiculos/${id}`);
export const createVeiculo = (veiculo) => api.post("/veiculos", veiculo);
export const updateVeiculo = (id, veiculo) =>
  api.put(`/veiculos/${id}`, veiculo);
export const deleteVeiculo = (id) => api.delete(`/veiculos/${id}`);

export default api;
