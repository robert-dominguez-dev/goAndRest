import fs from 'fs';

const gradlePath = './android/app/build.gradle';

// 🧩 Variable names
const VERSION_CODE_VARIABLE = 'versionCode';
const VERSION_NAME_VARIABLE = 'versionName';

const RADIX = 10;

let content = fs.readFileSync(gradlePath, 'utf8');

// 🔹 Increment versionName patch (1.0.0 → 1.0.1)
const regexpString = `${VERSION_NAME_VARIABLE}\\s+"(\\d+)\\.(\\d+)\\.(\\d+)"`;
const versionNameRegex = new RegExp(regexpString);

content = content.replace(versionNameRegex, (_, major, minor, patch) => {
  const newPatch = parseInt(patch, RADIX) + 1;
  const newVersion = `${major}.${minor}.${newPatch}`;
  const versionNameUpdatedLog = `✅ ${VERSION_NAME_VARIABLE}: ${major}.${minor}.${patch} → ${newVersion}`;
  console.log(versionNameUpdatedLog);
  return `${VERSION_NAME_VARIABLE} "${newVersion}"`;
});

// 🔹 Increment versionCode (122 → 123)
const versionCodeRegex = new RegExp(`${VERSION_CODE_VARIABLE}\\s+(\\d+)`);
content = content.replace(versionCodeRegex, (_, code) => {
  const newCode = parseInt(code, RADIX) + 1;
  console.log(`✅ ${VERSION_CODE_VARIABLE}: ${code} → ${newCode}`);
  return `${VERSION_CODE_VARIABLE} ${newCode}`;
});

fs.writeFileSync(gradlePath, content, 'utf8');

console.log('\n🎉 Android version numbers updated successfully!');
