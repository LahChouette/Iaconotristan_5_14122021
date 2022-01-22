function confirmation(){
    const url = new URL(location.href).searchParams.get("id")
    const commandeId = document.getElementById("orderId");
    commandeId.innerText = url;
    console.log(url);
}
confirmation();