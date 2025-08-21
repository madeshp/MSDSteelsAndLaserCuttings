// Fallback email functionality for local development
// This simulates the email sending when PHP server is not available

function createEmailFallback() {
    // Check if we're running locally (file:// protocol)
    const isLocal = window.location.protocol === 'file:';
    
    if (isLocal) {
        console.log('🔧 Running in local mode - email simulation enabled');
        
        // Override the form submission handler for local development
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
            if (url.includes('send-email.php')) {
                console.log('📧 Simulating email send with data:', JSON.parse(options.body));
                
                // Simulate network delay
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            json: () => Promise.resolve({
                                success: true,
                                message: '✅ Email simulation successful! In production, this would send a real email to your business address.'
                            })
                        });
                    }, 2000);
                });
            }
            return originalFetch.apply(this, arguments);
        };
        
        // Show development notice
        showDevelopmentNotice();
    }
}

function showDevelopmentNotice() {
    // Create development notice
    const notice = document.createElement('div');
    notice.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        padding: 12px;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        animation: slideDown 0.5s ease;
    `;
    
    notice.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
            <span>🔧</span>
            <span>DEVELOPMENT MODE: Email functionality is simulated. Set up a web server for real email sending.</span>
            <button onclick="this.parentElement.parentElement.style.display='none'" 
                    style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 4px 8px; border-radius: 4px; cursor: pointer; margin-left: 10px;">
                ×
            </button>
        </div>
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#dev-notice-styles')) {
        const style = document.createElement('style');
        style.id = 'dev-notice-styles';
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateY(-100%); }
                to { transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.insertBefore(notice, document.body.firstChild);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (notice.parentNode) {
            notice.style.transform = 'translateY(-100%)';
            setTimeout(() => notice.remove(), 500);
        }
    }, 10000);
}

// Initialize fallback when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createEmailFallback);
} else {
    createEmailFallback();
}