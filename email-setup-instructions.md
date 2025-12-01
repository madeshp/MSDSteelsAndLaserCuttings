# Email Setup Instructions for MSD Steel Contact Form

## Overview
The contact form now includes full email functionality that will send professional email notifications when customers submit quote requests.

## Files Added/Modified
- `send-email.php` - Backend email handler
- `main.js` - Updated form submission logic
- Form in `index.html` - Already configured

## Setup Instructions

### 1. PHP Configuration
Make sure your web server has PHP enabled with the following:
- PHP 7.0 or higher
- `mail()` function enabled
- JSON extension enabled

### 2. Email Configuration
Edit the configuration section in `send-email.php` (lines 12-22):

```php
$config = [
    'to_email' => 'info@msdsteel.com', // Your business email
    'from_email' => 'noreply@msdsteel.com', // From email (should be from your domain)
    'from_name' => 'MSD Steel Website',
    'subject_prefix' => '[MSD Steel] New Quote Request: ',
    'smtp_host' => 'smtp.gmail.com', // Update with your SMTP server
    'smtp_port' => 587,
    'smtp_username' => 'your-email@gmail.com', // Update with your email
    'smtp_password' => 'your-app-password', // Update with your app password
    'use_smtp' => false // Set to true to use SMTP, false to use PHP mail()
];
```

### 3. Basic Setup (Using PHP mail())
For basic hosting with PHP mail() function:
1. Update `to_email` to your business email
2. Update `from_email` to an email from your domain (e.g., noreply@yourdomain.com)
3. Keep `use_smtp` as `false`

### 4. Advanced Setup (Using SMTP)
For better deliverability using SMTP (recommended):
1. Set `use_smtp` to `true`
2. Configure SMTP settings for your email provider
3. For Gmail:
   - Enable 2-factor authentication
   - Generate an app password
   - Use `smtp.gmail.com` and port `587`

### 5. File Permissions
Ensure the following permissions:
- `send-email.php` should be readable by the web server
- Create a `logs` directory (optional) for logging quote requests

### 6. Testing
1. Fill out the contact form on your website
2. Check if you receive the email notification
3. Verify the customer receives an auto-reply
4. Check browser console for any JavaScript errors

## Email Features

### What Customers Experience:
1. Fill out the "Get Your Free Quote" form
2. Submit the form with loading animation
3. Receive immediate success confirmation
4. Get an auto-reply email confirming their request

### What You Receive:
1. Professional HTML email with all customer details
2. Formatted quote request information
3. Customer contact information with clickable links
4. Project details and budget information
5. Timestamp of the request

### Email Template Features:
- Professional HTML design matching your brand
- Mobile-responsive layout
- Customer information clearly formatted
- Auto-reply confirmation to customers
- Priority flagging for urgent requests

## Troubleshooting

### Common Issues:
1. **Emails not sending**: Check PHP mail configuration or SMTP settings
2. **Emails going to spam**: Use SMTP with proper domain authentication
3. **Form not submitting**: Check browser console for JavaScript errors
4. **Server errors**: Check PHP error logs

### For Gmail SMTP:
1. Enable "Less secure app access" or use App Passwords
2. Verify SMTP settings are correct
3. Check Gmail's sending limits

### For Shared Hosting:
1. Contact your hosting provider about mail() function
2. Ask about SMTP relay services
3. Consider using services like SendGrid or Mailgun

## Security Considerations
- Input validation and sanitization included
- CSRF protection recommended for production
- Rate limiting recommended to prevent spam
- Consider adding reCAPTCHA for additional protection

## Customization
You can customize:
- Email templates (HTML and text versions)
- Success/error messages
- Form validation rules
- Auto-reply content
- Email styling and branding

## Support
If you need help with setup or customization, please check:
1. Your hosting provider's PHP/email documentation
2. PHP mail() function documentation
3. Your email provider's SMTP settings
4. Server error logs for debugging