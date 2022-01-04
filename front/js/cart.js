//LocalStorage//
let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));

// Produit du Panier //

const element2 = document.querySelector("#cart__items");

function getPanier(){
    // si le panier est vide //
   
    if (produitLocalStorage === null){
        console.log("je suis vide")


    } else {

        let structurePanier = [];

        for(i = 0; i < produitLocalStorage.length; i++){
            structurePanier = structurePanier + `
            <article class="cart__item" data-id="${produitLocalStorage[i].id}" data-color="${produitLocalStorage[i].couleur}">
                <div class="cart__item__img">
                  <img src="${produitLocalStorage[i].img}" alt="Photographie d'un canapé ${produitLocalStorage[i].nom}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produitLocalStorage[i].nom}</h2>
                    <p>${produitLocalStorage[i].couleur}</p>
                    <p>${produitLocalStorage[i].prix} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :${produitLocalStorage[i].quantite}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
            `;
        }
        
        if(i === produitLocalStorage.length){
            element2.innerHTML = structurePanier;
        }
    }
}
getPanier();