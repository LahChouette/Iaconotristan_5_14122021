(async function() {
    const articleId = getArticleId()
    getArticle(articleId)
})()

// permet de récupéré l'ID du produit. //
function getArticleId() {
    return new URL(location.href).searchParams.get("id")
}

// ajout des élément de l'API demandé, image, titre, prix, description et couleur + ajout événement bouton panier //
function getArticle(articleId) {
    fetch(`http://localhost:3000/api/products/${articleId}`)
    .then(reponse => reponse.json())
    .then(article => {
        console.table(article)
        
        let element = document.querySelector(".item");
        
        //element image, titre, prix, description, couleurs//
        element.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${article.imageUrl}" alt="Photo d'un canapé ${article.name}">`);
        
        element.querySelector("#title").insertAdjacentHTML("afterbegin", article.name);

        element.querySelector("#price").insertAdjacentHTML("afterbegin", article.price);
    
        element.querySelector("#description").insertAdjacentHTML("afterbegin", article.description);

        element.querySelector("#colors").insertAdjacentHTML("beforeend", article.colors.map(color => `<option value="${color}">${color}</option>`));

        //event bouton panier//
        document.querySelector("#addToCart").addEventListener("click", (event)=> {
        
        event.preventDefault();
        
        let optionsProduit = {
            Produit: article.name,
            prix: article.price,
        }
console.log(optionsProduit);
        })
    })
    .catch(err => console.log(err))
}