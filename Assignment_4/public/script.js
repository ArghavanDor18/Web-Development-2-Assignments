fetch("data.js")

.then(function(response){
    return response.json();
})

.then(function(data){
    let placeholder = document.querySelector("#poke_type");
    let out = "";
})