// Markdown Viewer Pro - Main Script

// Import AppController to orchestrate the application
import { appController } from './src/js/core/AppController.js';

// Wait for DOM to be ready
window.addEventListener('DOMContentLoaded', () => {
  appController.init();
});
