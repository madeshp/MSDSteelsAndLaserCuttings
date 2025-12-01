<?php
/**
 * Email Configuration for MSD Steel Contact Form
 * 
 * Instructions:
 * 1. Update the email addresses below with your actual business email
 * 2. If using SMTP, update the SMTP settings and set 'use_smtp' to true
 * 3. Save this file and ensure it's in the same directory as send-email.php
 */

return [
    // === BASIC EMAIL SETTINGS ===
    'to_email' => 'info@msdsteel.com',           // Your business email (where quote requests are sent)
    'from_email' => 'noreply@msdsteel.com',     // From email (should be from your domain)
    'from_name' => 'MSD Steel Website',          // Display name for emails
    'subject_prefix' => '[MSD Steel] New Quote Request: ',
    
    // === SMTP SETTINGS (Optional - for better deliverability) ===
    'use_smtp' => false,                         // Set to true to use SMTP instead of PHP mail()
    'smtp_host' => 'smtp.gmail.com',             // SMTP server (Gmail, Outlook, etc.)
    'smtp_port' => 587,                          // SMTP port (587 for TLS, 465 for SSL)
    'smtp_username' => 'your-email@gmail.com',   // Your SMTP username
    'smtp_password' => 'your-app-password',      // Your SMTP password or app password
    'smtp_encryption' => 'tls',                  // 'tls' or 'ssl'
    
    // === COMMON SMTP PROVIDERS ===
    // Gmail:
    // - Host: smtp.gmail.com, Port: 587, Encryption: tls
    // - Use App Password (not regular password)
    // 
    // Outlook/Hotmail:
    // - Host: smtp-mail.outlook.com, Port: 587, Encryption: tls
    // 
    // Yahoo:
    // - Host: smtp.mail.yahoo.com, Port: 587, Encryption: tls
    //
    // For hosting providers, check their documentation for SMTP settings
    
    // === AUTO-REPLY SETTINGS ===
    'send_auto_reply' => true,                   // Send confirmation email to customers
    'auto_reply_subject' => 'Thank you for your quote request - MSD Steel',
    
    // === NOTIFICATION SETTINGS ===
    'admin_notifications' => true,              // Send notifications to admin
    'log_submissions' => true,                  // Log form submissions to file
    'log_file' => 'quote_requests.log',         // Log file name
    
    // === FORM SETTINGS ===
    'required_fields' => ['name', 'email', 'service', 'message'],
    'max_message_length' => 2000,
    'min_message_length' => 20,
    
    // === SECURITY SETTINGS ===
    'enable_rate_limiting' => false,            // Enable rate limiting (requires session)
    'max_submissions_per_hour' => 5,            // Max submissions per IP per hour
    'enable_honeypot' => false,                 // Enable honeypot spam protection
    
    // === CUSTOM MESSAGES ===
    'messages' => [
        'success' => 'Your quote request has been sent successfully! We\'ll get back to you within 24 hours.',
        'error' => 'Sorry, there was an error sending your request. Please try again or contact us directly.',
        'rate_limit' => 'Too many submissions. Please wait before submitting again.',
        'invalid_email' => 'Please enter a valid email address.',
        'missing_fields' => 'Please fill in all required fields.',
    ]
];
?>