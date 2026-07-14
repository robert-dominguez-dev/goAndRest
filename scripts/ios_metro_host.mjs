#!/usr/bin/env node
// Najde iOS zařízení připojené k Macu a spustí na něm Debug build s Metro
// portem (RCT_METRO_PORT), takže se telefon k Metru připojí sám přes WiFi -
// bez ručního zadávání do "Debug server host & port for device".
//
// React Native při Debug device buildu sám zapíše LAN IP Macu do ip.txt v
// bundle (přes react-native-xcode.sh), port bere z RCT_METRO_PORT. USB slouží
// jen k instalaci, spojení s Metrem jede po WiFi (na iOS není USB reverse jako
// adb u Androidu).
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { networkInterfaces, tmpdir } from 'node:os';
import { join } from 'node:path';

const PORT = process.env.RCT_METRO_PORT || '8083';

// LAN IP jen pro výpis (samotnou IP si RN do ip.txt zapíše sám, přes en0).
const getLanIp = () => {
  const candidates = [];
  for (const [name, addrs] of Object.entries(networkInterfaces())) {
    for (const addr of addrs || []) {
      if (addr.family === 'IPv4' && !addr.internal) {
        candidates.push({ name, address: addr.address });
      }
    }
  }
  const preferred = candidates.find(c => c.name === 'en0') || candidates[0];
  return preferred?.address ?? null;
};

// Najdi přes devicectl aktivně připojené iOS zařízení a vrať jeho UDID + název.
const findConnectedDevice = () => {
  try {
    const outFile = join(mkdtempSync(join(tmpdir(), 'devicectl-')), 'd.json');
    const result = spawnSync(
      'xcrun',
      ['devicectl', 'list', 'devices', '--json-output', outFile],
      { encoding: 'utf8' },
    );
    if (result.status !== 0) {
      return null;
    }

    const devices = JSON.parse(readFileSync(outFile, 'utf8'))?.result?.devices;
    const connectediOSDevices = (devices ?? []).filter(
      device =>
        device?.hardwareProperties?.platform === 'iOS' &&
        device?.connectionProperties?.tunnelState !== 'unavailable',
    );

    const chosen =
      connectediOSDevices.find(
        device => device?.connectionProperties?.tunnelState === 'connected',
      ) ?? connectediOSDevices[0];

    if (!chosen?.hardwareProperties?.udid) {
      return null;
    }

    return {
      udid: chosen.hardwareProperties.udid,
      name: chosen.deviceProperties?.name ?? 'iOS zařízení',
    };
  } catch {
    return null;
  }
};

const ip = getLanIp();
const device = findConnectedDevice();

console.log('');
console.log('📱  iOS zařízení → Metro');
console.log('────────────────────────────────────────────');
console.log(`  Metro port:   ${PORT}`);
console.log(`  Mac LAN IP:   ${ip ?? '(nenalezena)'}`);
console.log(`  Zařízení:     ${device ? device.name : '(hledám přes --device)'}`);
console.log('────────────────────────────────────────────');
console.log('');

if (!ip) {
  console.error('❌ Nenašel jsem LAN IP. Jsi připojen k WiFi?');
  process.exit(1);
}

const runIosArgs = ['react-native', 'run-ios', '--port', PORT];
if (device?.udid) {
  runIosArgs.push('--udid', device.udid);
} else {
  console.log(
    'ℹ️  Konkrétní zařízení jsem přes devicectl nenašel, zkouším --device.',
  );
  runIosArgs.push('--device');
}

const run = spawnSync('npx', runIosArgs, {
  stdio: 'inherit',
  env: { ...process.env, RCT_METRO_PORT: PORT },
});
process.exit(run.status ?? 1);
