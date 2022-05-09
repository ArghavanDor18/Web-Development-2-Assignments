//const req = require("express/lib/request")

type_g = ""
to_add = ""
//region_g = ""
function processPokemonResp(data){
    
    for (i = 0 ; i < data.types.length; i++){  // for (x in data.types)
        if (data.types[i].type.name == type_g)
            
            to_add += `${data.species.name}
            <div class= "images" style="backgroundColor: "green">
            <p> id = ${data.id} </p>
            <p> abilities = ${data.abilities[0].ability.name} </p>
            <p> <img src="${data.sprites.other["official-artwork"].front_default}"> </p>
            </div>`
        
           
        
        }
        jQuery("main").append(to_add)
         //    $("main").append(img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/<%= id %>.png")
}   

//function processPokemonResp_2(data){

    //console.log(data.pokemon.length)
    //for (i = 0 ; i < data.name.length; i++)  // for (x in data.types)
     //   if (data.name == region_g)
      //    reegion_g = data.name
            
       // console.log(data.pokemon[0].pokemon.name)
//}

function display(type_){
    $("main").empty()
    type_g = type_
    for(i = 1 ; i < 100; i++){
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokemonResp
        })
    }

}
//function display(id_){
    //$("main").empty()
    //id_g = id_
    //for(i = 1; i < 100; i++){
        //$.ajax({
            //type: "get",
            //url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            //success: processPokemonResp
        //})
    //}
//}

//function display(region_){
  //  $("main").empty()
    //reegion_g = region_
    //for(i = 1 ; i < 9; i++){
      //  $.ajax({
       //     type: "get",
        //    url: `https://pokeapi.co/api/v2/region/${i}`,
           // success: processPokemonResp_2
       // })
    //}
//}

function setup(){
    // display all the grass pokemon
    display($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        poke_type  = $("#poke_type option:selected").val();
        display($("#poke_type option:selected").val())
    })
   // display($("#poke_region option:selected").val())
   // $("#poke_region").change(() => {
   //     poke_region  = $("#poke_region option:selected").val();
    //    display($("#poke_region option:selected").val())
   // })
}


$(document).ready(setup) 