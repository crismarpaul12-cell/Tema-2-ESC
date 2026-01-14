// URL-ul API-ului extern
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Selectăm elementele din HTML
const container = document.getElementById('posts-container');
const loadBtn = document.getElementById('load-data-btn');
const statusMsg = document.getElementById('status-message');

// Funcție pentru a prelua datele (Fetch)
async function fetchPosts() {
    // 1. Monitorizare: Anunțăm în consolă că începe procesul
    console.log("[START] Începe cererea către API...");
    statusMsg.innerText = "Se încarcă datele...";

    try {
        const response = await fetch(API_URL);

        // 2. Debugging: Verificăm dacă răspunsul e OK
        console.log(`[STATUS] Răspuns server: ${response.status}`);
        
        if (!response.ok) {
            throw new Error(`Eroare HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // 3. Monitorizare: Vedem câte date am primit
        console.log(`[SUCCES] Am primit ${data.length} postări.`);
        
        // Afișăm doar primele 10 postări pentru claritate
        renderPosts(data.slice(0, 10));
        statusMsg.innerText = "Date încărcate cu succes!";

    } catch (error) {
        // 4. Debugging: Prindem și afișăm orice eroare
        console.error("[EROARE CRITICĂ]", error);
        statusMsg.innerText = "A apărut o eroare la încărcare.";
        statusMsg.style.color = "red";
    }
}

// Funcție pentru afișarea datelor în pagină
function renderPosts(posts) {
    container.innerHTML = ''; // Curățăm containerul
    
    posts.forEach(post => {
        // Creăm elementul vizual pentru fiecare postare
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        container.appendChild(card);
    });
    
    console.log("[UI] Interfața a fost actualizată.");
}

// Atașăm evenimentul pe buton
loadBtn.addEventListener('click', fetchPosts);

console.log("[INIT] Aplicația este gata.");