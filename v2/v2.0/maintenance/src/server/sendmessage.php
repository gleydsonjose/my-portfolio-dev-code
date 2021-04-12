<?php
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
  $headers = "MIME-Version: 1.0"."\r\n";
  $headers.= "Content-type: text/html;charset=UTF-8"."\r\n";
  $headers.= "From: $contactMeName";

  if(mail($to, $subject, $message, $headers)) {
    echo true;
  }
}