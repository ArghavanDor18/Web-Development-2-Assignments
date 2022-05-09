to_add = ''

function processPokeResp(data){
    // 3 - process the response and extract the img
    to_add += `${data.name} 
    <div class="image_container"> 
    <a href="/profile/${data.id}"> 
    <img src="${data.sprites.other["official-artwork"].front_default}">
    </a>
    </div>`
}

async function loadNineImages() {
    to_add += `<div class="flex-container">`
    for (i = 1; i <= 9; i++) { // Nine times
        
            to_add += `<div class="images_group">`
       
        
        
    
        // 1 - generate random numbers
        x = Math.floor(Math.random() * 100) + 1
        // 2 - init a AJAX request to pokeapi.co
        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}/`,
            success: processPokeResp
        })
        
        
            to_add += `</div>`
    }
    to_add += `</div>`
    jQuery("main").append(to_add)
}

function setup() {
    loadNineImages();
    // events handlers
}

jQuery(document).ready(setup)