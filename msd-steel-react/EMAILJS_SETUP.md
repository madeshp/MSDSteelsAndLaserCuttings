# EmailJS Setup Guide

This guide will help you set up EmailJS to handle contact form submissions in your React application.

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service

1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_abc123`)

### For Gmail:
- Enable 2-factor authentication
- Generate an App Password
- Use your Gmail address and the App Password

## 3. Create Email Template

1. Click "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

### Template Subject:
```
[MSD Steel] New Quote Request: {{service}}
```

### Template Body (HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Quote Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🔥 New Quote Request</h1>
            <p style="margin: 10px 0 0 0;">MSD Steel and Laser Cuttings</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px 20px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <h2 style="color: #2563eb; margin-top: 0;">Customer Information</h2>
                
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; min-width: 120px; display: inline-block;">Name:</strong>
                    <span style="color: #1e293b;">{{from_name}}</span>
                </div>
                
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; min-width: 120px; display: inline-block;">Email:</strong>
                    <span style="color: #1e293b;">{{from_email}}</span>
                </div>
                
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; min-width: 120px; display: inline-block;">Phone:</strong>
                    <span style="color: #1e293b;">{{phone}}</span>
                </div>
                
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; min-width: 120px; display: inline-block;">Service:</strong>
                    <span style="color: #1e293b;">{{service}}</span>
                </div>
                
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569; min-width: 120px; display: inline-block;">Budget:</strong>
                    <span style="color: #1e293b;">{{budget}}</span>
                </div>
                
                <div style="margin-bottom: 0; padding-bottom: 0;">
                    <strong style="color: #475569; min-width: 120px; display: inline-block;">Submitted:</strong>
                    <span style="color: #1e293b;">{{timestamp}}</span>
                </div>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #2563eb; margin-top: 0;">Project Details</h3>
                <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
                    {{message}}
                </div>
            </div>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <strong style="color: #92400e;">⚡ Action Required:</strong>
                <p style="margin: 5px 0 0 0; color: #92400e;">
                    Please respond to this quote request within 24 hours. Reply directly to {{from_email}}.
                </p>
            </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 14px;">
            <p style="margin: 0;">This email was sent from the MSD Steel website contact form.</p>
        </div>
    </div>
</body>
</html>
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## 4. Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `user_abcdef123456`)

## 5. Update React Application

Edit `/src/services/emailService.js` and replace the configuration:

```javascript
const EMAIL_CONFIG = {
  SERVICE_ID: 'service_abc123', // Your actual service ID
  TEMPLATE_ID: 'template_xyz789', // Your actual template ID  
  PUBLIC_KEY: 'user_abcdef123456' // Your actual public key
};
```

## 6. Test the Configuration

1. Start your React development server: `npm run dev`
2. Fill out and submit the contact form
3. Check your email for the quote request
4. Check the browser console for any errors

## 7. Template Variables

The following variables are sent to your email template:

- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Customer's phone (or "Not provided")
- `{{service}}` - Selected service (human-readable)
- `{{budget}}` - Selected budget range (or "Not specified")
- `{{message}}` - Project details message
- `{{to_name}}` - Always "MSD Steel Team"
- `{{reply_to}}` - Customer's email for replies
- `{{timestamp}}` - When the form was submitted

## 8. Auto-Reply Setup (Optional)

To send automatic replies to customers:

1. Create a second email template for customer auto-replies
2. Modify the `emailService.js` to send two emails:
   - One to your business email (main template)
   - One to the customer (auto-reply template)

## 9. Troubleshooting

### Common Issues:

1. **"User ID is required"**: Make sure you've set the correct PUBLIC_KEY
2. **"Service is not found"**: Check your SERVICE_ID
3. **"Template is not found"**: Check your TEMPLATE_ID
4. **Emails not being sent**: Check your email service configuration

### Debug Mode:

The service automatically uses mock responses when not configured. Check the browser console for debug messages.

## 10. Production Considerations

1. **Rate Limiting**: EmailJS has monthly limits on free accounts
2. **Security**: Your public key is visible in the client code (this is normal for EmailJS)
3. **Backup**: Consider adding a fallback contact method
4. **Monitoring**: Set up email notifications for failed submissions

## 11. Upgrade Options

For high-volume applications, consider:
- EmailJS paid plans for higher limits
- Server-side email solutions (Node.js, PHP)
- Third-party services (SendGrid, Mailgun)

---

**Need Help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/