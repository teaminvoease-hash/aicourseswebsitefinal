<?php
function setting(PDO $db, string $key, string $default=''): string {
    $q = $db->prepare('SELECT setting_value FROM site_settings WHERE setting_key=? LIMIT 1');
    $q->execute([$key]);
    return $q->fetchColumn() ?: $default;
}
function flash(string $key, ?string $msg = null): ?string {
    if ($msg !== null) { $_SESSION['flash'][$key] = $msg; return null; }
    $val = $_SESSION['flash'][$key] ?? null; unset($_SESSION['flash'][$key]); return $val;
}
function redirect(string $path): never { header('Location: ' . $path); exit; }
function current_student(): ?array { return $_SESSION['student'] ?? null; }
function current_admin(): ?array { return $_SESSION['admin'] ?? null; }
function make_certificate_id(PDO $db): string {
    $year = date('Y');
    $seq = (int)$db->query("SELECT COUNT(*) FROM certificates WHERE YEAR(created_at)=$year")->fetchColumn() + 1;
    return sprintf('LEXAI-%s-%04d', $year, $seq);
}
