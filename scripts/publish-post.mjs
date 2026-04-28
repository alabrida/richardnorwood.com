/**
 * Publish a blog post from a markdown draft to WordPress.
 * 
 * Usage: node scripts/publish-post.mjs <path-to-draft.md> [--draft]
 * 
 * Options:
 *   --draft    Publish as draft instead of published (default: draft)
 *   --publish  Publish immediately
 */

import fs from 'fs';
import path from 'path';

// ── Load credentials ────────────────────────────────────────────────
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

// ── Parse CLI args ──────────────────────────────────────────────────
const args = process.argv.slice(2);
const draftPath = args.find(a => !a.startsWith('--'));
const status = args.includes('--publish') ? 'publish' : 'draft';

if (!draftPath) {
  console.error('Usage: node scripts/publish-post.mjs <path-to-draft.md> [--draft|--publish]');
  process.exit(1);
}

// ── Read and parse the markdown file ────────────────────────────────
const raw = fs.readFileSync(draftPath, 'utf-8');
const lines = raw.split(/\r?\n/);

// Extract title from first H1
const titleLine = lines.find(l => l.startsWith('# '));
const title = titleLine ? titleLine.replace(/^#\s+/, '') : 'Untitled Post';

// Extract subtitle
const subtitleLine = lines.find(l => l.startsWith('**Subtitle:**'));
const subtitle = subtitleLine ? subtitleLine.replace(/\*\*Subtitle:\*\*\s*/, '') : '';

// Find content start (after the first ---)
const firstHrIndex = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
const contentLines = lines.slice(firstHrIndex + 1);

// Remove metadata lines (Author, Category, CTA Target)
const filteredLines = contentLines.filter(l => {
  return !l.startsWith('**Author:**') && 
         !l.startsWith('**Category:**') && 
         !l.startsWith('**CTA Target:**') &&
         !l.startsWith('**Subtitle:**');
});

// ── Convert markdown to HTML ────────────────────────────────────────
function mdToHtml(md) {
  let html = md;
  
  // Tables
  html = convertTables(html);
  
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  
  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, match => `<ul>\n${match}</ul>\n`);
  
  // Paragraphs - wrap non-tag lines
  const outputLines = [];
  const tagLine = /^(<h[1-6]|<ul|<\/ul|<ol|<\/ol|<li|<hr|<table|<\/table|<thead|<\/thead|<tbody|<\/tbody|<tr|<\/tr|<th|<td|$)/;
  
  for (const line of html.split('\n')) {
    if (line.trim() === '') {
      outputLines.push('');
    } else if (tagLine.test(line.trim())) {
      outputLines.push(line);
    } else {
      outputLines.push(`<p>${line}</p>`);
    }
  }
  
  return outputLines.join('\n');
}

function convertTables(md) {
  const lines = md.split('\n');
  const result = [];
  let i = 0;
  
  while (i < lines.length) {
    // Detect table: line with pipes, followed by separator line with dashes
    if (lines[i] && lines[i].includes('|') && 
        i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1].trim())) {
      
      // Header row
      const headers = lines[i].split('|').map(c => c.trim()).filter(c => c !== '');
      i++; // skip header
      i++; // skip separator
      
      let tableHtml = '<table>\n<thead>\n<tr>';
      for (const h of headers) {
        tableHtml += `<th>${h}</th>`;
      }
      tableHtml += '</tr>\n</thead>\n<tbody>';
      
      // Body rows
      while (i < lines.length && lines[i] && lines[i].includes('|')) {
        const cells = lines[i].split('|').map(c => c.trim()).filter(c => c !== '');
        tableHtml += '\n<tr>';
        for (const cell of cells) {
          tableHtml += `<td>${cell}</td>`;
        }
        tableHtml += '</tr>';
        i++;
      }
      
      tableHtml += '\n</tbody>\n</table>';
      result.push(tableHtml);
    } else {
      result.push(lines[i]);
      i++;
    }
  }
  
  return result.join('\n');
}

const content = mdToHtml(filteredLines.join('\n'));

// Generate excerpt from Key Takeaways or first paragraph
const excerptSource = subtitle || 'Revenue Architecture is the design of how a business attracts, wins, activates, and retains the right customers.';

// ── Build the slug ──────────────────────────────────────────────────
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .substring(0, 80);

// ── Publish to WordPress ────────────────────────────────────────────
async function publishPost() {
  console.log(`\n📝 Publishing to WordPress...`);
  console.log(`   Title: ${title}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Status: ${status}`);
  console.log(`   Content length: ${content.length} characters\n`);
  
  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        excerpt: excerptSource,
        slug: slug,
        status: status,
      }),
    });
    
    const data = await res.json();
    
    if (res.ok) {
      console.log(`✅ SUCCESS! Post ${status === 'publish' ? 'published' : 'saved as draft'}.`);
      console.log(`   Post ID: ${data.id}`);
      console.log(`   URL: ${data.link}`);
      console.log(`   Edit: https://www.richardnorwood.com/wp-admin/post.php?post=${data.id}&action=edit`);
    } else {
      console.error(`❌ FAILED (${res.status}):`, data.message || data);
    }
  } catch (e) {
    console.error('❌ Network error:', e.message);
  }
}

publishPost();
