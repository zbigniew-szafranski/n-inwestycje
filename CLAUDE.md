# CLAUDE.md

Ten plik zawiera wskazówki dla Claude Code (claude.ai/code) podczas pracy z kodem w tym repozytorium.

## Opis projektu

Statyczna strona landing page dla **N Inwestycje** — polskiej firmy nieruchomościowej działającej w Łodzi. Strona to jednostronicowy lej sprzedażowy (nie zwykła strona firmowa). Każda decyzja projektowa i copywriterska jest podporządkowana generowaniu leadów.

Wdrożona przez GitHub Pages: `https://zbigniew-szafranski.github.io/n-inwestycje/`

## Technologie

- Czysty HTML/CSS/JS — brak kroku budowania, bundlera ani frameworka
- `formularz.php` — obsługa leadów po stronie serwera (PHP 8.1+, używa `mail()`)
- Google Fonts: Outfit (nagłówki) + Inter (treść)

Podgląd lokalny: otwórz `index.html` bezpośrednio w przeglądarce lub uruchom dowolny serwer statyczny:
```bash
python3 -m http.server 8080
```
Handler PHP wymaga prawdziwego serwera PHP — `fetch()` do `formularz.php` nie zadziała na zwykłym serwerze plików.

## Architektura — kolejność sekcji lejka

Strona to celowo zaprojektowany lej konwersji. Kolejność sekcji jest obowiązkowa:

1. **Navbar** — sticky, jedyne CTA: "Wyceń bez zobowiązań" → `#quiz`
2. **Hero** — nagłówek + CTA z podziałem intencji (skup / pośrednictwo) + linia autorytetu
3. **Sekcja Problem** — 4 punkty bólu, potwierdza użytkownikowi że trafił we właściwe miejsce
4. **Social proof** — 3 statystyki (+500 / +100mln / 24h)
5. **Tabela porównawcza** — "Co jest dla Ciebie lepsze?" (Skup vs Pośrednictwo)
6. **Sekcja Skup** — agresywna konwersja + proces 3-krokowy
7. **Sekcja Pośrednictwo** — pozycjonowanie premium + proces 3-krokowy
8. **Testimoniale** — 3 opinie klientów z ⭐⭐⭐⭐⭐
9. **Sekcja Inwestorzy** — 3. kanał przychodów (off-market, poniżej ceny rynkowej)
10. **Quiz** (`#quiz`) — pozyskiwanie leadów w 3 krokach: typ → lokalizacja → telefon
11. **Sticky CTA** — mobile: pełna szerokość na dole ekranu; desktop: pojawia się po przewinięciu poza hero
12. **Footer** — telefon + email + copyright

## Kluczowe mechanizmy

**Routing intencji (dual-intent)**: przyciski CTA w hero wywołują `setQuizPath('skup')` lub `setQuizPath('posrednictwo')`, co ustawia ukryte pole `userIntent` w formularzu quizu. Handler PHP umieszcza tę wartość w temacie i treści emaila, dzięki czemu sprzedawca wie przed telefonem, którą ścieżkę wybrał lead.

**Formularz quizu** (`#leadQuizForm` → `formularz.php` przez `fetch()`):
- Krok 1: typ nieruchomości (radio cards — `propertyType`)
- Krok 2: lokalizacja (tekst — `location`)
- Krok 3: telefon z polską walidacją regex (`/^(\+?48)?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/`) — `phone`
- Po sukcesie: formularz się chowa, pokazuje się `#quizSuccess` z bezpośrednim CTA telefonicznym
- Po błędzie: pokazuje się `#quizError` z komunikatem serwera

**Animacje scroll**: `IntersectionObserver` dodaje klasę `.visible` do elementów `.fade-in` (próg 0.12). CSS obsługuje przejście opacity/transform.

**Sticky CTA**: domyślnie `display:none` w CSS. Mobile (`≤768px`): zawsze `display:flex` jako dolny pasek przez media query. Desktop: listener scroll w JS pokazuje go po przewinięciu poza wysokość sekcji hero.

## Zasady pozycjonowania (nie naruszać)

Marka jest pozycjonowana jako **inwestor, nie pośrednik**. Copy musi to wzmacniać. Kluczowe frazy ze strategii:
- "Partner od decyzji nieruchomościowych" (tagline)
- Autorytet: "Jesteśmy inwestorami — znamy rynek od środka"
- FOMO: "oferta w 24h"
- Ramowanie wyboru: "szybko vs drożej" (nigdy nie używać generycznych CTA typu "kontakt")

## Uwagi do handlera PHP

`formularz.php` sanityzuje wszystkie dane wejściowe przez `htmlspecialchars(strip_tags(trim(...)))`. Używa `mail()` — na serwerach gdzie `mail()` jest wyłączone (np. hosting współdzielony bez konfiguracji SMTP) zwróci 500. W razie problemów z dostarczalnością zamienić `mail()` na bibliotekę SMTP (PHPMailer / Symfony Mailer).

## Śledzenie (nieaktywne)

Placeholdery istnieją w `index.html` (GA4 + Facebook Pixel) i `script.js` (zdarzenie Lead po sukcesie quizu). Odkomentować i uzupełnić ID aby aktywować. Tagi OG są obecne, ale brakuje `og:url` i `og:image`.
