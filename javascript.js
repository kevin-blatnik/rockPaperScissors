var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

//on scroll, let the interval function know the user has scrolled
$(window).scroll(function(event){
    didScroll = true;
});

// run hasScrolled() and reset didScroll status
setInterval(function() {
    if(didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    navbarHeight = $('header').outerHeight();

    //Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    //If current position > last position AND scrolled past navbar...
    if ( st > lastScrollTop && st > navbarHeight){

        //Scroll Down
        $('header').removeClass('navDown').addClass('navUp');       
    } else {

        //Scroll Up
        //If did not scroll past the document (possible on mac)...

        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('navUp').addClass('navDown');
        }

        lastScrollTop = st;
    }
}

var playerFrame = document.getElementById("playerImage");
var aiFrame = document.getElementById("aiImage");
var isPlayerMove = true;
var playerChoice = null;
var aiChoice = null;
var turn = 1;
var randTurn = 0;
var playerScore = 0;
var aiScore = 0;

// RNG - 100 numbers to be modded by 3
const array = new Uint32Array(100);
self.crypto.getRandomValues(array);

//These 3 Events will run the game
document.getElementById("btnRock").addEventListener('click', function() {
    if(isPlayerMove) {
        chooseBlank(aiFrame);
        playerChoice = 0;
        isPlayerMove = false;
        chooseRock(playerFrame);
        aiMove();
        compareMoves(playerChoice, aiChoice);
    }
});
document.getElementById("btnPaper").addEventListener('click', function() {
    if(isPlayerMove) {
        chooseBlank(aiFrame);
        playerChoice = 1;
        isPlayerMove = false;
        choosePaper(playerFrame);
        aiMove();
        compareMoves(playerChoice, aiChoice);
    }
});
document.getElementById("btnScissors").addEventListener('click', function() {
    if(isPlayerMove) {
        chooseBlank(aiFrame);
        playerChoice = 2;
        isPlayerMove = false;
        chooseScissors(playerFrame);
        aiMove();
        compareMoves(playerChoice, aiChoice);
    }
});

const pause = async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(5000);
    console.log("Waited 5s");
};

function aiMove() {
    var move = array[randTurn] % 3;
    aiChoice = move;
    switch(move) {
        case 0:
            chooseRock(aiFrame);
            aiChoice = 0;
            break;
        case 1:
            choosePaper(aiFrame);
            aiChoice = 1;
            break;
        case 2:
            chooseScissors(aiFrame);
            aiChoice = 2;
    }
    randTurn += 1;
    isPlayerMove = true;
}

function chooseRock(frame) {
    frame.setAttribute('src', './images/pexels-pixabay-161702.jpg')
}
function choosePaper(frame) {
    frame.setAttribute('src', 'images/pexels-matreding-6672292.jpg')
}
function chooseScissors(frame) {
    frame.setAttribute('src', 'images/pexels-jessbaileydesign-755991.jpg')
}
function chooseBlank(frame) {
    frame.setAttribute('src', '')
}

function compareMoves(player, ai) {
    var diff = ( player - ai + 3 ) % 3;

    console.log(player + " " + ai + " " + diff);
    switch(diff) {
        case 0: //push
            //add push action
            document.getElementById("warningTrack").textContent = "Push...";
            console.log('push!');
            break;
        case 1: //player win
            //update scoreboard
            playerScore++;
            updateScoreboard(true);
            //announce round win
            document.getElementById("warningTrack").textContent = moveToString(player) + " beats " + moveToString(ai) + " ... Player wins round!";
            turn++;
            checkEndGame();
            break;
        case 2: //AI win
            //update scoreboard
            aiScore++;
            updateScoreboard(false);
            //announce round win
            document.getElementById("warningTrack").textContent = moveToString(ai) + " beats " + moveToString(player) + " ... AI wins round!";
            turn++;
            checkEndGame();
            break;
    }
}

function moveToString(move) {
    var strMovesArray = ['Rock', 'Paper', 'Scissors'];
    if(move < 0 || move > 2)
        return -1;
    else
        return strMovesArray[move];
}

function updateScoreboard(didPlayerWin) {
    if(didPlayerWin) {
        //Update Inning
        document.getElementById("sb" + turn).textContent = 1;
        document.getElementById("sb2" + turn).textContent = 0;
        //Update Player Score
        document.getElementById("sbR").textContent = "" + playerScore;
    }
    else {
        //Update Inning
        document.getElementById("sb" + turn).textContent = 0;
        document.getElementById("sb2" + turn).textContent = 1;
        //Update Player Score
        document.getElementById("sb2R").textContent = "" + aiScore;
    }
}

function checkEndGame() {
    if(turn == 10) {
        //Pause game play
        document.getElementById("btnRock").disabled = true;
        document.getElementById("btnPaper").disabled = true;
        document.getElementById("btnScissors").disabled = true;

        //Prompt new game
        promptNewGame();
        resetBoard();
    }
}

function promptNewGame() {
    alert(getWinnerString() + "\n Click OK to start a new game!");
}

function getWinnerString() {
    return playerScore > aiScore ? "You won!!!" : "AI has prevailed...";
}

function resetBoard() {
    //Pause game play
    document.getElementById("btnRock").disabled = false;
    document.getElementById("btnPaper").disabled = false;
    document.getElementById("btnScissors").disabled = false;

    isPlayerMove = true;
    playerChoice = null;
    aiChoice = null;
    turn = 1;
    randTurn = 0;
    playerScore = 0;
    aiScore = 0;

    // RNG - 100 numbers to be modded by 3
    array = new Uint32Array(100);
    self.crypto.getRandomValues(array);

    //reset scoreboard
    document.getElementById("sbR").textContent = "0";
    document.getElementById("sbR").textContent = "0";
    for(var i=1; i<10; i++ ) {
        document.getElementById("sb" + i).textContent = "";
        document.getElementById("sb2" + i).textContent = "";
    }

}











