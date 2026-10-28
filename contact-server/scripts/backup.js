/**
 * Daily MongoDB backup script.
 * Run via cron: 0 2 * * * node /path/to/contact-server/scripts/backup.js
 *
 * Requires MONGOOSE_URI (or MONGODB_URI) in the environment.
 * Backups are written to ./backups/<timestamp>.archive and pruned
 * to keep the last 7 days.
 */
'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const uri = process.env.MONGODB_URI || process.env.MONGOOSE_URI;
if (!uri) {
  console.error('❌ No MongoDB URI set (MONGODB_URI). Aborting backup.');
  process.exit(1);
}

// Parse host and db from the URI (supports mongodb:// and mongodb+srv://)
let host, dbName;
try {
  const url = new URL(uri.replace('mongodb+srv://', 'mongodb://'));
  host = url.hostname;
  dbName = url.pathname.replace('/', '') || 'portfolio';
} catch (e) {
  console.error('❌ Could not parse MongoDB URI:', e.message);
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'backups');
fs.mkdirSync(outDir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const outFile = path.join(outDir, `${dbName}-${stamp}.archive`);

console.log(`📦 Backing up ${dbName} on ${host} → ${outFile}`);

try {
  execSync(`mongodump --host "${host}" --db "${dbName}" --archive="${outFile}" --gzip`, {
    stdio: 'inherit',
    timeout: 300_000,
  });
  console.log('✅ Backup complete:', outFile);
} catch (e) {
  console.error('❌ Backup failed:', e.message);
  process.exit(1);
}

// Prune backups older than 7 days
const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
for (const f of fs.readdirSync(outDir)) {
  const full = path.join(outDir, f);
  const stat = fs.statSync(full);
  if (stat.mtimeMs < cutoff) {
    fs.unlinkSync(full);
    console.log('🗑️  Pruned old backup:', f);
  }
}