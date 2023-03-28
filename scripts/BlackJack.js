//document.getElementById(cards[i]).setAttribute() FOR PICTURES LATER ON
// storing the card values in an array 
var cards = [
    ["./img/ace_of_clubs.png", 1, 11],
    ["./img/2_of_diamonds.png", 2],
    ["./img/3_of_hearts.png", 3],
    ["./img/4_of_spades.png", 4],
    ["./img/5_of_clubs.png", 5],
    ["./img/6_of_diamonds.png", 6],
    ["./img/7_of_hearts.png", 7],
    ["./img/8_of_spades.png", 8],
    ["./img/9_of_clubs.png", 9],
    ["./img/10_of_diamonds.png", 10],
    ["./img/jack_of_hearts.png", 10],
    ["./img/king_of_spades.png", 10],
    ["./img/queen_of_clubs.png", 10]
];
// creating an array to store the dealers cards so that we can flip them when the player stays
var dealersCards = [];
// path for the picture of the blank cards
var blankCards = "./img/back.png"
//player and dealers score variable
var playerScore = 0;
var dealerScore = 0;
// getting the players balance
var playerBalance = prompt("Enter a balance");
// variable to hold the players placed bet value
var betPlaced = 0;
// running the game
startRound();

function startRound(){
    // if the player is out of credits, prompt to ask for more credits
    if(playerBalance <= 0){
        playerBalance = prompt("Please add credits: ");
    }
    // reset the player and dealers score(card count)
    playerScore = 0;
    dealerScore = 0;
    // ask to place a bet
    betPlaced = prompt("Place a bet: ")*1;
    // while the bet is 0 or below, OR the placed bet is more than the players balance ask for the bet again
    while(betPlaced <=0 || betPlaced > playerBalance){
        betPlaced = prompt("Place a bet: ")*1;
    }
    // resetting the cards, score, and results
    document.getElementById("playerCards").innerHTML = "";
    document.getElementById("dealerCards").innerHTML = "";
    document.getElementById("playerScore").innerHTML = "";
    document.getElementById("results").innerHTML = "";
    // subtracting the players bet from the balance
    playerBalance -= betPlaced;
    // displaying the player balance
    document.getElementById("playerBalance").innerHTML = "$" + playerBalance;
    //initializing the game
    initializeGame();
}
function initializeGame(){
    // clearing the dealers score
    document.getElementById("dealerScore").innerHTML = "";
        // initializing the first 2 cards for dealer and player
        for(var i = 0; i <= 3; i++){
            // selecting a random number between the length of the array holding the card values
            var cardSelector = Math.floor(Math.random() * 13);
            // if it's for the player
            if(i === 2 || i === 3){
                // update the players score
                playerScore += (cards[cardSelector][1]);
                // display the cards given
                document.getElementById("playerCards").innerHTML += "<img src='" + cards[cardSelector][0] + "'>";
                //document.getElementById("playerCards").innerHTML += "<p>" + cards[cardSelector][0] + "</p>";
            }else{
                // update the dealers score
                dealerScore += (cards[cardSelector][1]);
                //display the cards given
                document.getElementById("dealerCards").innerHTML += "<img src='" + blankCards + "'>";
                dealersCards[i] = cards[cardSelector][0];
            }

        }
        // giving the options for the buttons
    document.getElementById("playerOptions").innerHTML =
        "<button onclick='dealerMove()'>Stand</button>" +
        "<button onclick='hit()'>Hit</button>"+
        "<button><a href='index.html'>Quit</a></button>";

        document.getElementById("playerScore").innerHTML += "<p>Your Score: " + playerScore + "</p>";
}
function hit(){
    // when you press hit it will select a card from the array at random
    var cardSelector = Math.floor(Math.random() * 14);
    // adding the score associated to the card
    playerScore += (cards[cardSelector][1]);
    // displaying the players newly picked up car
    document.getElementById("playerCards").innerHTML += "<img src='" + cards[cardSelector][0] + "'>";
    //document.getElementById("playerCards").innerHTML += "<p>" + cards[cardSelector][0] + "</p>";
    document.getElementById("playerScore").innerHTML = "<p>Your Score: " + playerScore + "</p>";
    // if the player breaks, check the rules
    if(playerScore > 21){
        checkRules();
    }
}

function dealerMove(){
    // taking away the turned around cards
    document.getElementById("dealerCards").innerHTML = "";
    // displaying the dealers first two cards
    document.getElementById("dealerCards").innerHTML += "<img src='" + dealersCards[0] + "'>";
    document.getElementById("dealerCards").innerHTML += "<img src='" + dealersCards[1] + "'>";
    // displaying the score
    document.getElementById("dealerScore").innerHTML = "Score: " + dealerScore;
    // if the dealers score is less than the players score it will pull a card from the 'deck'
    while(dealerScore < playerScore){
        var cardSelector = Math.floor(Math.random() * 14);
        // adding the score associated to the card
        dealerScore += (cards[cardSelector][1]);
        // updating the dealers cards and score on the website
        document.getElementById("dealerCards").innerHTML += "<img src='" + cards[cardSelector][0] + "'>";
        document.getElementById("dealerScore").innerHTML = "<p>Your Score: " + dealerScore + "</p>";

    }
    // when done, check the rules
    checkRules();

}
function checkRules(){
    document.getElementById("playerOptions").innerHTML = "<button onclick='startRound()'>Place Bet</button>" +
        "<button><a href='index.html'>Quit</a></button>";
    // if the player busted
    if(playerScore > 21){
        document.getElementById("results").innerHTML = "Dealer Won. You Lost: $ " + betPlaced ;
    }
    // if the dealer busted
    else if(dealerScore > 21){
        document.getElementById("results").innerHTML = "Dealer busted! You won: $" + (betPlaced*2);
        playerBalance += (betPlaced*2);
    }
    // if the dealer is more than the players score & is 21 or below the dealer wont
    else if(dealerScore > playerScore && dealerScore <= 21){
        document.getElementById("results").innerHTML = "Dealer Won. You lost $" + betPlaced;
    }
    // if the players score is 21, make the dealer make its next move
    else if(playerScore === 21){
        dealerMove();
    }
    // if the players score is more than the dealers, and the player didn't go over they won
    else if(playerScore > dealerScore && playerScore <= 21){
        document.getElementById("results").innerHTML = "You Won. Winnings: $" + (betPlaced*2);
        playerBalance += (betPlaced*2);
    }
    // if there was a tie
    else if(playerScore === dealerScore){
        document.getElementById("results").innerHTML = "Tie! Returned: $" + betPlaced;
        playerBalance += betPlaced*1;
    }
    // update the player balance
    document.getElementById("playerBalance").innerHTML = "$" + playerBalance;
}

