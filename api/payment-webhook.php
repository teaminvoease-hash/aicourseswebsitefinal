<?php
require_once __DIR__.'/../config/bootstrap.php';
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';
$expected = hash_hmac('sha256', $payload, $config['razorpay']['webhook_secret']);
if (!hash_equals($expected, $signature)) { http_response_code(400); echo 'Invalid signature'; exit; }
$data = json_decode($payload, true);
if (($data['event'] ?? '') === 'payment.captured') {
    $entity = $data['payload']['payment']['entity'];
    $orderId = $entity['order_id'];
    $paymentId = $entity['id'];
    $amount = $entity['amount'] / 100;
    $db->prepare("UPDATE payments SET status='paid', razorpay_payment_id=?, amount=? WHERE razorpay_order_id=?")->execute([$paymentId,$amount,$orderId]);
    $db->prepare("UPDATE enrollments e JOIN payments p ON p.student_id=e.student_id AND p.course_id=e.course_id SET e.payment_status='paid' WHERE p.razorpay_order_id=?")->execute([$orderId]);
}
echo 'ok';
