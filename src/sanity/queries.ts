import { client } from "@/sanity/client";

// GROQ Queries
const HOUSE_INFO_QUERY = `*[_type == "houseInfo"][0]`;
const RESTAURANTS_QUERY = `*[_type == "restaurant"]`;
const FACILITIES_QUERY = `*[_type == "facility"]`;
const EMERGENCIES_QUERY = `*[_type == "emergencyNumber"]`;
const SIGHTSEEING_QUERY = `*[_type == "sightseeing"]{
  name,
  description,
  address,
  icon,
  "mainImage": mainImage.asset->url
}`;

export const queries = {
  getHouseInfo: () => client.fetch(HOUSE_INFO_QUERY, {}, { next: { revalidate: 60 } }),
  getRestaurants: () => client.fetch(RESTAURANTS_QUERY, {}, { next: { revalidate: 3600 } }),
  getFacilities: () => client.fetch(FACILITIES_QUERY),
  getEmergencies: () => client.fetch(EMERGENCIES_QUERY),
  getSightseeing: () => client.fetch(SIGHTSEEING_QUERY, {}, { next: { revalidate: 10 } }),
};
