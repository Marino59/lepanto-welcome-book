import { client } from "@/sanity/client";

// GROQ Queries
const HOUSE_INFO_QUERY = `*[_type == "houseInfo"][0]`;
const RESTAURANTS_QUERY = `*[_type == "restaurant"]`;
const FACILITIES_QUERY = `*[_type == "facility"]`;
const EMERGENCIES_QUERY = `*[_type == "emergencyNumber"]`;

export const queries = {
  getHouseInfo: () => client.fetch(HOUSE_INFO_QUERY),
  getRestaurants: () => client.fetch(RESTAURANTS_QUERY),
  getFacilities: () => client.fetch(FACILITIES_QUERY),
  getEmergencies: () => client.fetch(EMERGENCIES_QUERY),
};
