import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env from .env.local
dotenv.config({ path: resolve(__dirname, '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-03-11',
  token: process.env.SANITY_WRITE_TOKEN,
});

const action = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  if (action === 'add-restaurant') {
    const [name, address, description, icon = 'utensils'] = args;
    if (!name || !address) {
      console.error('Usage: node sanity-manager.mjs add-restaurant "Name" "Address" "Description" "Icon"');
      return;
    }
    await client.create({ _type: 'restaurant', name, address, description, icon });
    console.log(`✅ Restaurant "${name}" added!`);
  } 
  
  else if (action === 'update-icon') {
    const [namePattern, newIcon] = args;
    if (!namePattern || !newIcon) {
      console.error('Usage: node sanity-manager.mjs update-icon "Name" "new-icon-name"');
      return;
    }
    const query = `*[_type in ["restaurant", "facility"] && name match "${namePattern}"]{_id, name}`;
    const docs = await client.fetch(query);
    for (const doc of docs) {
      await client.patch(doc._id).set({ icon: newIcon }).commit();
      console.log(`✅ Updated icon for "${doc.name}" to "${newIcon}"`);
    }
  }

  else if (action === 'add-facility') {
    const [name, address, description, icon = 'info'] = args;
    if (!name || !address) {
      console.error('Usage: node sanity-manager.mjs add-facility "Name" "Address" "Description" "Icon"');
      return;
    }
    await client.create({ _type: 'facility', name, address, description, icon });
    console.log(`✅ Facility "${name}" added!`);
  }

  else if (action === 'delete-restaurant') {
    const namePattern = args[0];
    const query = `*[_type == "restaurant" && name match "${namePattern}"]{_id, name}`;
    const docs = await client.fetch(query);
    for (const doc of docs) {
      await client.delete(doc._id);
      await client.delete(`drafts.${doc._id}`);
      console.log(`🗑️ Deleted: ${doc.name}`);
    }
  }

  else if (action === 'list') {
    const query = '*[_type == "restaurant"]{name, address}';
    const docs = await client.fetch(query);
    console.table(docs);
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
