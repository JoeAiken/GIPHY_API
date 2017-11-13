$(document).ready(function() {

    // This variable is set to an array of strings which holds all the cartoons. Set up empty variable for added cartoons from user
    var topics = ['Rick and Morty', 'Tom and Jerry', 'Regular Show', 'Ed, Edd and Eddy', 'Rockos Modern Life', 'The Simpsons', 'Family Guy'];

    // ==============================================================================================================================================

    //Function that creates button for existing cartoon array and displays to the user
    function existingCartoons() {

        //For loop to cycle through the array and create a button for each
        for (var i = 0; i < topics.length; i++) {

            // This variable is using jquery to add the button element dynamically
            var createButton = $('<button>');


            //Adding a data-name attriubte for each button in the array to the createButton variable
            createButton.attr('data-name', topics[i]);

            //Add class to each button
            createButton.addClass('cartoonButtons')

            //Add text to each button
            createButton.text(topics[i]);

            //Append these created buttons to the button list for the user to see
            $('#buttonList').append(createButton);



        }


    }

    //Calling this function to make sure buttons from array are displayed when page is loaded
    existingCartoons();


    // ===========================================================================================================================


    // This on click function is listening to any button in the documentation (either static, or dynamic made buttons) with a class of cartoonButtons and runs the following function
    $(document).on("click", ".cartoonButtons", function() {

        //This variable grabs the data-name attribute from which ever button was clicked ("this")
        var action = $(this).attr('data-name');

        // Variable that will contain our url pathway, plus add our action variable to it, for our ajax request
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            action + "&api_key=Ltl1QwDSArzE5YD2j38DReRxYlHUiYu4&limit=10";

        //Same function as above but using the param method for jquery
        // var queryURL = "https://api.giphy.com/v1/gifs/search";
        // queryURL += '?' + $.param({
        //     'q': '' + action + '',
        //     'api_key': 'Ltl1QwDSArzE5YD2j38DReRxYlHUiYu4',
        //     'limit': 10
        // });

        console.log(queryURL);

        //This jquery function , empty(), will clear our displayed gifs each time a new gif button is pressed. So gifs do not keep stacking ontop of one another
        $("#displayedGIF").empty();


        //Our ajax request
        $.ajax({
                url: queryURL,
                method: 'GET',
            })
            .done(function(response) {

                //////This done function  will set up our gifs when we click on a cartoon button. It will loop through the data object created by our ajax request.
                //If the rating of the the gif matchings our condition then the for loop will go through the our data object and set up our gifs with the correct
                //attributes we need for our desired outcome.

                //Set up variable that grabs our data object from our ajax calls "response"
                var results = response.data;


                //Our for loop that will cycle through the reponse object
                for (var i = 0; i < results.length; i++) {


                    //If a result of the of the loop has a rating of "not R" and "not PG13" then complete this function
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        //This variable creates our div which will hold all of the gifs
                        var gifDiv = $("<div>");

                        //This variable grabs the rating property from our loop
                        var rating = results[i].rating;

                        //This variable creates a paragraph element with the text to display the rating of the gif to the user
                        var p = $("<p>").text("Rating: " + rating);

                        //This variable creates an image element for ours gifs
                        var giphy = $("<img>");

                        //This adds a class to our giphy element
                        giphy.addClass('giphyClass');


                        //Lines 107-113 add attriubtes to our giphy element.
                        //These attributes reach into our loop and grabs the specified object properties we want.
                        giphy.attr("src", results[i].images.fixed_height_still.url);

                        giphy.attr('data-still', results[i].images.fixed_height_still.url)

                        giphy.attr('data-animate', results[i].images.fixed_height.url)

                        giphy.attr('data-state', 'still');

                        // We append out giphy element with all of the attributes etc we added to it to our empty gifDiv we made at first
                        gifDiv.append(giphy);
                        //Now we append out rating paragraph element to the empty div as well
                        gifDiv.append(p);

                        //Finally we take our gifDiv which contains our giphy element and rating paragraph element and posts it
                        //to our empty div with the id of displayedGIF we created in our html file
                        $('#displayedGIF').prepend(gifDiv);
                    }

                }

            });

    });


    // ======================================================================================================================================

    //This on click listens for any time we click on our displayed GIF images.

    $(document).on("click", ".giphyClass", function() {

        //This variable grabs the data-state attr. from which ever gif image is clicked
        var state = $(this).attr('data-state');

        //If the gif image data state attr (or our state var) is still then do this function
        if (state === 'still') {

            //Take the clicked image and change the src attr to that click images animate url
            $(this).attr('src', $(this).data('animate'));

            //Then change the data state attribute to animate (makes the if statement false)
            $(this).attr('data-state', 'animate')

        }
        else {

            //If the clicked image isnt still then change src attr to that images still url
            $(this).attr('src', $(this).data('still'));

            //Then change the data state to still
            $(this).attr('data-state', 'still');
        }


    })


    // =============================================================================================================================================

    //This function listens for when our add button is clicked
    $("#addButton").on("click", function(event) {

        //First we empty our button list
        $("#buttonList").empty();

        //Since our button is an input element with a type of submit we must include this
        event.preventDefault();

        //This variable takes the value, put in from our user, from our input element with an id of cartoonAdd
        var userInput = $('#cartoonAdd').val().trim();

        //We take our users input and push it into our original topics array
        topics.push(userInput);

        //We then call the function that will create our users iput into a new button
        existingCartoons();



    });

});
