const fs = require('fs');
const path = require('path');

// Function to merge home.json into common.json
function mergeTranslations(language) {
  console.log(`Processing ${language} translations...`);
  
  // Read the files
  const commonPath = path.join(__dirname, 'frontend', 'public', 'locales', language, 'common.json');
  const homePath = path.join(__dirname, 'frontend', 'public', 'locales', language, 'home.json');
  
  let common;
  let home;
  
  try {
    common = JSON.parse(fs.readFileSync(commonPath, 'utf8'));
    home = JSON.parse(fs.readFileSync(homePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading files for ${language}:`, error);
    return;
  }
  
  // Check if common already has a home key
  if (!common.home) {
    common.home = {};
  }
  
  // Merge all keys from home.json into common.json under the home key
  for (const key in home) {
    // Skip keys that are already in common.home to avoid overwriting
    if (common.home[key] === undefined) {
      common.home[key] = home[key];
    } else {
      console.log(`Key '${key}' already exists in common.home for ${language}, merging...`);
      // If the key exists and is an object, merge recursively
      if (typeof home[key] === 'object' && home[key] !== null && 
          typeof common.home[key] === 'object' && common.home[key] !== null) {
        common.home[key] = { ...common.home[key], ...home[key] };
      }
      // Otherwise, keep the existing value in common.home
    }
  }
  
  // Write the merged content back to common.json
  try {
    fs.writeFileSync(commonPath, JSON.stringify(common, null, 2), 'utf8');
    console.log(`Successfully merged home.json into common.json for ${language}`);
  } catch (error) {
    console.error(`Error writing merged file for ${language}:`, error);
  }
}

// Process both languages
mergeTranslations('ru');
mergeTranslations('kz');

console.log('Translation merging complete!');