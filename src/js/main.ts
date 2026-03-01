/**
 * Main application entry point
 * Initializes the donation handler when DOM is ready
 */

import DonationHandler from './donation.js';

// Initialize when DOM is fully loaded
function init(): void {
    try {
        new DonationHandler();
        console.log('Save Da Kidz donation handler initialized');
    } catch (error) {
        console.error('Failed to initialize donation handler:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
