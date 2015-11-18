require(
   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce"],  // include a custom-built library
    function () {

        console.log("Yo, I am alive!");

        //------VARIABLES---------

        //Grab the div where we will put our Raphael paper
        var centerDiv = document.getElementById("centerDiv");
        //Create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(centerDiv);
        //Put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

        //Create a nice background
        var gameOneBg = paper.image("dragonbridge.jpg",0,0,pWidth,pHeight);

        //Grab the div where we will place the introduction and instructions
        var dialogbox = document.getElementById("dialog");
        var dialogtext = document.getElementById("dialogtext");
        var button1 = document.getElementById("button1");
        var button2 = document.getElementById("button2");

        //Insert background music and options to toggle the it on and off
        var bgMusic = new Audio("backgroundmusic.wav");
        bgMusic.play();
        bgMusic.loop = true;
        var musicOff = document.getElementById("button3");
        var musicOn = document.getElementById("button4");
        musicOff.addEventListener("mouseup", function(){bgMusic.pause()});
        musicOn.addEventListener("mouseup", function(){bgMusic.play()});

        //Insert the audio sounds when the user wins, ties or loses each round.
        var winSound = new Audio("win.wav");
        var loseSound = new Audio("lose.wav");
        var tieSound = new Audio("tie.wav");

        //Insert the audio sound when the user loses the game.
        var laughSound = new Audio("laugh.wav");
        
        //Insert pictures for the game
        var scissors = paper.image("scissors.png", pWidth/5, pHeight/4, 150, 150);
        var paperChoice = paper.image("paper.png", pWidth*2/5, pHeight/4, 150, 150);
        var rock = paper.image("stone.png", pWidth*3/5, pHeight/4, 150, 150);

        var scissors2 = paper.image("scissors.png", pWidth/5, pHeight*3/5, 150, 150);
        var paperChoice2 = paper.image("paper.png", pWidth*2/5, pHeight*3/5, 150, 150);
        var rock2 = paper.image("stone.png", pWidth*3/5, pHeight*3/5, 150, 150);

        var you = paper.image("you.png", pWidth/15, pHeight/4, 150, 150);
        var giant = paper.image("giant.svg", pWidth/15, pHeight*3/5, 150, 150);

        //Insert a picture for the user to click on to move to the next round
        var next = paper.image("dragon.gif", pWidth*13/15, pHeight*7/9, 100, 100);

        //Initialize a variable for the number of rounds
        var number;

        //-------GAME START----------------

        //Opening text
        dialogtext.innerHTML="Let's begin? Click 'Yes' to continue."

        //Hide all the pictures so they do not interfere with the opening text
        scissors.hide();
        paperChoice.hide();
        rock.hide();
        scissors2.hide();
        paperChoice2.hide();
        rock2.hide();
        you.hide();
        giant.hide();
        next.hide();

        //initialize the round number [i] and result a the start of the game.
        i = 1;
        result = 0;


        //Function to start the game
        var start = function(){
        //If the user clicks 'yes'
        button1.addEventListener("mouseup", function(){
        //Let the user control the length of the game by choosing the number of rounds. 
        number = prompt("Please key in the number of rounds you would like to play, above 5.");
        var invalid  = parseInt(number);
        //If the user keys in an invalid number
        if(invalid < 5){
        alert('Sorry, but the minimum number is 5.  You cannot play less than ' + invalid + ' rounds!')
        //Reload the page for the user to start again.
        location.reload()
        };
        //Show the pictures that the user can click on  
        scissors.show();
        paperChoice.show();
        rock.show();
        you.show();
        giant.show();
        //Let the user know which round it is    
        dialog.innerHTML="Round " + i;
        //show instructions for the game
        nav.innerHTML="You have reached a bridge where the giant is. It wants to play a game of <i>Scissors Paper Stones</i> with you. <br/> <br/>Win at least 3 times to defeat it.<br/><br/>Click on the dragon to move on to the next round.";
        })
        //If the user clicks 'no'
        button2.addEventListener("mouseup", function(){
            dialog.innerHTML="Are you afraid of the challenge? Quickly leave before the giant finds you!";
        })
    }

        //Call the start function to run the game
        start();

        //Insert a restart button in the footer so that the user can change his or her mind about playing the game.
        var restart = document.getElementById("button5");
        button5.addEventListener("mouseup", function(){
         location.reload();
    });

        //Function for user to progress and finish the game
        var round = function(){
            //Indicate that the game has finished
            if (i==number){
                alert("The battle is over.")
                dialog.innerHTML="END";
                //Display the user's results 
                aside.innerHTML ="RESULT = " + result;
                //If the user wins only 0, 1 or 2 times
                if (result<3){
                    dialog.style.visibility="hidden";
                    var scary = paper.image("scary.jpg",0,0,pWidth,pHeight);
                    //Invite the user to try again
                    nav.innerHTML="You can't escape...muahahaha <br/></br></br> Click on Restart to try again."
                    setTimeout(function(){laughSound.play()},1000);
                    setTimeout(function(){scary.show()},1000);

                }
                //Remove the elements from the paper
                paperChoice.remove(); 
                rock.remove();
                scissors.remove();
                scissors2.remove();
                rock2.remove();
                paperChoice2.remove();
                next.remove(); 
            }

                //Show the user the pictures he or she can click on and hide the giant's choices.
                scissors.show();
                paperChoice.show();
                rock.show();

                scissors2.hide();
                paperChoice2.hide();
                rock2.hide();

                //Increament the round number by 1, set the number of rounds to 5 and let the user know which round it is
                i++;  
                if(i<number+1){
                dialog.innerHTML="Round " +i;  
            } 

        }
        
            //Choice 1: If the user selects scissors
            var selectscissors = function(){
            //hHde the pictures that were not chosen
            paperChoice.hide();
            rock.hide();
            userChoice = "scissors"

            //Utilise the Math.random function to generate a probability that corresponds to a picture
            var computerChoice = Math.random();
            if (computerChoice < 0.34) {
            computerChoice = "rock";
            } else if(computerChoice <= 0.67) {
            computerChoice = "paper";
            } else {
            computerChoice = "scissors";
            }

            //Use the switch function to perform different actions based on different conditions
            switch(computerChoice){
            //The expression in the switch is compared with the following values in the 3 cases. If there is a match, the code in the corresponding case is executed.
            case "scissors":
            //Send a message to the console to indicate the choices made by the user and the computer for each round
            console.log("scissors-scissors");
            //Show the corresponding choice made by the computer
            scissors2.show();
            //Tell the user the result of the round
            aside.innerHTML =" Round "+i+": TIED! <br/> YOUR WINS = " + result;
            setTimeout(function(){tieSound.play()},200);
            break;

            case "paper":
            console.log("scissors-paper");
            paperChoice2.show();
            //If the user wins, increment the result by 1
            result++;
            aside.innerHTML =" Round "+i+": YOU WIN! <br/> YOUR WINS = " + result;
            setTimeout(function(){winSound.play()},200);
            break;

            case "rock":
            console.log("scissors-rock");
            rock2.show();
            aside.innerHTML =" Round "+i+": GIANT WINS! <br/> YOUR WINS = " + result;
            setTimeout(function(){loseSound.play()},200);
            break;
            }

            //Show the next button for the user to proceed to the next round.
            next.show();
            }
            
            //Choice 2: If the user selects rock
            var selectrock = function(){
            paperChoice.hide();
            scissors.hide();
            userChoice = "rock"

            var computerChoice = Math.random();
            if (computerChoice < 0.34) {
            computerChoice = "rock";
            } else if(computerChoice <= 0.67) {
            computerChoice = "paper";
            } else {
            computerChoice = "scissors";
            }

            switch(computerChoice){
            case "scissors":
            console.log("rock-scissors");
            scissors2.show();
            result++;
            aside.innerHTML =" Round "+i+": YOU WIN! <br/> YOUR WINS = " + result;
            setTimeout(function(){winSound.play()},200);
            break;

            case "paper":
            console.log("rock-paper");
            paperChoice2.show();
            aside.innerHTML =" Round "+i+": GIANT WINS! <br/> YOUR WINS = " + result;
            setTimeout(function(){loseSound.play()},200);
            break;

            case "rock":
            console.log("rock-rock");
            rock2.show();
            aside.innerHTML =" Round "+i+": TIED! <br/> YOUR WINS = " + result;
            setTimeout(function(){tieSound.play()},200);
            break;
            }

            next.show();
            }

            //Choice 3: If the user selects paper
            var selectpaperChoice= function(){
            rock.hide();
            scissors.hide();
            userChoice = "rock"

            var computerChoice = Math.random();
            if (computerChoice < 0.34) {
            computerChoice = "rock";
            } else if(computerChoice <= 0.67) {
            computerChoice = "paper";
            } else {
            computerChoice = "scissors";
            }

            switch(computerChoice){
            case "scissors":
            console.log("paper-scissors");
            scissors2.show();
            aside.innerHTML =" Round "+i+": GIANT WINS! <br/> YOUR WINS = " + result;
            setTimeout(function(){loseSound.play()},200);
            break;

            case "paper":
            console.log("paper-paper");
            paperChoice2.show();
            aside.innerHTML =" Round "+i+": TIED! <br/> YOUR WINS = " + result;
            setTimeout(function(){tieSound.play()},200);
            break;

            case "rock":
            console.log("paper-rock");
            rock2.show();
            result++
            aside.innerHTML =" Round "+i+": YOU WIN! <br/> YOUR WINS = " + result;
            setTimeout(function(){winSound.play()},200);
            break;
            }

            next.show();
            }

            //Add event listeners to each of the icons when clicked so that the corresponding function can run
            scissors.node.addEventListener('click',selectscissors);
            rock.node.addEventListener('click',selectrock);
            paperChoice.node.addEventListener('click',selectpaperChoice);

            //Call the round function when the picture representing 'next' is clicked
            next.node.addEventListener('click',round)

});