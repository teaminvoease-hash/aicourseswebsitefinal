<?php
return [
    'app' => [
        'name' => 'LexAI Academy',
        'base_url' => 'https://yourdomain.com',
        'session_name' => 'lexai_session',
    ],
    'db' => [
        'host' => 'localhost',
        'port' => '3306',
        'name' => 'lexai_db',
        'user' => 'lexai_user',
        'pass' => 'change-me',
        'charset' => 'utf8mb4',
    ],
    'mail' => [
        'host' => 'smtp.example.com',
        'port' => 587,
        'username' => 'noreply@example.com',
        'password' => 'mail-password',
        'from_email' => 'noreply@example.com',
        'from_name' => 'LexAI Academy',
    ],
    'razorpay' => [
        'key_id' => 'rzp_test_xxxxxxxxxx',
        'key_secret' => 'xxxxxxxxxx',
        'webhook_secret' => 'xxxxxxxxxx',
        'currency' => 'INR',
    ],
    'security' => [
        'csrf_ttl' => 7200,
        'login_rate_limit' => 6,
        'rate_limit_window' => 900,
    ],
];
