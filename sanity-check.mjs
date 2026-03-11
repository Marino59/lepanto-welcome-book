import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fpczyqs3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function checkData() {
  const SIGHTSEEING_QUERY = `*[_type == "sightseeing"]{
    name,
    "imageUrl": mainImage.asset->url
  }`;
  
  try {
    const data = await client.fetch(SIGHTSEEING_QUERY);
    console.log('Sightseeing Data from Sanity:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

checkData();
