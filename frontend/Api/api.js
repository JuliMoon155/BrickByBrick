import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Cambia la URL a la de tu backend

export const fetchBeneficiarios = () => axios.get(`${API_URL}/beneficiarios/`);
export const fetchEmpresas = () => axios.get(`${API_URL}/empresas/`);
export const createBeneficiario = (data) => axios.post(`${API_URL}/beneficiarios/`, data);
export const createEmpresa = (data) => axios.post(`${API_URL}/empresas/`, data);
export const updateBeneficiario = (id, data) => axios.put(`${API_URL}/beneficiarios/${id}/`, data);
export const updateEmpresa = (id, data) => axios.put(`${API_URL}/empresas/${id}/`, data);
export const deleteBeneficiario = (id) => axios.delete(`${API_URL}/beneficiarios/${id}/`);
export const deleteEmpresa = (id) => axios.delete(`${API_URL}/empresas/${id}/`);
