<?php
/**
 * Email Test Script for MSD Steel Contact Form
 * 
 * This script helps you test if your email configuration is working correctly.
 * Run this by accessing it in your browser: http://yoursite.com/test-email.php
 */

// Include the email configuration
if (file_exists('email-config.php')) {
    $config = require 'email-config.php';
} else {
    die('Error: email-config.php not found. Please create the configuration file first.');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Test - MSD Steel</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .config-item { background: #f8f9fa; padding: 10px; margin: 5px 0; border-left: 4px solid #007bff; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .test-form { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>📧 Email Configuration Test - MSD Steel</h1>
    
    <div class="info">
        <strong>Instructions:</strong> This page helps you test your email configuration. 
        Make sure to update your email settings in <code>email-config.php</code> before testing.
    </div>

    <h2>Current Configuration</h2>
    <div class="config-item"><strong>To Email:</strong> <?php echo htmlspecialchars($config['to_email']); ?></div>
    <div class="config-item"><strong>From Email:</strong> <?php echo htmlspecialchars($config['from_email']); ?></div>
    <div class="config-item"><strong>From Name:</strong> <?php echo htmlspecialchars($config['from_name']); ?></div>
    <div class="config-item"><strong>Use SMTP:</strong> <?php echo $config['use_smtp'] ? 'Yes' : 'No (using PHP mail())'; ?></div>
    <?php if ($config['use_smtp']): ?>
    <div class="config-item"><strong>SMTP Host:</strong> <?php echo htmlspecialchars($config['smtp_host']); ?></div>
    <div class="config-item"><strong>SMTP Port:</strong> <?php echo htmlspecialchars($config['smtp_port']); ?></div>
    <?php endif; ?>

    <h2>PHP Configuration Check</h2>
    <?php
    // Check if mail function exists
    if (function_exists('mail')) {
        echo '<div class="success">✓ PHP mail() function is available</div>';
    } else {
        echo '<div class="error">✗ PHP mail() function is not available</div>';
    }

    // Check if JSON extension is loaded
    if (extension_loaded('json')) {
        echo '<div class="success">✓ JSON extension is loaded</div>';
    } else {
        echo '<div class="error">✗ JSON extension is not loaded</div>';
    }

    // Check PHP version
    if (version_compare(PHP_VERSION, '7.0.0') >= 0) {
        echo '<div class="success">✓ PHP version: ' . PHP_VERSION . ' (compatible)</div>';
    } else {
        echo '<div class="error">✗ PHP version: ' . PHP_VERSION . ' (upgrade recommended)</div>';
    }
    ?>

    <h2>Send Test Email</h2>
    <div class="test-form">
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['test_email'])) {
            $test_email = filter_var($_POST['test_email'], FILTER_SANITIZE_EMAIL);
            
            if (filter_var($test_email, FILTER_VALIDATE_EMAIL)) {
                $subject = '[TEST] MSD Steel Email Configuration Test';
                $message = '
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Test Email</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; text-align: center;">
                            <h1>🧪 Email Test Successful!</h1>
                            <p>MSD Steel Contact Form</p>
                        </div>
                        <div style="background: #f8fafc; padding: 20px;">
                            <h3>Congratulations!</h3>
                            <p>Your email configuration is working correctly. The contact form should now be able to send emails successfully.</p>
                            <p><strong>Test Details:</strong></p>
                            <ul>
                                <li>Sent at: ' . date('Y-m-d H:i:s') . '</li>
                                <li>From: ' . htmlspecialchars($config['from_email']) . '</li>
                                <li>Configuration: ' . ($config['use_smtp'] ? 'SMTP' : 'PHP mail()') . '</li>
                            </ul>
                        </div>
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 14px;">
                            <p>This is a test email from MSD Steel website configuration.</p>
                        </div>
                    </div>
                </body>
                </html>';
                
                $headers = [
                    'MIME-Version: 1.0',
                    'Content-Type: text/html; charset=UTF-8',
                    'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
                    'X-Mailer: PHP/' . phpversion()
                ];
                
                if (mail($test_email, $subject, $message, implode("\r\n", $headers))) {
                    echo '<div class="success">✅ <strong>Test email sent successfully!</strong> Check your inbox at ' . htmlspecialchars($test_email) . '</div>';
                } else {
                    echo '<div class="error">❌ <strong>Failed to send test email.</strong> Please check your email configuration and server settings.</div>';
                }
            } else {
                echo '<div class="error">❌ Please enter a valid email address.</div>';
            }
        }
        ?>
        
        <form method="post">
            <p>Enter your email address to receive a test email:</p>
            <input type="email" name="test_email" placeholder="your-email@example.com" required style="padding: 8px; width: 300px; margin-right: 10px;">
            <button type="submit">Send Test Email</button>
        </form>
    </div>

    <h2>Troubleshooting</h2>
    <div class="info">
        <strong>If the test fails:</strong>
        <ol>
            <li>Check your <code>email-config.php</code> settings</li>
            <li>Verify your hosting provider supports PHP mail() or SMTP</li>
            <li>Check server error logs for detailed error messages</li>
            <li>For SMTP: verify credentials and server settings</li>
            <li>Test with a simple email address first</li>
        </ol>
    </div>

    <div class="info">
        <strong>Next Steps:</strong>
        <ol>
            <li>If the test email works, your contact form should work too</li>
            <li>Test the actual contact form on your website</li>
            <li>Delete or rename this test file for security</li>
            <li>Monitor your email logs for any issues</li>
        </ol>
    </div>

    <p><small><strong>Security Note:</strong> Delete this test file after confirming your email setup works correctly.</small></p>
</body>
</html>