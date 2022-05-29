async function init_menu() {
    $("#poke_type").empty()
    await $.ajax({
        'url': 'https://pokeapi.co/api/v2/type/',
        'type': 'get',
        'success': (data) => {
            data.results.map((obj) => {
                // $("#poke_type").append(obj.name)
                $('#poke_type').append($('<option>', {
                    value: obj.name,
                    text: obj.name
                }));
            })
        }
    })
}

async function display(type_) {
    $("main").empty()

    await $.ajax({
        type: "get",
        url: 'https://pokeapi.co/api/v2/type/',
        success: async function (data) {
            y = data.results.filter((obj) => {
                return type_ == obj.name
            })[0]
            
            index = data.results.indexOf(y)
            
            await $.ajax({
                type: "get",
                url: `https://pokeapi.co/api/v2/type/${index + 1}`,
                //var filename = 'data.js';
                //res.sendFile("data.js"),
                success: async (data) => {
                    // console.log("data")
                    var to_add = ""
                    for (i = 0; i < data.pokemon.length; i++) {
                        await $.ajax({
                            'url': `https://pokeapi.co/api/v2/pokemon/${data.pokemon[i].pokemon.name}/`,
                            'type': 'get',
                            'success': (data) => {
                                // console.log(to_add)
                                if (i % 3 == 0) {
                                    //to_add += '<div class="images">';
                                    console.log("O" + i)
                                }
                                // console.log("3")
                                
                                    to_add += `<div class="images">`
                               
                                to_add += `<a href="/profile/${data.id}"> `
                                to_add += `<img src="${data.sprites.other["official-artwork"]["front_default"]}"> `
                                // to_add += data.name
                                to_add += `</a>`
                                // to_add += `<br>`
                                to_add += `</div>`;
                                console.log("A" + i)
                                if (i % 3 == 2) {
                                    to_add += '</div>';
                                    console.log("C" + i)
                                }

                            }
                        })

                    }

                    console.log(to_add)
                    $("main").append(to_add)
                }
            })
            //res.sendFile(data.js)
        }
    })

}

function insertSearchEventToTheTimeLine(poke_type){
    //var hours = date.getHours();
   // var minutes = date.getMinutes();
   // var seconds = date.getSeconds();
   
 

   $.ajax({
        url: "http://localhost:5000/timeline/insert",
        type: "put",
        data: {
            text: `Client  has searched for ${poke_type}`,
            time: `${Date()}`,
            hits: 1
        },
        success: function(r){
            console.log(r)

        }

    })
}
function setup() {
     init_menu();
    // display all the grass pokemon
    //display($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        poke_type = $("#poke_type option:selected").val();
        //display($("#poke_type option:selected").val())
        display($("#poke_type").val())
        insertSearchEventToTheTimeLine(poke_type)
    })
}

$(document).ready(setup) 