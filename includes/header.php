<?php require_once __DIR__ . '/../config/bootstrap.php'; ?>
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($metaTitle ?? setting($db, 'site_title', 'LexAI Academy')) ?></title>
<meta name="description" content="<?= e($metaDescription ?? setting($db, 'site_description', 'Premium legal-tech education platform')) ?>">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="/assets/css/style.css" rel="stylesheet">
</head><body>
<nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top"><div class="container">
<a class="navbar-brand fw-bold" href="/">LexAI Academy</a>
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#n"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="n"><ul class="navbar-nav ms-auto gap-2">
<li class="nav-item"><a class="nav-link" href="/courses.php">Courses</a></li>
<li class="nav-item"><a class="nav-link" href="/about.php">About</a></li>
<li class="nav-item"><a class="nav-link" href="/faq.php">FAQ</a></li>
<li class="nav-item"><a class="nav-link" href="/contact.php">Contact</a></li>
<li class="nav-item"><a class="btn btn-outline-primary btn-sm" href="/login.php">Student Login</a></li>
</ul></div></div></nav>
