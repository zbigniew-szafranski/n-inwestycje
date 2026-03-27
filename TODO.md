# TODO — N Inwestycje

## Błędy (naprawione)

- [x] **1. PHP `FILTER_SANITIZE_STRING` deprecated** — `formularz.php` nie działał na PHP 8.1+. Zamieniono na `htmlspecialchars(strip_tags(trim(...)))`.

- [x] **2. Brakujące klasy CSS** — `.align-center`, `.light-overlap`, `.border-dark` używane w HTML ale niezdefiniowane w CSS. Dodano.

- [x] **3. Animacja `.pulse` bez `@keyframes`** — sticky CTA miało klasę `pulse` ale animacja nie istniała. Dodano `@keyframes pulse`.

- [x] **4. Walidacja telefonu bez regex** — pole telefonu sprawdzało tylko czy nie jest puste. Dodano regex `/^(\+?48)?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/`.

- [x] **5. Copyright statyczny `2024`** — zamieniono na `new Date().getFullYear()` w JS.

- [x] **6. Tabela porównawcza nie responsywna na iPhone 12** — dwie kolumny na 390px. Naprawiono: stacked cards na mobile (`thead` ukryty, `td` jako bloki).

- [x] **7. Numer telefonu jako placeholder** — footer i success box miały `+48 XXX XXX XXX`. Zastąpiono prawdziwym numerem `+48 508 040 466`.

---

## Brakujące elementy (dodane)

- [x] **8. Brak sekcji Problem** — strona zaczynała się od rozwiązania bez identyfikacji bólu klienta. Dodano 4 pain pointy po hero.

- [x] **9. Brak "Jak to działa"** — oba CTA prowadziły od razu do quizu bez wyjaśnienia procesu. Dodano 3-krokowy proces pod sekcją Skup i Pośrednictwo.

- [x] **10. Brak testimoniali** — social proof to tylko liczby. Dodano 3 opinie z ⭐⭐⭐⭐⭐.

- [x] **11. Brak sekcji Inwestorów** — Kanał 3 (off-market, duże projekty) nieobecny na stronie. Dodano sekcję.

- [x] **12. Brak next step po quizie** — po wysłaniu formularza nie było dalszego kroku. Dodano przycisk z numerem telefonu w success boxie.

- [x] **13. Brak numeru telefonu w footerze** — tylko email. Dodano.

- [x] **14. Brak autorytetu "inwestor, nie pośrednik"** — kluczowy element psychologii wg strategii. Dodano linię pod CTA w hero.

- [x] **15. Brak OG tagów** — brak podglądu przy udostępnianiu na FB/Messenger. Dodano bazowe tagi (`og:title`, `og:description`, `og:type`, `og:locale`).

- [x] **16. Brak animacji scroll** — elementy pojawiały się nagle. Dodano `IntersectionObserver` + `.fade-in` / `.visible`.

- [x] **17. Brak `autocomplete="tel"`** — mobile nie podpowiadało numeru z kontaktów. Dodano.

---

## Do zrobienia

- [ ] **18. Uzupełnić `og:url` i `og:image`** — OG tagi niekompletne bez URL strony i zdjęcia. Bez obrazu FB/Messenger nie pokazuje podglądu. Wymaga dostarczenia URL i ścieżki do grafiki.

- [ ] **19. Aktywować Google Analytics GA4** — placeholder w `index.html` odkomentować i wpisać Measurement ID (`G-XXXXXXXXXX`). Odkomentować też event `generate_lead` w `script.js` po sukcesie quizu.

- [ ] **20. Aktywować Facebook Pixel** — placeholder w `index.html` odkomentować i wpisać Pixel ID. Odkomentować `fbq('track', 'Lead')` w `script.js`.

- [ ] **21. Sprawdzić `mail()` na docelowym hostingu** — jeśli hosting nie obsługuje `mail()`, `formularz.php` zwróci 500. Zamienić na PHPMailer lub Symfony Mailer z konfiguracją SMTP.
