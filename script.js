// API 15: IP-API (Documentație: http://ip-api.com/json/)
const API_URL = 'http://ip-api.com/json/';

// Elemente DOM
const btn = document.getElementById('locate-btn');
const statusMsg = document.getElementById('status-msg');
const resultCard = document.getElementById('result-card');

// Câmpuri de completat
const ipDisplay = document.getElementById('ip-address');
const countryDisplay = document.getElementById('country-name');
const cityDisplay = document.getElementById('city-name');
const ispDisplay = document.getElementById('isp-name');
const coordsDisplay = document.getElementById('coords');
const flagImg = document.getElementById('flag-img');

async function getIPDetails() {
    console.log("[START] Inițializare cerere localizare...");
    
    // UI Update - Loading State
    btn.disabled = true;
    btn.innerText = "Se localizează...";
    statusMsg.innerText = "Conectare la satelit... 📡";
    statusMsg.style.color = "#58a6ff";

    try {
        // Pasul 1: Fetch date
        const response = await fetch(API_URL);
        console.log(`[NETWORK] Status răspuns: ${response.status}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("[DATA] Date primite:", data);

        // Verificăm dacă API-ul a dat eroare internă (fail)
        if (data.status === 'fail') {
            throw new Error('Nu s-a putut localiza IP-ul (Private/Local IP).');
        }

        // Pasul 2: Populare date în HTML
        ipDisplay.innerText = data.query;
        countryDisplay.innerText = data.country;
        cityDisplay.innerText = data.city;
        ispDisplay.innerText = data.isp;
        coordsDisplay.innerText = `${data.lat}, ${data.lon}`;

        // TRUC: Folosim codul țării (ex: RO) pentru a lua steagul dintr-un alt API
        // Asta rezolvă cerința "Media/Imagine"
        flagImg.src = `https://flagsapi.com/${data.countryCode}/flat/64.png`;
        
        // Afișare rezultat
        resultCard.style.display = 'block';
        statusMsg.innerText = "Localizare reușită! ✅";
        statusMsg.style.color = "#2ea043";
        
        console.log("[UI] Date afișate utilizatorului.");

    } catch (error) {
        console.error("[EROARE CRITICĂ]", error);
        statusMsg.innerText = "Eroare: " + error.message;
        statusMsg.style.color = "#da3633";
        alert("Ceva nu a mers bine. Verifică consola (F12)!");
    } finally {
        // Resetare buton indiferent de rezultat
        btn.disabled = false;
        btn.innerText = "Detectează din nou";
        console.log("[END] Proces finalizat.");
    }
}

// Atașăm funcția pe buton
btn.addEventListener('click', getIPDetails);