# Raspored pripravnosti — infektologija

Offline HTML aplikacija za izradu i provjeru rasporeda pripravnosti.

## GitHub Pages

Svaki push na granu `main` automatski objavljuje `index.html` kroz GitHub Actions workflow
`Deploy to GitHub Pages`. Workflow se može pokrenuti i ručno iz kartice **Actions**.

Za lokalni pregled nije potreban build niti instalacija ovisnosti. Dovoljno je otvoriti
`index.html` u pregledniku ili pokrenuti jednostavan statički HTTP poslužitelj u korijenu
repozitorija.

Statičke provjere mogu se pokrenuti naredbom `npm test`; test ne instalira nikakve ovisnosti.

## Izvor aplikacije

Početna verzija ove datoteke preuzeta je s postojeće Netlify objave:
<https://raspored-pripravnosti-infektologija.netlify.app/>.
