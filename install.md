# LexAI Academy PHP Deployment (cPanel)

## Requirements
- PHP 8.2+
- MySQL/MariaDB
- Apache with mod_rewrite
- SSL enabled

## Steps
1. Upload all project files to `public_html/` (or a subfolder).
2. Copy `config/config.sample.php` to `config/config.php`.
3. Update DB, mail and Razorpay keys in `config/config.php`.
4. Create MySQL database and user in cPanel.
5. Import `database/schema.sql` using phpMyAdmin.
6. Ensure these folders are writable (`755` or `775`):
   - `assets/uploads/certificates/`
   - `assets/uploads/profile/`
   - `assets/uploads/course-material/`
7. Verify `.htaccess` rewrite support.
8. Login credentials (change immediately after first login):
   - Admin: `admin@lexaiacademy.in` / `Admin@123`
   - Student: `student@lexaiacademy.in` / `Admin@123`
9. Set Razorpay webhook URL to `https://yourdomain.com/api/payment-webhook.php`.
10. Optional: configure SMTP and PHPMailer in your server mail function.

## What to customize
- Logo and brand colors: `assets/css/style.css`, header/footer include files.
- Contact details and social links: `includes/footer.php`, `contact.php`.
- Policies: `terms.php`, `privacy.php`, `refund-policy.php`, `disclaimer.php`.
- Payment keys: `config/config.php` (`razorpay` section).

## Security checklist
- Force HTTPS from cPanel/Cloudflare.
- Replace default passwords.
- Restrict admin URL if needed via IP in `.htaccess`.
- Enable automatic backups and malware scan.
