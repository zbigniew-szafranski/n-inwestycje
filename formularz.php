<?php
// Wymuszenie odpowiedzi JSON (wymagane przez nasz plik script.js)
header('Content-Type: application/json; charset=utf-8');

// ==========================================
// KONFIGURACJA
// MIEJSCE NA ADRES E-MAIL KLIENTA BIURA:
$odbiorca = "TUTAJ_WPISZ_EMAIL_KLIENTA@domena.pl"; 
// ==========================================

$tytul = "NOWY LEAD: N-Nieruchomości (Skup/Pośrednictwo)";

// Zabezpieczenie przez RODO i atakami bezpośrednimi
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Oczyszczenie wejść z formularza (ochrona przez XSS)
    $telefon = strip_tags(trim($_POST["phone"] ?? ''));
    $lokalizacja = strip_tags(trim($_POST["location"] ?? ''));
    $typ = strip_tags(trim($_POST["type"] ?? ''));

    // Walidacja – upewnianie się, że plik nie otrzymał pustego żądania
    if (empty($telefon) || empty($lokalizacja) || empty($typ)) {
        http_response_code(400); // 400 Bad Request
        echo json_encode(["errors" => [["message" => "Proszę wypełnić wszystkie pola formularza."]]]);
        exit;
    }

    // Budowanie treści wiadomości dla klienta
    $wiadomosc = "Otrzymałeś nowe zgłoszenie z własnego Landing Page:\n\n";
    $wiadomosc .= "Telefon klienta: $telefon\n";
    $wiadomosc .= "Dzielnica / Miasto: $lokalizacja\n";
    $wiadomosc .= "Zainteresowany cel: $typ\n\n";
    $wiadomosc .= "--\nZadzwoń do niego jak najszybciej, by wyprzedzić konkurencję!\n";

    // Opcjonalne: Ustaw własnego maila do wysyłki (tzw nadawcę wpisanego na stałe) w FROM
    $naglowki = "From: system-na-twoim-vps@twojadomena.pl\r\n"; 
    $naglowki .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Wysłanie e-maila korzystając z funkcji mail() systemu operacyjnego
    if (mail($odbiorca, $tytul, $wiadomosc, $naglowki)) {
        http_response_code(200); // Wszystko OK
        echo json_encode(["success" => true]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(["errors" => [["message" => "Wystąpił błąd w samej usłudze e-mail na Twoim serwerze Hostinger. Upewnij się, że VPS ma skonfigurowany pakiet serwera poczty np. Postfix albo Sendmail."]]]);
    }
} else {
    http_response_code(403);
    echo json_encode(["errors" => [["message" => "Blokada uderzenia bezpośredniego. Endpoint przyjmuje tylko POST z formularza."]]]);
}
?>
