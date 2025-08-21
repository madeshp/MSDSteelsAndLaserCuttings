<?php
// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type to JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Load configuration
if (file_exists('email-config.php')) {
    $config = require 'email-config.php';
} else {
    // Fallback configuration - Update these with your email settings
    $config = [
        'to_email' => 'info@msdsteel.com', // Your business email
        'from_email' => 'noreply@msdsteel.com', // From email (should be from your domain)
        'from_name' => 'MSD Steel Website',
        'subject_prefix' => '[MSD Steel] New Quote Request: ',
        'smtp_host' => 'smtp.gmail.com', // Update with your SMTP server
        'smtp_port' => 587,
        'smtp_username' => 'your-email@gmail.com', // Update with your email
        'smtp_password' => 'your-app-password', // Update with your app password
        'use_smtp' => false, // Set to true to use SMTP, false to use PHP mail()
        'send_auto_reply' => true,
        'log_submissions' => true,
        'log_file' => 'quote_requests.log',
        'messages' => [
            'success' => 'Your quote request has been sent successfully! We\'ll get back to you within 24 hours.',
            'error' => 'Sorry, there was an error sending your request. Please try again or contact us directly.',
        ]
    ];
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit;
}

// Required fields
$required_fields = ['name', 'email', 'service', 'message'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Missing required fields: ' . implode(', ', $missing_fields)
    ]);
    exit;
}

// Sanitize input data
$data = [
    'name' => filter_var(trim($input['name']), FILTER_SANITIZE_STRING),
    'email' => filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL),
    'phone' => isset($input['phone']) ? filter_var(trim($input['phone']), FILTER_SANITIZE_STRING) : '',
    'service' => filter_var(trim($input['service']), FILTER_SANITIZE_STRING),
    'budget' => isset($input['budget']) ? filter_var(trim($input['budget']), FILTER_SANITIZE_STRING) : 'Not specified',
    'message' => filter_var(trim($input['message']), FILTER_SANITIZE_STRING),
    'timestamp' => date('Y-m-d H:i:s')
];

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Service name mapping
$service_names = [
    'laser-cutting' => 'Precision Laser Cutting',
    'decorative' => 'Decorative Panels',
    'custom' => 'Custom Parts',
    'architectural' => 'Architectural Elements'
];

$service_display = isset($service_names[$data['service']]) ? 
    $service_names[$data['service']] : $data['service'];

// Budget range mapping
$budget_ranges = [
    'under-1000' => 'Under $1,000',
    '1000-5000' => '$1,000 - $5,000',
    '5000-10000' => '$5,000 - $10,000',
    '10000-25000' => '$10,000 - $25,000',
    'over-25000' => 'Over $25,000'
];

$budget_display = isset($budget_ranges[$data['budget']]) ? 
    $budget_ranges[$data['budget']] : $data['budget'];

// Create email content
$subject = $config['subject_prefix'] . $service_display;

// HTML email template
$html_message = "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>New Quote Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f8fafc; padding: 30px 20px; }
        .quote-details { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .detail-row { display: flex; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; }
        .detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .detail-label { font-weight: bold; color: #475569; min-width: 120px; }
        .detail-value { color: #1e293b; flex: 1; }
        .message-section { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .message-section h3 { color: #2563eb; margin-top: 0; }
        .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
        .priority { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        .priority strong { color: #92400e; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🔥 New Quote Request</h1>
            <p>MSD Steel and Laser Cuttings</p>
        </div>
        
        <div class='content'>
            <div class='priority'>
                <strong>⚡ Action Required:</strong> New customer quote request received on " . $data['timestamp'] . "
            </div>
            
            <div class='quote-details'>
                <h3 style='color: #2563eb; margin-top: 0;'>Customer Information</h3>
                <div class='detail-row'>
                    <div class='detail-label'>Name:</div>
                    <div class='detail-value'>" . htmlspecialchars($data['name']) . "</div>
                </div>
                <div class='detail-row'>
                    <div class='detail-label'>Email:</div>
                    <div class='detail-value'><a href='mailto:" . htmlspecialchars($data['email']) . "'>" . htmlspecialchars($data['email']) . "</a></div>
                </div>";

if (!empty($data['phone'])) {
    $html_message .= "
                <div class='detail-row'>
                    <div class='detail-label'>Phone:</div>
                    <div class='detail-value'><a href='tel:" . htmlspecialchars($data['phone']) . "'>" . htmlspecialchars($data['phone']) . "</a></div>
                </div>";
}

$html_message .= "
                <div class='detail-row'>
                    <div class='detail-label'>Service:</div>
                    <div class='detail-value'>" . htmlspecialchars($service_display) . "</div>
                </div>
                <div class='detail-row'>
                    <div class='detail-label'>Budget:</div>
                    <div class='detail-value'>" . htmlspecialchars($budget_display) . "</div>
                </div>
                <div class='detail-row'>
                    <div class='detail-label'>Timestamp:</div>
                    <div class='detail-value'>" . $data['timestamp'] . "</div>
                </div>
            </div>
            
            <div class='message-section'>
                <h3>Project Details</h3>
                <p>" . nl2br(htmlspecialchars($data['message'])) . "</p>
            </div>
        </div>
        
        <div class='footer'>
            <p>This email was sent from the MSD Steel website contact form.</p>
            <p>Please respond within 24 hours for best customer service.</p>
        </div>
    </div>
</body>
</html>";

// Plain text version for email clients that don't support HTML
$text_message = "
NEW QUOTE REQUEST - MSD Steel and Laser Cuttings
==============================================

Customer Information:
- Name: " . $data['name'] . "
- Email: " . $data['email'] . "
- Phone: " . ($data['phone'] ?: 'Not provided') . "
- Service: " . $service_display . "
- Budget: " . $budget_display . "
- Timestamp: " . $data['timestamp'] . "

Project Details:
" . $data['message'] . "

---
This email was sent from the MSD Steel website contact form.
Please respond within 24 hours for best customer service.
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
    'Reply-To: ' . $data['email'],
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1',
    'Importance: High'
];

$success = false;
$error_message = '';

if ($config['use_smtp']) {
    // Use SMTP (requires PHPMailer or similar library)
    // For this example, we'll use the basic mail() function
    // In production, consider using PHPMailer for better SMTP support
    $success = mail($config['to_email'], $subject, $html_message, implode("\r\n", $headers));
    if (!$success) {
        $error_message = 'SMTP sending failed';
    }
} else {
    // Use PHP's built-in mail() function
    $success = mail($config['to_email'], $subject, $html_message, implode("\r\n", $headers));
    if (!$success) {
        $error_message = 'Mail sending failed';
    }
}

// Send auto-reply to customer
if ($success && !empty($config['send_auto_reply'])) {
    $customer_subject = "Thank you for your quote request - MSD Steel";
    $customer_message = "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Quote Request Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px 20px; text-align: center; }
            .content { background: #f8fafc; padding: 30px 20px; }
            .message { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
            .highlight { background: #dbeafe; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>✅ Quote Request Received</h1>
                <p>MSD Steel and Laser Cuttings</p>
            </div>
            
            <div class='content'>
                <div class='message'>
                    <h3>Thank you, " . htmlspecialchars($data['name']) . "!</h3>
                    <p>We've received your quote request for <strong>" . htmlspecialchars($service_display) . "</strong> and will get back to you within 24 hours.</p>
                    
                    <div class='highlight'>
                        <strong>What happens next?</strong><br>
                        • Our team will review your project details<br>
                        • We'll prepare a detailed quote based on your requirements<br>
                        • You'll receive a personalized response within 24 hours<br>
                        • We'll schedule a consultation if needed
                    </div>
                    
                    <p>If you have any urgent questions, please don't hesitate to contact us directly:</p>
                    <p><strong>Phone:</strong> (555) 123-4567<br>
                    <strong>Email:</strong> info@msdsteel.com</p>
                </div>
            </div>
            
            <div class='footer'>
                <p>Thank you for choosing MSD Steel and Laser Cuttings</p>
                <p>Precision. Quality. Excellence.</p>
            </div>
        </div>
    </body>
    </html>";
    
    $customer_headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    mail($data['email'], $customer_subject, $customer_message, implode("\r\n", $customer_headers));
}

// Log the submission (optional)
if (!empty($config['log_submissions'])) {
    $log_file = $config['log_file'] ?? 'quote_requests.log';
    $log_entry = date('Y-m-d H:i:s') . " - Quote request from: " . $data['name'] . " (" . $data['email'] . ") - Service: " . $service_display . "\n";
    @file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}

// Return response
if ($success) {
    echo json_encode([
        'success' => true,
        'message' => $config['messages']['success'] ?? 'Your quote request has been sent successfully! We\'ll get back to you within 24 hours.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $config['messages']['error'] ?? 'Sorry, there was an error sending your request. Please try again or contact us directly.'
    ]);
    
    // Log error
    error_log("Email sending failed: " . $error_message . " - Data: " . json_encode($data));
}
?>