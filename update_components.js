const fs = require('fs');
const path = require('path');

// List of components to update
const componentsToUpdate = [
  'frontend/src/widgets/homes/home-6/About.jsx',
  'frontend/src/widgets/homes/home-6/Banner.jsx',
  'frontend/src/widgets/homes/home-6/Bikes.jsx',
  'frontend/src/widgets/homes/home-6/Cars.jsx',
  'frontend/src/widgets/homes/home-6/Cooperation.jsx',
  'frontend/src/widgets/homes/home-6/Feature.jsx',
  'frontend/src/widgets/homes/home-6/Features.jsx',
  'frontend/src/widgets/homes/home-6/Features3.jsx',
  'frontend/src/widgets/homes/home-6/Hero.jsx',
  'frontend/src/widgets/homes/home-6/MapSection.jsx',
  'frontend/src/widgets/homes/home-6/Pricing.jsx',
  'frontend/src/widgets/homes/home-6/Promo.jsx',
  'frontend/src/widgets/homes/home-6/Testimonials.jsx',
  'frontend/src/widgets/homes/home-6/Testimonials2.jsx'
];

// Function to update a component
function updateComponent(filePath) {
  console.log(`Updating ${filePath}...`);
  
  try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace useTranslation(['home', 'common']) with useTranslation('common')
    content = content.replace(/useTranslation\(\['home', 'common'\]\)/g, "useTranslation('common')");
    
    // Replace t('home.xxx.yyy') with t('home.xxx.yyy')
    // We don't need to change these references because the translations are now under the 'home' key in common.json
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
  }
}

// Update all components
componentsToUpdate.forEach(updateComponent);

console.log('Component updates complete!');