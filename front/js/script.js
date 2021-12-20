fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then(articles => {
        console.table(articles)

        let section = document.querySelector('#items')
        

        for(article of articles){
            console.log(article)

            section.insertAdjacentHTML('beforeend', `
            <a href="./product.html?id=${article._id}">
                <article>
                    <img src="${article.imageUrl}" alt="${article.altTxt}">
                    <h3 class="productName">${article.name}</h3>
                    <p class="productDescription">${article.description}</p>
                </article>
            </a>
            `)
        }
    })
    .catch(err => console.log(err))
