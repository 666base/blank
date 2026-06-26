/**
 * Load Supabase keys from services/blank-server/.env into process.env for builds/dev.
 * Docker uses SUPABASE_URL / SUPABASE_ANON_KEY; the frontend bundle expects BLANK_* names.
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const envFile = path.join(root, 'services/blank-server/.env');

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const out = {};
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function loadBlankServerEnv() {
  const parsed = parseEnvFile(envFile);
  const port = parsed.BLANK_SERVER_PORT?.trim() || '3020';

  const supabaseUrl = (
    process.env.BLANK_SUPABASE_URL ||
    parsed.BLANK_SUPABASE_URL ||
    parsed.SUPABASE_URL ||
    ''
  ).trim();

  const supabaseAnonKey = (
    process.env.BLANK_SUPABASE_ANON_KEY ||
    parsed.BLANK_SUPABASE_ANON_KEY ||
    parsed.SUPABASE_ANON_KEY ||
    ''
  ).trim();

  const configProxy =
    process.env.BLANK_CONFIG_PROXY_URL?.trim() ||
    `http://127.0.0.1:${port}`;

  return {
    BLANK_SUPABASE_URL: supabaseUrl,
    BLANK_SUPABASE_ANON_KEY: supabaseAnonKey,
    BLANK_CONFIG_PROXY_URL: configProxy,
  };
}

/** Set BLANK_* env vars from services/blank-server/.env when not already set. */
function applyToProcessEnv() {
  const loaded = loadBlankServerEnv();
  for (const [key, value] of Object.entries(loaded)) {
    if (value && !process.env[key]) {
      process.env[key] = value;
    }
  }
  return loaded;
}

module.exports = { loadBlankServerEnv, applyToProcessEnv, envFile };
