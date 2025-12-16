import fs from 'fs';
import path from 'path';

const jarDir = './public/jar';
const versionFile = path.join(jarDir, 'version.json');

// Find JAR file in directory
const files = fs.readdirSync(jarDir);
const jarFile = files.find(f => f.endsWith('.jar'));

if (!jarFile) {
  console.error('❌ No JAR file found in public/jar/');
  process.exit(1);
}

// Extract version from filename (e.g., ashvehicle-4.4dev-8.8-SNAPSHOT.jar -> 4.4dev-8.8-SNAPSHOT)
const versionMatch = jarFile.match(/ashvehicle-(.+)\.jar/i);
const version = versionMatch ? versionMatch[1] : jarFile.replace('.jar', '');

// Write version.json
const data = {
  filename: jarFile,
  version: version,
  updated: new Date().toISOString()
};

fs.writeFileSync(versionFile, JSON.stringify(data, null, 2));
console.log(`✅ Updated version.json:`);
console.log(`   File: ${jarFile}`);
console.log(`   Version: ${version}`);
