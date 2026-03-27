<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Odbieranie przesłanych danych z quizu
    $propertyType = htmlspecialchars(strip_tags(trim($_POST['propertyType'] ?? '')));
    $location     = htmlspecialchars(strip_tags(trim($_POST['location'] ?? '')));
    $phone        = htmlspecialchars(strip_tags(trim($_POST['phone'] ?? '')));
    $userIntent   = htmlspecialchars(strip_tags(trim($_POST['userIntent'] ?? 'nie_okreslono'))); // "skup" lub "posrednictwo" lub "nie_okreslono"

    // Podstawowa walidacja
    if (empty($propertyType) || empty($location) || empty($phone)) {
        http_response_code(400);
        echo json_encode(["errors" => [["message" => "Proszę wypełnić wszystkie kroki ankiety."]]]);
        exit;
    }

    // Twoj adres e-mail, na który ma przyjść zgłoszenie
    $to = "kontakt@nnieruchomosci.pl"; 
    $subject = "🔥 NOWY LEAD Z QUIZU: " . ucfirst($propertyType) . " | " . $location;
    
    // Treść wiadomości e-mail
    $message = "Nowe zgłoszenie z lejka sprzedażowego!\n\n";
    $message .= "CZEGO DOTYCZY: " . ucfirst($propertyType) . "\n";
    $message .= "LOKALIZACJA: " . $location . "\n";
    $message .= "TELEFON KONTAKTOWY: " . $phone . "\n";
    $message .= "INTENCJA KLIENTA (co kliknął na górze?): " . strtoupper($userIntent) . "\n\n";
    $message .= "Pamiętaj, odzwoń jak najszybciej (KPI: <24h).";

    // Nagłówki
    $headers = "From: no-reply@N-inwestycje.pl\r\n";
    $headers .= "Reply-To: no-reply@N-inwestycje.pl\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Wysłanie maila (zakładając że funkcja mail() jest poprawnie skonfigurowana na serwerze)
    $mailSent = @mail($to, $subject, $message, $headers);

    if ($mailSent) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Wiadomość z quizu została wysłana."]);
    } else {
        http_response_code(500);
        // By testować np. na XAMPP gdzie `mail()` bywa wyłączone:
        // echo json_encode(["success" => true, "message" => "Symulacja - mail() wyłączone."]);
        echo json_encode(["errors" => [["message" => "Wystąpił błąd podczas wysyłania e-maila. Prawdopodobnie serwer nie obsługuje funkcji mail()."]]]);
    }

} else {
    http_response_code(403);
    echo json_encode(["errors" => [["message" => "Odmowa dostępu. Wymagany POST."]]]);
}
?>
