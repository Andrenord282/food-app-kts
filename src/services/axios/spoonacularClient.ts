import axios, { AxiosInstance } from 'axios';
import { BASE_URL_SPOONACULAR_API } from 'config/services';

const spoonacularClient: AxiosInstance = axios.create({
  baseURL: BASE_URL_SPOONACULAR_API,
});

export default spoonacularClient;
