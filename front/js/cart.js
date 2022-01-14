let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));

function getPanier(){
    
  // Produit du Panier //
  const element2 = document.querySelector("#cart__items");
  let structurePanier = [];

  // Récupération du prix total//
  let affichePrixTotal = document.getElementById('totalPrice');
  let prixtotal = []

  // Récupération quantité total //
  let affichequantiteTotal = document.getElementById('totalQuantity');
  let qtttotal = [];
  
  // si le panier est vide //
   
    if (produitLocalStorage === null){


    } else {
      
      // affiche le panier si il n'est pas vide //
        for (i = 0; i < produitLocalStorage.length; i++){
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
            // récupération des prix et quantité dans le panier et injecte dans prixtotal et qtttotal // 
            let prixProduit = produitLocalStorage[i].prix;
            prixtotal.push(prixProduit);
            let quantitepanier = Number(produitLocalStorage[i].quantite);
            qtttotal.push(quantitepanier);
        }
          // addition des prix et quantité total //
          const prixTotals = prixtotal.reduce((acc, cur) => acc + cur);
          const quantitetotal = qtttotal.reduce((acc, cur) => acc + cur);


        // insertion html dans la page panier //
        if (i === produitLocalStorage.length){
            element2.innerHTML = structurePanier;
            affichePrixTotal.innerHTML = prixTotals;
            affichequantiteTotal.innerHTML = quantitetotal;
        }
    }
}
getPanier();

/*function getTotal(){
  // Récupération du prix total//
  let prixtotal = []

  for (let p = 0; p < produitLocalStorage.length; p++){
      let prixProduit = produitLocalStorage[p].prix;

      prixtotal.push(prixProduit)
  }
  // addition //
  const prixTotals = prixtotal.reduce((acc, cur) => acc + cur);
  
  // injection prix total dans page panier //
  let affichePrixTotal = document.getElementById('totalPrice');
  affichePrixTotal.innerHTML = prixTotals
  
  // Récupération quantité total //
  let qtttotal = [];

  for (let q = 0; q < produitLocalStorage.length; q++){
    let quantitepanier = Number(produitLocalStorage[q].quantite);
    
    qtttotal.push(quantitepanier);
  }
  // addition //
  const quantitetotal = qtttotal.reduce((acc, cur) => acc + cur);

  // injection quantité total dans page panier //
  let affichequantiteTotal = document.getElementById('totalQuantity');
  affichequantiteTotal.innerHTML = quantitetotal 
}
getTotal(); */

function supprimeProduit(){
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < btn_supprimer.length; k++){
      btn_supprimer[k].addEventListener("click", (event) => {


          let article = event.target.closest('article')

          // Selection de l'element a supprimer //
          // let idSupprime = produitLocalStorage[k].id;
          // let couleurSupprime = produitLocalStorage[k].couleur;

          let idSupprime = article.dataset.id
          let couleurSupprime = article.dataset.color

          // Selectionne les elements a garder et supprime l'élément selectionné avec le bouton //
          produitLocalStorage = produitLocalStorage.filter( el => el.id !== idSupprime || el.couleur !== couleurSupprime );

          localStorage.setItem("panier", JSON.stringify(produitLocalStorage));
          
          // message quand on supprime un element //
          article.remove()
          alert("Ce produit a bien été supprimé du panier");
          
          
          // permet de recharger la page //
          // location.reload();
      })
  }
}
supprimeProduit();