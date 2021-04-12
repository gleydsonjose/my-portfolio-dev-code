<?php
include 'PHPMailer/src/PHPMailer.php';
include 'PHPMailer/src/SMTP.php';
include 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$contactMeName = strip_tags(trim($_POST['contactMeName']));
$contactMeEmail = strip_tags(trim($_POST['contactMeEmail']));
$contactMeSubject = strip_tags(trim($_POST['contactMeSubject']));
$contactMeMessage = strip_tags(trim($_POST['contactMeMessage']));

if(preg_match("/[a-z0-9]{2}/i", $contactMeName) && preg_match("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/", $contactMeEmail) && preg_match("/[a-z0-9]{2}/i", $contactMeSubject) && preg_match("/[a-z0-9]{2}/i", $contactMeMessage)) {
  $to = "gleydsonjosedasilva@hotmail.com";
  $subject = "$contactMeSubject";
  $message = "<table style='padding: 0; margin: 0; font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 500px;'>
  <thead style='background-color: #3588cc;'>
    <tr style='height: 100px;'>
      <td style='width: 180px; text-align: center; font-size: 18pt; font-weight: bold; border-radius: 15px 0 0 0;'>
        <span style='color: #333333;'>Satuct</span> <span style='color: #eeeeee'>Kode</span>
      </td>
      <td style='padding: 10px; font-size: 13pt; color: #eeeeee; border-radius: 0 15px 0 0;'>
        Mensagem de $contactMeName
      </td>
    </tr>
  </thead>
  <tbody style='background-color: #f3f3f3; color: #292929;'>
    <tr>
      <td colspan='2' style='color: #3588cc; padding: 10px 10px 0 10px; font-size: 11pt;'>Nome: <span style='font-size: 10pt; color: #333333;'>$contactMeName</span></td>
    </tr>
    <tr>
      <td colspan='2' style='color: #3588cc; padding: 10px 10px 0 10px; font-size: 11pt;'>Email: <span style='font-size: 10pt; color: #333333;'>$contactMeEmail</span></td>
    </tr>
    <tr>
      <td colspan='2' style='color: #3588cc; padding: 10px 10px 5px 10px; font-size: 11pt;'>Mensagem:</td>
    </tr>
    <tr>
      <td style='border-radius: 0 0 10px 10px; padding: 0 10px 10px 10px; font-size: 10pt; color: #333333;' colspan='2'>$contactMeMessage</td>
    </tr>
  </tbody>
</table>";

  $mail = new PHPMailer(true);
  try {
    $mail->Port = '465';
    $mail->Host = 'smtp.gmail.com';
    $mail->CharSet = 'UTF-8';
    $mail->Mailer = 'smtp';
    $mail->SMTPSecure = 'ssl';
    $mail->SMTPAuth = true;
    $mail->Username = 'satuctgames@gmail.com';
    $mail->Password = 'saga8810';
    $mail->SingleTo = true;
  
    $mail->IsHTML(true);
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->From = 'satuctgames@gmail.com';
    $mail->FromName = 'SatuctKode Mensagem';
    $mail->send();
    echo "success";
  } catch(Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
}


header("Access-Control-Allow-Origin:*");
header("Content-type: text/html");