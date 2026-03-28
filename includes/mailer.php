<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function send_mail(array $config, string $to, string $subject, string $html): bool {
    if (!class_exists(PHPMailer::class)) {
        return false;
    }
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['mail']['host'];
    $mail->Port = $config['mail']['port'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['mail']['username'];
    $mail->Password = $config['mail']['password'];
    $mail->setFrom($config['mail']['from_email'], $config['mail']['from_name']);
    $mail->addAddress($to);
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $html;
    return $mail->send();
}
