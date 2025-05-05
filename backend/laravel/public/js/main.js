// Configuration de l'API
const API_URL = 'http://localhost:8000/api';

// État global de l'application
let plats = [];
let selectedPlat = null;

// Fonction pour charger le menu depuis l'API
async function loadPlats() {
    try {
        const response = await fetch(`${API_URL}/menu.php`);
        plats = await response.json();
        displayPlats();
    } catch (error) {
        document.getElementById('plats-list').innerHTML = '<p>Erreur lors du chargement des plats.</p>';
    }
}

// Fonction pour afficher le menu
function displayPlats() {
    const platsList = document.getElementById('plats-list');
    platsList.innerHTML = '';
    if (plats.length === 0) {
        platsList.innerHTML = '<p>Aucun plat trouvé.</p>';
        return;
    }
    plats.forEach(plat => {
        const card = document.createElement('div');
        card.className = 'plat-card';
        card.innerHTML = `
            <img src="${plat.image_url ? plat.image_url : 'https://via.placeholder.com/120'}" alt="${plat.nom}">
            <div class="plat-nom">${plat.nom}</div>
            <div class="plat-desc">${plat.description}</div>
            <div class="plat-prix">${plat.prix.toFixed(2)} €</div>
            <button class="cta-button" onclick="openOrderModal(${plat.id})">Commander</button>
        `;
        platsList.appendChild(card);
    });
}

// Fonction pour ouvrir le formulaire de commande pour un plat
function openOrderModal(platId) {
    selectedPlat = plats.find(p => p.id === platId);
    if (!selectedPlat) return;
    document.getElementById('modal-plat-nom').textContent = selectedPlat.nom;
    document.getElementById('plat-id').value = selectedPlat.id;
    document.getElementById('order-form').reset();
    document.getElementById('order-modal').style.display = 'flex';
}

// Fonction pour fermer le formulaire de commande
function closeModal() {
    document.getElementById('order-modal').style.display = 'none';
}

// Fonction pour passer la commande
async function placeOrder(e) {
    e.preventDefault();
    const platId = document.getElementById('plat-id').value;
    const nom = document.getElementById('client-nom').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const telephone = document.getElementById('client-telephone').value.trim();
    const adresse = document.getElementById('client-adresse').value.trim();
    if (!nom || !email || !telephone || !adresse) {
        alert('Veuillez remplir tous les champs.');
        return;
    }
    const plat = plats.find(p => p.id == platId);
    if (!plat) {
        alert('Plat introuvable.');
        return;
    }
    try {
        const response = await fetch(`${API_URL}/order.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: [{ id: plat.id, nom: plat.nom, prix: plat.prix, quantity: 1 }],
                client: { nom, email, telephone, adresse }
            })
        });
        const data = await response.json();
        if (data.success) {
            alert('Commande enregistrée avec succès !');
            closeModal();
        } else {
            alert('Erreur lors de la commande : ' + data.message);
        }
    } catch (error) {
        alert('Erreur lors de la commande.');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadPlats();
    document.getElementById('close-modal').onclick = closeModal;
    document.getElementById('order-form').onsubmit = placeOrder;
}); 