<?php
function login_student(PDO $db, string $email, string $password): bool {
    $s = $db->prepare('SELECT * FROM students WHERE email=? AND status="active" LIMIT 1');
    $s->execute([$email]);
    $u = $s->fetch();
    if (!$u || !password_verify($password, $u['password_hash'])) return false;
    session_regenerate_id(true);
    $_SESSION['student'] = ['id' => $u['id'], 'name' => $u['full_name'], 'email' => $u['email']];
    return true;
}
function login_admin(PDO $db, string $email, string $password): bool {
    $s = $db->prepare('SELECT * FROM admins WHERE email=? AND status="active" LIMIT 1');
    $s->execute([$email]);
    $u = $s->fetch();
    if (!$u || !password_verify($password, $u['password_hash'])) return false;
    session_regenerate_id(true);
    $_SESSION['admin'] = ['id' => $u['id'], 'name' => $u['full_name'], 'role' => $u['role']];
    return true;
}
function require_student(): void { if (!current_student()) redirect('/login.php'); }
function require_admin(): void { if (!current_admin()) redirect('/admin/login.php'); }
