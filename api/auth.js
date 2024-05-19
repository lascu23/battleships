import axios from 'axios';

const API_URL = 'http://163.172.177.98:8081'; 

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register
    `, { email, password });
    return response.data;
  } catch (error) {
    console.error('Register error', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};



