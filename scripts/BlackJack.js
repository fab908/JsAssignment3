//document.getElementById(cards[i]).setAttribute() FOR PICTURES LATER ON
// storing the card values in an array 
var cards = [
    ["A", 1, 11],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["10", 10],
    ["J", 10],
    ["Q", 10],
    ["K", 10]
];
var playerScore = 0;
var dealerScore = 0;
var playerBalance = prompt("Enter a balance");
var betPlaced = 0;
var quit = false;
runGame();
function runGame(){
        startRound();
}
function startRound(){
    playerScore = 0;
    dealerScore = 0;
    betPlaced = 0;
    betPlaced = prompt("Place a bet: ");
    document.getElementById("playerCards").innerHTML = "";
    document.getElementById("dealerCards").innerHTML = "";
    document.getElementById("playerScore").innerHTML = "";
    document.getElementById("results").innerHTML = "";
    // if the player placed a bet
    if(betPlaced >= 0) {
        playerBalance = playerBalance - betPlaced;
        // displaying the player balance
        document.getElementById("playerBalance").innerHTML = "$" + playerBalance;
        initializeGame();
    }
}
function initializeGame(){
        // initializing the first 2 cards for dealer and player
        for(var i = 0; i <= 3; i++){
            // selecting a random number between the length of the array holding the card values
            var cardSelector = Math.floor(Math.random() * 14);
            // if it's for the player
            if(i == 2 || i == 3){
                // update the players score
                playerScore += (cards[cardSelector][1]);
                // display the cards given
                document.getElementById("playerCards").innerHTML += "<p>" + cards[cardSelector][0] + "</p>";
            }else{
                // update the dealers score
                dealerScore += (cards[cardSelector][1]);
                //display the cards given
                document.getElementById("dealerCards").innerHTML += "<p>" + cards[cardSelector][0] + "</p>";
            }

        }
    document.getElementById("playerOptions").innerHTML = "<button>Double</button>" +
        "<button onclick='dealerMove()'>Stand</button>" +
        "<button onclick='hit()'>Hit</button>" +
        "<button onclick='startRound()'>Play Again</button>"+
        "<a href='index.html'>Quit</a>";

        document.getElementById("playerScore").innerHTML += "<p>Your Score: " + playerScore + "</p>";
        document.getElementById("dealerScore").innerHTML = "Score: " + dealerScore;
}
function hit(){
    var cardSelector = Math.floor(Math.random() * 14);
    playerScore += (cards[cardSelector][1]);
    document.getElementById("playerCards").innerHTML += "<p>" + cards[cardSelector][0] + "</p>";
    document.getElementById("playerScore").innerHTML = "<p>Your Score: " + playerScore + "</p>";
    if(playerScore >= 21){
        checkRules();
    }
}
function over(){
    if(playerScore > 21){

    }
}
function dealerMove(){
    while(dealerScore < playerScore){
        if(dealerScore == playerScore){
            break;
        }
        var cardSelector = Math.floor(Math.random() * 14);
        dealerScore += (cards[cardSelector][1]);
        document.getElementById("dealerCards").innerHTML += "<p>" + cards[cardSelector][0] + "</p>";
        document.getElementById("dealerScore").innerHTML = "<p>Your Score: " + dealerScore + "</p>";
    }
    checkRules();

}
function checkRules(){
    // if the player busted
    if(playerScore > 21){
        document.getElementById("results").innerHTML += "<h1>Dealer Won. You Lost: $ " + betPlaced + "</h1>";
    }
    // if the dealer busted
    else if(dealerScore > 21){
        document.getElementById("results").innerHTML += "<h1>Dealer busted! You won: $" + (betPlaced*2) + "</h1>";
        playerBalance += (betPlaced*2);
    }
    // if the dealer is more than the players score & is 21 or below the dealer wont
    else if(dealerScore > playerScore && dealerScore <= 21){
        document.getElementById("results").innerHTML += "<h1>Dealer Won. You lost $" + betPlaced + "</h1>";
    }
    else if(playerScore == 21){
        dealerMove();
    }
    // if the playerscore is more than the dealers, and the player didnt bust they won
    else if(playerScore > dealerScore && playerScore <= 21){
        document.getElementById("results").innerHTML += "<h1>You Won. Winnings: $" + (betPlaced*2) + "</h1>";
        playerBalance += (betPlaced*2);
    }
    // if there was a tie
    else if(playerScore == dealerScore){
        document.getElementById("results").innerHTML += "<h1>Tie! Returned: $" + betPlaced + "</h1>";
        playerBalance += betPlaced;
    }
    //betPlaced = 0;
}

