//LocalStorage//
let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));

// Produit du Panier //

const element2 = document.querySelector("#cart__items");
let structurePanier = [];


function getPanier(){
    // si le panier est vide //
   
    if (produitLocalStorage === null){
        console.log("je suis vide")


    } else {
        // affiche le panier si il n'est pas vide //
        

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
            </article>`;
        }
        // insertion html dans la page panier //
        if(i === produitLocalStorage.length){
            element2.innerHTML = structurePanier;
        }
    }
}
getPanier();


function supprimeProduit(){
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < btn_supprimer.length; k++){
      btn_supprimer[k].addEventListener("click", (event) => {
          event.preventDefault();

          // Selection de l'element a supprimer //
          let idSupprime = produitLocalStorage[k].id;
          let couleurSupprime = produitLocalStorage[k].couleur;

          // Selectionne les elements a garder et supprime l'élément selectionné avec le bouton //
          produitLocalStorage = produitLocalStorage.filter( el => el.id !== idSupprime || el.couleur !== couleurSupprime );

          localStorage.setItem("panier", JSON.stringify(produitLocalStorage));
          
          // message quand on supprime un element //
          alert("Ce produit a bien été supprimé du panier");
          
          // permet de recharger la page //
          location.reload();
      })
  }

}
supprimeProduit();