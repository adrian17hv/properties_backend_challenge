import dotenv from "dotenv";
import axios from "axios";
import { House } from "../types/types";

dotenv.config();

const PHOTOS_URL = process.env.API_PHOTOS_URL || "";
const MAX_RETRIES = 3;

export const fetchHouses = async (page: number, retries = MAX_RETRIES): Promise<House[]> => {
  try {
    const response = await axios.get(PHOTOS_URL, { params: { page, per_page: 10 } });
    return response.data.houses || [];
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying page ${page}... (${MAX_RETRIES - retries + 1})`);
      return fetchHouses(page, retries - 1);
    }
    console.error(`Failed to fetch page ${page}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return [];
  }
};