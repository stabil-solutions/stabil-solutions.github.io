<?php
if(isset($_POST['email'])) {
    $email_to = "stabil.solutions@gmail.com";
    $email_subject = "New subscription from stabil-solutions.com";
    
    $email_from = $_POST['email']; // required
    
    $email_message = "Form details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "Email: ".clean_string($email_from)."\n";
     
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers); 

header("Location:http://www.stabil-solutions.com/subscription.html");
}
?>