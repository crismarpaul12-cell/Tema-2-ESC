// Funcție care face totul
async function detecteazaIP() {
    const buton = document.getElementById('btn-cauta');
    const status = document.getElementById('mesaj-status');
    const zonaRezultat = document.getElementById('rezultat');

    console.log("[START] Am apăsat butonul."); // Log pentru cerință
    buton.disabled = true;
    status.innerText = "Se încarcă datele...";

    try {
        // 1. Luăm datele despre IP (API-ul tău nr 15)
        const raspuns = await fetch('http://ip-api.com/json/');
        console.log("[NETWORK] Răspuns primit de la server.");
        
        if (!raspuns.ok) throw new Error("Eroare la conexiune");

        const date = await raspuns.json();
        console.log("[DATA] Datele sunt:", date);

        // 2. Punem datele în tabel
        document.getElementById('ip').innerText = date.query;
        document.getElementById('oras').innerText = date.city;
        document.getElementById('isp').innerText = date.isp;

        // 3. Punem steagul (Truc pentru cerința de Imagine)
        document.getElementById('steag').src = `https://flagsapi.com/${date.countryCode}/flat/64.png`;

        // Afișăm totul
        zonaRezultat.style.display = 'block';
        status.innerText = "Gata!";
        console.log("[UI] Tabel actualizat.");

    } catch (eroare) {
        console.error("[EROARE]", eroare);
        status.innerText = "Ceva nu a mers bine.";
        alert("Eroare! Vezi consola (F12).");
    } finally {
        buton.disabled = false;
    }
}

// Legăm butonul de funcție
document.getElementById('btn-cauta').addEventListener('click', detecteazaIP);