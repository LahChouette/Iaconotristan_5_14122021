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
          const prixTotals = prixtotal.reduce((acc, cur) => acc + cur, 0);
          const quantitetotal = qtttotal.reduce((acc, cur) => acc + cur, 0);


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

function getFormulaire(){
  let formulaire = document.querySelector(".cart__order__form");
  
  // création des regexp pour validation //
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let adressRegExp = new RegExp("^[a-zA-Z0-9 ,.'-]{3,}$");
  let nomRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  
  // écouter la modification du prenom //
  formulaire.firstName.addEventListener('change', function() {
    validfirstName(this);
  });
  // Test l'expression reguliere //
  const validfirstName = function(inputfirstName) {
    let firstNameErrorMsg = inputfirstName.nextElementSibling;

    if (nomRegExp.test(inputfirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };
  // écouter la modification du nom //
  formulaire.lastName.addEventListener('change', function() {
    validlastName(this);
  });
  // Test l'expression reguliere //
  const validlastName = function(inputlastName) {
    let lastNameErrorMsg = inputlastName.nextElementSibling;
  
    if (nomRegExp.test(inputlastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };
  // écouter la modification de l'adresse //
  formulaire.address.addEventListener('change', function() {
    validaddress(this);
  });
  // Test l'expression reguliere //
  const validaddress = function(inputaddress) {
    let addressErrorMsg = inputaddress.nextElementSibling;

    if (adressRegExp.test(inputaddress.value)) {
      addressErrorMsg.innerHTML = '';
    } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };

  // écouter la modification de city //
  formulaire.city.addEventListener('change', function() {
    validcity(this);
  });
  // Test l'expression reguliere //
  const validcity = function(inputcity) {
    let cityErrorMsg = inputcity.nextElementSibling;

    if (adressRegExp.test(inputcity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
  };
  
  // écouter la modification de l'email //
  formulaire.email.addEventListener('change', function() {
    validEmail(this);
  });
  
  // Test l'expression reguliere //
  const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
  };

}
getFormulaire();

function envoyeFormulaire(){
  const btn_commander = document.getElementById("order");

  // Ecouter le panier //
  btn_commander.addEventListener("click", (event)=>{
  event.preventDefault(); 
    //Récupération des coordonnées du formulaire client
    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAdress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');
    
    // récupération du panier dans localstorage //
    let commande = produitLocalStorage;
    
    // le formulaire + les produit dans le panier //
    const order = {
      contact : {
          prénom: inputName.value,
          nom: inputLastName.value,
          addresse: inputAdress.value,
          vile: inputCity.value,
          email: inputMail.value,
      },
      produit: commande,
    }
    console.log(order);
  })
};
envoyeFormulaire();