<?php $metaTitle='Contact | LexAI Academy'; include __DIR__.'/includes/header.php'; require_once __DIR__.'/includes/mailer.php';
if($_SERVER['REQUEST_METHOD']==='POST'){
    if(!verify_csrf($_POST['csrf_token']??'')) die('Invalid CSRF');
    $name=sanitize($_POST['name']);$email=sanitize($_POST['email']);$mobile=sanitize($_POST['mobile']);$interest=sanitize($_POST['course_interest']);$message=sanitize($_POST['message']);
    $stmt=$db->prepare('INSERT INTO inquiries(name,email,mobile,course_interest,message,created_at) VALUES(?,?,?,?,?,NOW())');
    $stmt->execute([$name,$email,$mobile,$interest,$message]);
    $body="<p>New enquiry from {$name}</p><p>Email: {$email}</p><p>Mobile: {$mobile}</p><p>Course: {$interest}</p><p>Message: {$message}</p>";
    send_mail($config,'admin@lexaiacademy.in','New Course Enquiry',$body) || @mail('admin@lexaiacademy.in','New Course Enquiry',strip_tags($body));
    flash('success','Thanks, our team will contact you shortly.');redirect('/contact.php');
}
?>
<section class="container py-5"><h1>Contact Us</h1><p>Speak with our admissions team for course mapping, pricing, and batch schedules.</p><?php if($m=flash('success')): ?><div class="alert alert-success"><?=e($m)?></div><?php endif; ?><form method="post" class="row g-3"><input type="hidden" name="csrf_token" value="<?=csrf_token()?>"><div class="col-md-6"><input required name="name" class="form-control" placeholder="Name"></div><div class="col-md-6"><input required type="email" name="email" class="form-control" placeholder="Email"></div><div class="col-md-6"><input required name="mobile" class="form-control" placeholder="Mobile"></div><div class="col-md-6"><input name="course_interest" class="form-control" placeholder="Course Interest"></div><div class="col-12"><textarea required name="message" class="form-control" rows="5" placeholder="Message"></textarea></div><div class="col-12"><button class="btn btn-primary">Submit Enquiry</button></div></form></section>
<?php include __DIR__.'/includes/footer.php'; ?>
