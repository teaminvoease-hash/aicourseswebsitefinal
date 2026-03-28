<?php
function csrf_token(): string {
    if (empty($_SESSION['csrf_token']) || ($_SESSION['csrf_expires'] ?? 0) < time()) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_expires'] = time() + 7200;
    }
    return $_SESSION['csrf_token'];
}
function verify_csrf(?string $token): bool {
    return !empty($token) && hash_equals($_SESSION['csrf_token'] ?? '', $token) && ($_SESSION['csrf_expires'] ?? 0) >= time();
}
function e(?string $value): string { return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8'); }
function sanitize(string $v): string { return trim(filter_var($v, FILTER_SANITIZE_SPECIAL_CHARS)); }
function validate_upload(array $file, array $allowed, int $maxSize = 2097152): ?string {
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) return null;
    if ($file['size'] > $maxSize) return null;
    $mime = mime_content_type($file['tmp_name']);
    if (!in_array($mime, $allowed, true)) return null;
    return $mime;
}
function rate_limited(string $key, int $limit = 6, int $window = 900): bool {
    $_SESSION['rate'][$key] ??= [];
    $_SESSION['rate'][$key] = array_filter($_SESSION['rate'][$key], fn($ts) => $ts > time() - $window);
    if (count($_SESSION['rate'][$key]) >= $limit) return true;
    $_SESSION['rate'][$key][] = time();
    return false;
}
