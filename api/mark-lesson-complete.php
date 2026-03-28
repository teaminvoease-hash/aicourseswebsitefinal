<?php require_once __DIR__.'/../config/bootstrap.php'; require_student(); header('Content-Type: application/json');
if($_SERVER['REQUEST_METHOD']!=='POST' || !verify_csrf($_POST['csrf_token']??'')){http_response_code(403); echo json_encode(['ok'=>false]); exit;}
$s=current_student();$lesson=(int)$_POST['lesson_id'];$course=(int)$_POST['course_id'];
$db->prepare('INSERT INTO lesson_progress(student_id,course_id,lesson_id,completed_at) VALUES(?,?,?,NOW()) ON DUPLICATE KEY UPDATE completed_at=NOW()')->execute([$s['id'],$course,$lesson]);
$total=$db->prepare('SELECT COUNT(*) FROM lessons WHERE course_id=?');$total->execute([$course]);$t=(int)$total->fetchColumn();
$done=$db->prepare('SELECT COUNT(*) FROM lesson_progress WHERE student_id=? AND course_id=? AND completed_at IS NOT NULL');$done->execute([$s['id'],$course]);$d=(int)$done->fetchColumn();
$percent=$t?round(($d/$t)*100,2):0;$db->prepare('UPDATE enrollments SET progress_percent=? WHERE student_id=? AND course_id=?')->execute([$percent,$s['id'],$course]);
echo json_encode(['ok'=>true,'progress'=>$percent]);
