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
var dealersCards = new Array();
var blankCards = "./img/back.png"
var playerScore = 0;
var dealerScore = 0;
var playerBalance = prompt("Enter a balance");
var betPlaced = 0;
runGame();
function runGame(){
        startRound();
}
function startRound(){
    if(playerBalance <= 0){
        playerBalance = prompt("Please add credits: ");
    }
    playerScore = 0;
    dealerScore = 0;
    betPlaced = prompt("Place a bet: ")*1;


    document.getElementById("playerCards").innerHTML = "";
    document.getElementById("dealerCards").innerHTML = "";
    document.getElementById("playerScore").innerHTML = "";
    document.getElementById("results").innerHTML = "";
    // if the player placed a bet
    if(betPlaced > 0 && betPlaced <= playerBalance) {
        playerBalance = playerBalance - betPlaced;
        // displaying the player balance
        document.getElementById("playerBalance").innerHTML = "$" + playerBalance;
        initializeGame();
    }else{
        startRound();
    }
}
function initializeGame(){
    // clearing the dealers score
    document.getElementById("dealerScore").innerHTML = "";
        // initializing the first 2 cards for dealer and player
        for(var i = 0; i <= 3; i++){
            // selecting a random number between the length of the array holding the card values
            var cardSelector = Math.floor(Math.random() * 13);
            // if it's for the player
            if(i == 2 || i == 3){
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
    document.getElementById("playerOptions").innerHTML =
        "<button onclick='dealerMove()'>Stand</button>" +
        "<button onclick='hit()'>Hit</button>" +
        "<button onclick='startRound()'>Play Again</button>"+
        "<button><a href='index.html'>Quit</a></button>";

        document.getElementById("playerScore").innerHTML += "<p>Your Score: " + playerScore + "</p>";
}
function hit(){
    var cardSelector = Math.floor(Math.random() * 14);
    playerScore += (cards[cardSelector][1]);
    document.getElementById("playerCards").innerHTML += "<img src='" + cards[cardSelector][0] + "'>";
    //document.getElementById("playerCards").innerHTML += "<p>" + cards[cardSelector][0] + "</p>";
    document.getElementById("playerScore").innerHTML = "<p>Your Score: " + playerScore + "</p>";
    if(playerScore >= 21){
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
    while(dealerScore < playerScore){
        var cardSelector = Math.floor(Math.random() * 14);
        dealerScore += (cards[cardSelector][1]);
        document.getElementById("dealerCards").innerHTML += "<img src='" + cards[cardSelector][0] + "'>";
        document.getElementById("dealerScore").innerHTML = "<p>Your Score: " + dealerScore + "</p>";

    }
    checkRules();

}
function checkRules(){
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
    else if(playerScore == 21){
        dealerMove();
    }
    // if the playerscore is more than the dealers, and the player didnt bust they won
    else if(playerScore > dealerScore && playerScore <= 21){
        document.getElementById("results").innerHTML = "You Won. Winnings: $" + (betPlaced*2);
        playerBalance += (betPlaced*2);
    }
    // if there was a tie
    else if(playerScore == dealerScore){
        document.getElementById("results").innerHTML = "Tie! Returned: $" + betPlaced;
        playerBalance += betPlaced*1;
    }
    // update the player balance
    document.getElementById("playerBalance").innerHTML = "$" + playerBalance;
}

