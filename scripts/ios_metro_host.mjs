#!/usr/bin/env node
// Zjistí aktuální LAN IP Macu a vypíše adresu, kterou zadat do Dev Settings
// na fyzickém iPhonu ("Debug server host & port for device"), aby se
// připojil k Metru. iOS zařízení se k packageru připojuje přes WiFi,
// nikoli přes USB reverse (to je pouze Android/adb).
import { networkInterfaces } from 'node:os';

const PORT = process.env.RCT_METRO_PORT || '8083';

const nets = networkInterfaces();
const candidates = [];
for (const [name, addrs] of Object.entries(nets)) {
  for (const addr of addrs || []) {
    if (addr.family === 'IPv4' && !addr.internal) {
      candidates.push({ name, address: addr.address });
    }
  }
}

// Preferuj en0 (obvykle WiFi na Macu), jinak první nalezené
const preferred =
  candidates.find(c => c.name === 'en0') || candidates[0];

if (!preferred) {
  console.error('❌ Nenašel jsem žádnou LAN IP adresu. Jsi připojen k síti?');
  process.exit(1);
}

const host = `${preferred.address}:${PORT}`;

console.log('');
console.log('📱  Připojení iPhonu k Metru');
console.log('────────────────────────────────────────────');
console.log(`  Metro port:        ${PORT}`);
console.log(`  Adresa serveru:    ${host}   (${preferred.name})`);
console.log('────────────────────────────────────────────');
console.log('');
console.log('Na iPhonu (musí být na STEJNÉ WiFi jako Mac):');
console.log('  1. Zatřes telefonem → otevře se Dev Menu');
console.log('  2. Settings → "Debug server host & port for device"');
console.log(`  3. Zadej:  ${host}`);
console.log('  4. Zpět a "Reload" (nebo znovu zatřes → Reload)');
console.log('');
console.log('Metro spusť přes:  npm start');
console.log('');
