// Configuration de l'API
const API_URL = 'http://localhost:8000/api';

// État global de l'application
let plats = [];
let selectedPlat = null;

// Liste des plats (catégories, noms, images, prix)
const platsData = [
  // Marocains
  { id: 101, categorie: 'Marocain', nom: 'Couscous Royal', prix: 80, image: 'Couscous marocain.jpeg' },
  { id: 102, categorie: 'Marocain', nom: 'Harira Traditionnelle', prix: 35, image: 'Harira.jpeg' },
  { id: 103, categorie: 'Marocain', nom: 'Tajine Kefta', prix: 65, image: 'TagineKefta.jpeg' },
  { id: 104, categorie: 'Marocain', nom: "Tajine d'Agneau aux Pruneaux", prix: 95, image: "Tajine marocain d'agneau aux pruneaux.jpeg" },
  { id: 105, categorie: 'Marocain', nom: 'Tajine de Poulet Citron', prix: 70, image: 'Tajine de poulet marocain.jpeg' },
  { id: 106, categorie: 'Marocain', nom: 'Saffa Sucrée', prix: 50, image: 'Saffa.jpeg' },
  // Indiens
  { id: 201, categorie: 'Indien', nom: 'Poulet Tikka Masala', prix: 75, image: 'india2.jpeg' },
  { id: 202, categorie: 'Indien', nom: 'Curry Végétarien', prix: 60, image: 'india3.jpeg' },
  { id: 203, categorie: 'Indien', nom: 'Mapo Paneer', prix: 68, image: 'Vegan-Mapo-Tofu-500x500.jpg' },
  // Italiens
  { id: 301, categorie: 'Italien', nom: 'Pizza Margherita', prix: 55, image: 'margherita.jpeg' },
  { id: 302, categorie: 'Italien', nom: 'Lasagnes Maison', prix: 70, image: 'Lasagnes.jpeg' },
  { id: 303, categorie: 'Italien', nom: 'Spaghetti Carbonara', prix: 60, image: 'Spaghetti.jpeg' },
  { id: 304, categorie: 'Italien', nom: 'Pizza Quattro Stagioni', prix: 65, image: 'quatresta.avif' },
  { id: 305, categorie: 'Italien', nom: 'Risotto aux Champignons', prix: 72, image: '8723-v2.jpg' },
  { id: 306, categorie: 'Italien', nom: 'Penne Arrabiata', prix: 58, image: 'penne.jpg' },
];

let panier = [];

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

function afficherPlats() {
  const categories = ['Marocain', 'Indien', 'Italien'];
  const menuDiv = document.getElementById('menu-sections');
  menuDiv.innerHTML = '';
  categories.forEach(cat => {
    const platsCat = platsData.filter(p => p.categorie === cat);
    if (platsCat.length === 0) return;
    const section = document.createElement('section');
    section.className = 'categorie-section';
    section.innerHTML = `<h2>${cat === 'Marocain' ? 'Plats Marocains' : cat === 'Indien' ? 'Plats Indiens' : 'Plats Italiens'}</h2>`;
    const grid = document.createElement('div');
    grid.className = 'plats-grid';
    platsCat.forEach((plat, idx) => {
      const card = document.createElement('div');
      card.className = 'plat-card';
      const img = document.createElement('img');
      img.src = `images/${plat.image}`;
      img.alt = plat.nom;
      img.onerror = function() { this.src = 'images/placeholder.jpg'; this.alt = 'placeholder'; };
      card.appendChild(img);
      card.innerHTML += `
        <div class="plat-nom">${plat.nom}</div>
        <div class="plat-prix">${plat.prix} DH</div>
        <button class="add-btn" onclick="ajouterAuPanier(${platsData.indexOf(plat)})">+</button>
      `;
      grid.appendChild(card);
    });
    section.appendChild(grid);
    menuDiv.appendChild(section);
  });
}

window.ajouterAuPanier = function(idx) {
  const plat = platsData[idx];
  const exist = panier.find(p => p.nom === plat.nom);
  if (exist) {
    exist.qte++;
  } else {
    panier.push({ ...plat, qte: 1 });
  }
  afficherNotif(`${plat.nom} ajouté au panier !`);
  majCompteurPanier();
}

function afficherNotif(msg) {
  let notif = document.getElementById('notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notif';
    notif.className = 'notif';
    document.body.appendChild(notif);
  }
  notif.textContent = msg;
  notif.style.display = 'block';
  setTimeout(() => notif.style.display = 'none', 1500);
}

function majCompteurPanier() {
  const badge = document.getElementById('panier-badge');
  const total = panier.reduce((sum, p) => sum + p.qte, 0);
  badge.textContent = total > 0 ? total : '';
}

function afficherPagePanier() {
  document.getElementById('accueil').style.display = 'none';
  document.getElementById('panier-page').style.display = 'block';
  afficherContenuPanier();
}

function afficherPageAccueil() {
  document.getElementById('panier-page').style.display = 'none';
  document.getElementById('accueil').style.display = 'block';
}

function afficherContenuPanier() {
  const panierDiv = document.getElementById('panier-contenu');
  panierDiv.innerHTML = '';
  if (panier.length === 0) {
    panierDiv.innerHTML = '<p>Votre panier est vide.</p>';
    return;
  }
  panier.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'panier-item';
    div.innerHTML = `
      <span>${item.nom} x${item.qte} - ${item.prix * item.qte} DH</span>
      <button onclick="supprimerDuPanier(${idx})">Supprimer</button>
    `;
    panierDiv.appendChild(div);
  });
  const total = panier.reduce((sum, p) => sum + p.prix * p.qte, 0);
  const totalDiv = document.createElement('div');
  totalDiv.className = 'panier-total';
  totalDiv.innerHTML = `<b>Total : ${total} DH</b>`;
  panierDiv.appendChild(totalDiv);
}

window.supprimerDuPanier = function(idx) {
  panier.splice(idx, 1);
  afficherContenuPanier();
  majCompteurPanier();
}

// Navigation
window.onload = () => {
  afficherPlats();
  majCompteurPanier();
  document.getElementById('btn-panier').onclick = afficherPagePanier;
  document.getElementById('btn-accueil').onclick = afficherPageAccueil;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadPlats();
    document.getElementById('close-modal').onclick = closeModal;
    document.getElementById('order-form').onsubmit = placeOrder;
});

// Gestion du formulaire de commande
const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.onsubmit = async function(e) {
    e.preventDefault();
    if (panier.length === 0) {
      afficherNotif('Votre panier est vide.');
      return;
    }
    const nom = document.getElementById('client-nom').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const telephone = document.getElementById('client-telephone').value.trim();
    const adresse = document.getElementById('client-adresse').value.trim();
    if (!nom || !email || !telephone || !adresse) {
      afficherNotif('Veuillez remplir tous les champs.');
      return;
    }
    try {
      const response = await fetch('api/order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: panier.map(p => ({ id: p.id, nom: p.nom, prix: p.prix, quantity: p.qte })),
          client: { nom, email, telephone, adresse }
        })
      });
      const data = await response.json();
      if (data.success) {
        afficherNotif('Votre commande a bien été enregistrée !');
        panier = [];
        afficherContenuPanier();
        majCompteurPanier();
        orderForm.reset();
      } else {
        afficherNotif('Erreur lors de la commande : ' + data.message);
      }
    } catch (error) {
      afficherNotif('Erreur lors de la commande.');
    }
  }
} 