import fs from 'fs';

const pbxprojPath = './ios/GoAndRest.xcodeproj/project.pbxproj';

// 🧩 Variable names used in Xcode project
const MARKETING_VERSION_VARIABLE_NAME = 'MARKETING_VERSION';
const CURRENT_PROJECT_VERSION_VARIABLE_NAME = 'CURRENT_PROJECT_VERSION';

const RADIX = 10;

let content = fs.readFileSync(pbxprojPath, 'utf8');

// 🔹 Increment MARKETING_VERSION (e.g. 1.0.0 → 1.0.1)
const marketingVersionRegexpString = `${MARKETING_VERSION_VARIABLE_NAME}\\s*=\\s*(\\d+)\\.(\\d+)\\.(\\d+);`;
const marketingRegex = new RegExp(marketingVersionRegexpString, 'g');

content = content.replace(marketingRegex, (_, major, minor, patch) => {
  const newPatch = parseInt(patch, RADIX) + 1;
  const newVersion = `${major}.${minor}.${newPatch}`;
  const marketingVersionUpdatedLog = `✅ ${MARKETING_VERSION_VARIABLE_NAME}: ${major}.${minor}.${patch} → ${newVersion}`;
  console.log(marketingVersionUpdatedLog);
  return `${MARKETING_VERSION_VARIABLE_NAME} = ${newVersion};`;
});

// 🔹 Increment CURRENT_PROJECT_VERSION (e.g. 122 → 123)
const buildVersionRegexpString = `${CURRENT_PROJECT_VERSION_VARIABLE_NAME}\\s*=\\s*(\\d+);`;
const buildRegex = new RegExp(buildVersionRegexpString, 'g');

content = content.replace(buildRegex, (_, build) => {
  const newBuild = parseInt(build, RADIX) + 1;
  const buildVersionUpdatedLog = `✅ ${CURRENT_PROJECT_VERSION_VARIABLE_NAME}: ${build} → ${newBuild}`;
  console.log(buildVersionUpdatedLog);
  return `${CURRENT_PROJECT_VERSION_VARIABLE_NAME} = ${newBuild};`;
});

fs.writeFileSync(pbxprojPath, content, 'utf8');

console.log('\n🎉 iOS version numbers updated successfully!');
