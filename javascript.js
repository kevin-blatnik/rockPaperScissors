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
var isPlayerMove = true;

document.getElementById("btnRock").addEventListener('click', function() {
    if(isPlayerMove) {
        // isPlayerMove = false;
        chooseRock(playerFrame);
    }
});
document.getElementById("btnPaper").addEventListener('click', function() {
    if(isPlayerMove) {
        // isPlayerMove = false;
        choosePaper(playerFrame);
    }
});
document.getElementById("btnScissors").addEventListener('click', function() {
    if(isPlayerMove) {
        isPlayerMove = false;
        chooseScissors(playerFrame);
        pause();
        isPlayerMove = true;
    }
});
const delay = ms => new Promise(res => setTimeout(res, ms));
const pause = async () => {
    await delay(5000);
    console.log("Waited 5s");
};

function chooseRock(frame) {
    frame.setAttribute('src', './images/pexels-pixabay-161702.jpg')
}
function choosePaper(frame) {
    frame.setAttribute('src', 'images/pexels-matreding-6672292.jpg')
}
function chooseScissors(frame) {
    frame.setAttribute('src', 'images/pexels-jessbaileydesign-755991.jpg')
}