import fs from 'fs';
import path from 'path';

// 1. Load Credentials
const envFilePath = path.resolve(process.cwd(), 'credentials', '.env');
const envFile = fs.readFileSync(envFilePath, 'utf-8');
const env = {};
envFile.split(/\r?\n/).forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match && !match[1].startsWith('#')) {
    env[match[1].trim()] = match[2].trim();
  }
});

const API_URL = env['WP_API_URL'];
const EMAIL = env['WP_API_EMAIL'];
const PASSWORD = env['WP_API_PASSWORD'];
const base64Credentials = Buffer.from(`${EMAIL}:${PASSWORD}`).toString('base64');

const authHeaders = {
  'Authorization': `Basic ${base64Credentials}`,
  'Content-Type': 'application/json'
};

// 2. Read Content Directory
const contentDir = path.resolve(process.cwd(), 'content');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));

async function pushToWordPress(filename, jsonData) {
  const name = filename.replace('.json', '');
  
  // Format the title nicely
  const title = name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Wrap the data in a hidden script tag
  const postContent = `
<!-- wp:html -->
<script type="application/json" class="headless-data" id="data-${name}">
${JSON.stringify(jsonData, null, 2)}
</script>
<!-- /wp:html -->
  `.trim();

  // Determine post type (blog stub goes to 'posts', rest to 'pages')
  const endpoint = name === 'blog-stub' ? '/posts' : '/pages';

  console.log(`Pushing ${name} to ${endpoint}...`);

  try {
    // First, check if a page/post with this slug already exists
    const searchRes = await fetch(`${API_URL}${endpoint}?slug=${name}`, {
      headers: authHeaders
    });
    const existing = await searchRes.json();

    let method = 'POST';
    let url = `${API_URL}${endpoint}`;
    
    if (existing && existing.length > 0) {
      // Update existing
      method = 'POST'; // WP REST API uses POST for updates to specific ID endpoint
      url = `${API_URL}${endpoint}/${existing[0].id}`;
      console.log(`  Updating existing ID: ${existing[0].id}`);
    } else {
      console.log(`  Creating new record...`);
    }

    const payload = {
      title: title,
      content: postContent,
      status: 'publish',
      slug: name
    };

    const res = await fetch(url, {
      method,
      headers: authHeaders,
      body: JSON.stringify(payload)
    });

    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      console.log(`  ✅ Success: ${data.link}`);
    } else {
      const err = await res.json();
      console.error(`  ❌ Failed: ${res.status}`, err);
    }
  } catch (error) {
    console.error(`  ❌ Error processing ${name}:`, error);
  }
}

async function migrate() {
  console.log(`Starting Headless Migration to ${API_URL}\n`);
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    try {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(rawData);
      await pushToWordPress(file, jsonData);
    } catch (e) {
      console.error(`Failed to parse ${file}:`, e.message);
    }
  }
  
  console.log('\nMigration Complete.');
}

migrate();
