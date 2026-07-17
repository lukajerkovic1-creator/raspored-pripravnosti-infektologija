# Raspored pripravnosti — infektologija

Offline HTML aplikacija za izradu i provjeru rasporeda pripravnosti.

Aktualna verzija `0.10.46` nakon generiranja otvara portretni A4 uređivač s odvojenim
privremenim nacrtom, validacijom, audit tragom i izvozima koji koriste isključivo spremljeni
službeni raspored. Samostalna datoteka za izravnu isporuku je
`raspored_pripravnosti_app_v0_10_46_a4_editor.html`.

## GitHub Pages

Svaki push na granu `main` automatski objavljuje `index.html` kroz GitHub Actions workflow
`Deploy to GitHub Pages`. Workflow se može pokrenuti i ručno iz kartice **Actions**.

Za lokalni pregled nije potreban build niti instalacija ovisnosti. Dovoljno je otvoriti
`index.html` u pregledniku ili pokrenuti jednostavan statički HTTP poslužitelj u korijenu
repozitorija.

Statičke i A4 contract provjere mogu se pokrenuti naredbom `npm test`; testovi ne instaliraju
nikakve ovisnosti. Dodatnih 88 funkcionalnih regresijskih testova ugrađeno je u samu HTML
aplikaciju i dostupno kroz **Napredne opcije → Pokreni testove pravila**.

## Izvor aplikacije

Početna verzija ove datoteke preuzeta je s postojeće Netlify objave:
<https://raspored-pripravnosti-infektologija.netlify.app/>.
