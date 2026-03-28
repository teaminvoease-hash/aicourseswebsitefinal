<?php include __DIR__.'/_init.php';$courseId=(int)($_GET['course_id']??0);$s=current_student();$c=$db->prepare('SELECT * FROM courses WHERE id=?');$c->execute([$courseId]);$course=$c->fetch();if(!$course) die('Course not found');
$amount=(float)($course['discounted_price']?:$course['price']);
if($_SERVER['REQUEST_METHOD']==='POST'){if(!verify_csrf($_POST['csrf_token']??''))die('CSRF');
// Razorpay order placeholder. Replace with API call.
$orderId='order_'.bin2hex(random_bytes(5));
$db->prepare('INSERT INTO payments(student_id,course_id,amount,status,razorpay_order_id,created_at) VALUES(?,?,?,"created",?,NOW())')->execute([$s['id'],$courseId,$amount,$orderId]);
$db->prepare('INSERT IGNORE INTO enrollments(student_id,course_id,payment_status,progress_percent,created_at) VALUES(?,?,"pending",0,NOW())')->execute([$s['id'],$courseId]);
echo 'Order created. Integrate Razorpay checkout using key_id from config and call /api/payment-webhook.php for signature verification.';exit;}
?><h3>Enroll in <?=e($course['title'])?></h3><p>Fee: ₹<?=e($amount)?></p><form method="post"><input type="hidden" name="csrf_token" value="<?=csrf_token()?>"><button>Proceed to Pay (Razorpay)</button></form>
