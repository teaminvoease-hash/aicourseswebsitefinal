<?php include __DIR__.'/_init.php';
$stats=[
'total_students'=>$db->query('SELECT COUNT(*) FROM students')->fetchColumn(),
'total_courses'=>$db->query('SELECT COUNT(*) FROM courses')->fetchColumn(),
'total_enrollments'=>$db->query('SELECT COUNT(*) FROM enrollments')->fetchColumn(),
'total_revenue'=>$db->query("SELECT COALESCE(SUM(amount),0) FROM payments WHERE status='paid'")->fetchColumn(),
'pending_certificates'=>$db->query("SELECT COUNT(*) FROM certificates WHERE status='pending'")->fetchColumn(),
'new_enquiries'=>$db->query('SELECT COUNT(*) FROM inquiries WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)')->fetchColumn(),
];
?><h1>Admin Dashboard</h1><?php foreach($stats as $k=>$v):?><div><?=e($k)?>: <strong><?=e((string)$v)?></strong></div><?php endforeach;?><p><a href="/admin/courses.php">Manage Courses</a> | <a href="/admin/students.php">Students</a> | <a href="/admin/payments.php">Payments</a> | <a href="/admin/certificates.php">Certificates</a> | <a href="/admin/enquiries.php">Enquiries</a></p>
