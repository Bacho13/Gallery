import axios from "axios";
import { PhotoStatistics } from "./interfaces";

const API_URL = "https://api.unsplash.com/photos";
const CLIENT_ID = "EKBnl38asOo8pePKLOKzsKQMVYKDmDpwM4ONhC3tt7s";

// -------------პოპულარული ფოტოების აპი-------------------

export const fetchPopularPhotos = async (pageParam: number) => {
  try {
    const response = await axios.get(
      `${API_URL}?client_id=${CLIENT_ID}&order_by=popular&per_page=20&page=${pageParam}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching popular photos:", error);
    return [];
  }
};

// -------------ფოტოს დეტალების აპი-------------------

export const fetchPhotoStatistic = async (
  id: string
): Promise<PhotoStatistics | null> => {
  try {
    const response = await axios.get(
      `${API_URL}/${id}/statistics/?client_id=${CLIENT_ID}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching photo statistics:", error);
    return null; // Ensures consistency instead of returning an empty array
  }
};

//--------სერჩის აპი-------

export const searchPhoto = async (query: string, page: number = 1) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${CLIENT_ID}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }

  const data = await response.json();
  return data.results; // Extract results array
};
