<?php $metaTitle='Student Login'; include __DIR__.'/includes/header.php';
if($_SERVER['REQUEST_METHOD']==='POST'){if(rate_limited('student_login')) flash('error','Too many attempts, try later.');
elseif(verify_csrf($_POST['csrf_token']??'') && login_student($db,sanitize($_POST['email']),$_POST['password'])) redirect('/student/index.php');
else flash('error','Invalid login credentials.'); redirect('/login.php');}
?>
<section class="container py-5" style="max-width:520px"><h1>Student Login</h1><?php if($m=flash('error')):?><div class="alert alert-danger"><?=e($m)?></div><?php endif; ?><form method="post" class="card card-body"><input type="hidden" name="csrf_token" value="<?=csrf_token()?>"><input required type="email" name="email" class="form-control mb-3" placeholder="Email"><input required type="password" name="password" class="form-control mb-3" placeholder="Password"><button class="btn btn-primary">Login</button><a href="/forgot-password.php" class="small mt-2">Forgot password?</a></form></section>
<?php include __DIR__.'/includes/footer.php'; ?>
