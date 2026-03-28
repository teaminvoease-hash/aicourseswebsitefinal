<?php include __DIR__.'/_init.php';$s=current_student();$q=$db->prepare('SELECT e.progress_percent, c.* FROM enrollments e JOIN courses c ON c.id=e.course_id WHERE e.student_id=? ORDER BY e.id DESC');$q->execute([$s['id']]);$rows=$q->fetchAll(); ?>
<?php foreach($rows as $r): ?>
<div><?=e($r['title'])?> - <?=e($r['progress_percent'])?>% <a href="/student/lesson.php?course_id=<?=$r['id']?>">Open</a></div>
<?php endforeach; ?>
