// Test configuration helper for Azure Static Web Apps compatibility
import { getEnvVar, getAppConfig, isAzureStaticWebApp, getConfigSource } from '../src/lib/config';

console.log('=== Configuration Test ===');
console.log('Environment detection:', isAzureStaticWebApp() ? 'Azure Static Web Apps' : 'Local Development');
console.log('Configuration source:', getConfigSource());

// Test getting a specific environment variable
const openaiKey = getEnvVar('VITE_OPENAI_API_KEY');
console.log('OpenAI API Key configured:', openaiKey ? 'Yes' : 'No');

// Test getting all configuration
const config = getAppConfig();
console.log('Total environment variables configured:', Object.keys(config).length);

// List configured variables (without showing actual values for security)
console.log('Configured variables:');
Object.keys(config).forEach(key => {
  console.log(`  - ${key}: ${config[key] ? 'SET' : 'NOT SET'}`);
});

export { };
