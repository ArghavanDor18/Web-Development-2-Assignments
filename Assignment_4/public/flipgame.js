secondCard = undefined
firstCard = undefined
cardHasBeenFlipped = false
const pokemonArray= Array(6)
for(i=0; i<6; i++){
x = Math.floor(Math.random() * 900) + 1;
pokemonArray[i]=x

}

function loadSixPokemon(){
    $("main").append(`
<div id="game_grid">
      <div class="card">
        <img id="img1" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[5]}.png" alt="" >
        <img class="back_face" src="back.jpg"  >
      </div>

      <div class="card">
        <img id="img2" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[4]}.png" alt="" >
        <img class="back_face" src="back.jpg"  >
      </div>

      <div class="card">
        <img id="img3" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[3]}.png" alt="" >
        <img class="back_face" src="back.jpg"  >
      </div>

      <div class="card">
        <img id="img4" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[2]}.png" alt="" >
        <img class="back_face" src="back.jpg"  >
      </div>

      <div class="card">
      
        <img id="img5" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[1]}.png" alt="" >
        <img class="back_face" src="back.jpg" >
      </div>

      <div class="card">
      
        <img id="img6" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[0]}.png" alt="" >
        <img class="back_face" src="back.jpg"  >
      </div>
      <div class="card">
       
        <img id="img7" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[1]}.png" alt="" >
        <img class="back_face" src="back.jpg"  >
      </div>

      <div class="card">
       
        <img id="img8" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[2]}.png" alt="" >
        <img class="back_face" src="back.jpg"  >
      </div>

      <div class="card">
       
        <img id="img9" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[3]}.png" alt="" >
        <img  class="back_face" src="back.jpg"  >
      </div>

      <div class="card">
       
        <img id="img10" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[4]}.png" alt="" >
        <img class="back_face" src="back.jpg" >
      </div>

      <div class="card">
        
        <img id="img11" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[5]}.png" alt="" >
        <img  class="back_face" src="back.jpg"  >
      </div>

      <div class="card">
       
        <img id="img12" class="front_face" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonArray[0]}.png" alt="" >
        <img  class="back_face" src="back.jpg"  >
      </div>
    </div>

    `);
}

function setup() {
    loadSixPokemon()
    $("main").on("click",".card", function () {
        
        $(this).toggleClass("flip")
     

        if (!cardHasBeenFlipped) {
            //captured first card
            firstCard = $(this).find(".front_face")[0]
             console.log(firstCard);
            cardHasBeenFlipped = true;
            //$(this).css("pointer-events", "none");
        } else {
            //$(this).css("pointer-events", "auto");
            secondCard = $(this).find(".front_face")[0]
            console.log(firstCard, secondCard);
            cardHasBeenFlipped = false;
        }
            // check if you have match
            if (
                $(`#${firstCard.id}`).attr("src")
                ==
                $(`#${secondCard.id}`).attr("src")
            ) {
                console.log("A Match!");
                $(`#${firstCard.id}`).parent().off("click");
                $(`#${secondCard.id}`).parent().off("click");
                
                
                //cardHasBeenFlipped = false;
            } else {
                
                console.log("not a Match!");
                setTimeout(() => {
                    $(`#${firstCard.id}`).parent().removeClass("flip");
                    $(`#${secondCard.id}`).parent().removeClass("flip");
                    
                }, 500);
                

            }
        }
       
      //  pokemonArray()

    );
        // reset 
        // firstCard = undefined
        // secondCard = undefined

}


$(document).ready(setup)