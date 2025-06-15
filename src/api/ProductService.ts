import axios from 'axios';
import type {Product} from "../types/Product.ts";

const Product_URL = 'http://localhost:8080/api/product';

export const fetchProduct = async (): Promise<Product[]> => {
    const response = await axios.get(Product_URL);
    return response.data;
}