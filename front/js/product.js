window.addEventListener('load', () => {
    const articleId = getArticleId()
    getArticle(articleId)
})



// permet de récupéré l'ID du produit //
function getArticleId() {
    return new URL(location.href).searchParams.get("id")
}

// ajout des élément de l'API demandé + ajout événement bouton panier + locastorage //
function getArticle(articleId) {
    fetch(`http://localhost:3000/api/products/${articleId}`)
    .then(reponse => reponse.json())
    .then(article => {
        console.table(article)
        
        let element = document.querySelector(".item");
        
        // element image, titre, prix, description, couleurs //
       
        element.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${article.imageUrl}" alt="Photo d'un canapé ${article.name}">`);
        /* let image = document.createElement('img')
         image.src = article.imageUrl
         image.alt = article.name
         element.querySelector(".item__img").appendChild(image)*/
        
        
        element.querySelector('#title').textContent = article.name
      
        element.querySelector('#price').textContent = article.price
        
        element.querySelector('#description').textContent = article.description
        
        element.querySelector("#colors").insertAdjacentHTML("beforeend", article.colors.map(color => `<option value="${color}">${color}</option>`));


        //event bouton panier//
        document.querySelector("#addToCart").addEventListener("click", (event)=> {
            
            // choix de l'utilisateur couleur et quantiter //
            const couleurSelect = document.querySelector("#colors").value;
            const quantiteSelect = document.querySelector("#quantity").value;

            // recuperation du formulaire //
            let optionsPanier = {
                id: article._id,
                img: article.imageUrl,
                nom: article.name,
                description: article.description,
                prix: article.price,
                couleur: couleurSelect,
                quantite: quantiteSelect,
            }


            /* let cartStorage = localStorage.getItem('panier')
            console.log(cartStorage)
             if(cartStorage == 'undefined'){
                 produitLocalStorage = []
             }else{
                 produitLocalStorage = JSON.parse(cartStorage)
             }*/
            
            // popup de confimation //
            const popupConfirmation =() =>{
                if(window.confirm(`Votre commande de ${quantiteSelect} ${article.name} ${couleurSelect} est ajoutée au panier Pour consulter votre panier, cliquez sur OK`)){
                    window.location.href ="cart.html";
                }
            }
            
            // LocalStorage //
            let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));
            
            if (produitLocalStorage) {
                
                const resultatFind = produitLocalStorage.find(
                    (i) => i.id === article._id && i.couleur === couleurSelect);
                    
                    // Si le produit commandé est déjà dans le panier //
                    if (resultatFind) {
                        let newQuantite =
                        parseInt(optionsPanier.quantite) + parseInt(resultatFind.quantite);
                        resultatFind.quantite = newQuantite;
                        localStorage.setItem("panier", JSON.stringify(produitLocalStorage));
                        console.table(produitLocalStorage);
                        popupConfirmation();
                        
                    // Si le produit commandé n'est pas dans le panier //
                    } else {
                        produitLocalStorage.push(optionsPanier);
                        localStorage.setItem("panier", JSON.stringify(produitLocalStorage));
                        console.table(produitLocalStorage);
                        popupConfirmation();
                        
                    }
                // Si le panier est vide //
            } else {
                    produitLocalStorage =[];
                    produitLocalStorage.push(optionsPanier);
                    localStorage.setItem("panier", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirmation();
            }    
        })
    })
    .catch(err => console.log(err))
}
