<?php require_once __DIR__.'/config/bootstrap.php'; header('Content-Type: application/xml; charset=utf-8');
$urls=['/','/about.php','/courses.php','/contact.php','/faq.php','/terms.php','/privacy.php','/refund-policy.php','/disclaimer.php','/verify-certificate.php'];
$courses=$db->query("SELECT slug,updated_at FROM courses WHERE status='published'")->fetchAll();
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
foreach($urls as $u){echo '<url><loc>'.htmlspecialchars(rtrim($config['app']['base_url'],'/').$u).'</loc></url>';}
foreach($courses as $c){echo '<url><loc>'.htmlspecialchars(rtrim($config['app']['base_url'],'/').'/course/'.$c['slug']).'</loc><lastmod>'.date('c',strtotime($c['updated_at'])).'</lastmod></url>';}
echo '</urlset>';
