/**
 * Created by joelmiller on 7/14/15.
 */

var timer=0 // Update right away

// Use my interval to reset timer after function runs
function myInterval (myFunction){
    setInterval(function(){
        if (timer < 0){
            myFunction(); // If timer is less than 0, call myFunction
        }
        timer-=100;
    },100);
}


$(document).ready(function() {
    $.ajax({
        url: 'data/eta.json'
    })
    .done(function(json) {
        var counter = 11;
        //Click buttons to increase/decrease counter variable
        //Don't change counter if near beginning or end of eta object
        $('.next').on('click',function(){
            if (counter<20){
                counter +=1;
                adjustList();
            }
        });
         $('.previous').on('click',function(){
            if (counter>1){
                counter -=1;
                adjustList();
            }
        });

        //activate every 10 seconds or on button press
            myInterval(function(){
                counter+=1;
                adjustList();
            });

            //remove current names/movies and append new names/movies based on current counter
            function adjustList(){
                var person = [];
                $('p').parent().parent().remove();

                person.push(json.eta[counter-1]);
                person.push(json.eta[counter]);
                person.push(json.eta[counter+1]);

                person.slice(1,3);
                console.log(person);

                var personList = $('#person-list').html();
                var theTemplate = Handlebars.compile(personList);
                var compiledHtml = theTemplate({people: person}); //append names

                $(".people").append(compiledHtml);
                var favorites = []
                json.eta[counter].favoriteMovies.forEach(function(elem){
                    favorites.push(elem)
                });
                favorites.slice(0);
                console.log(favorites);

                var moviesList = $('#movies-list').html();
                var theTemplate = Handlebars.compile(moviesList);
                var compiledHtml = theTemplate({movies: favorites}); //append movies

                $(".movies").append(compiledHtml);

                $( ".currentPeople" ).fadeIn( "slow");
                $( ".currentPictures" ).fadeIn( "slow");
                $( ".selection" ).fadeIn( "slow");
                timer=10000; //RESET timer to 10 seconds
            };
        


    });

})
