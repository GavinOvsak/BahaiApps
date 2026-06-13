#!/usr/bin/env node
// Processes a BAHAIAPPS_JSON block from an approved GitHub issue and updates apps.json

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APPS_PATH = join(__dirname, '../public/data/apps.json');

const issueBody = process.env.ISSUE_BODY;
if (!issueBody) {
  console.error('ISSUE_BODY environment variable is required');
  process.exit(1);
}

// Extract JSON block from issue body
const match = issueBody.match(/<!-- BAHAIAPPS_JSON\n([\s\S]*?)\n-->/);
if (!match) {
  console.error('No BAHAIAPPS_JSON block found in issue body');
  process.exit(1);
}

let change;
try {
  change = JSON.parse(match[1]);
} catch (err) {
  console.error('Failed to parse BAHAIAPPS_JSON:', err.message);
  process.exit(1);
}

const apps = JSON.parse(readFileSync(APPS_PATH, 'utf-8'));

if (change.action === 'add') {
  const newApp = {
    ...change.data,
    dateAdded: new Date().toISOString().slice(0, 10),
  };
  apps.push(newApp);
  apps.sort((a, b) => a.name.localeCompare(b.name));
  console.log(`Added: ${newApp.name}`);

} else if (change.action === 'edit') {
  const idx = apps.findIndex((a) => a.url === change.appUrl);
  if (idx === -1) {
    console.error(`App not found with URL: ${change.appUrl}`);
    process.exit(1);
  }
  apps[idx] = { ...apps[idx], ...change.data };
  console.log(`Edited: ${apps[idx].name}`);

} else if (change.action === 'delete') {
  const idx = apps.findIndex((a) => a.url === change.appUrl);
  if (idx === -1) {
    console.error(`App not found with URL: ${change.appUrl}`);
    process.exit(1);
  }
  console.log(`Deleted: ${apps[idx].name}`);
  apps.splice(idx, 1);

} else {
  console.error(`Unknown action: ${change.action}`);
  process.exit(1);
}

writeFileSync(APPS_PATH, JSON.stringify(apps, null, 2) + '\n');
console.log('apps.json updated successfully');
