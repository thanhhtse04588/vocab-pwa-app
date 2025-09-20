// Generate build info with current timestamp
const fs = require('fs');
const path = require('path');

const buildTime = new Date().toISOString();
const buildInfo = {
  buildTime,
  version: '1.0.0',
  timestamp: Date.now(),
};

// Write to a temporary file that can be imported
const buildInfoPath = path.join(__dirname, '..', 'src', 'build-info.json');
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));

console.log('Build info generated:', buildTime);
