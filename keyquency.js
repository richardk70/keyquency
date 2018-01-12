// globals
var letters = document.getElementById('letters');
var textArea = document.getElementsByTagName('textarea')[0];
let pasted = [];
const title = document.getElementsByClassName('title')[0];
var text = 'Keyquency'; 
var j = 0;

// create array of the alphabet
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
drawLetters();

// for each letter, create a label on the graph
function drawLetters(){
    letters.innerHTML = "";
    for (letter of alphabet){
        // create a label
        var label = document.createElement('div');
        label.setAttribute('class', 'label');
        label.setAttribute('id', `label${letter}`); // labela, labelb, labelc...
        var t = document.createTextNode(letter);
        label.appendChild(t);
        letters.appendChild(label);
    }
}

function removeBlocks(){
    const labels = document.getElementsByClassName('label');
    for (label of labels){
        label.innerHTML = "";
    }
}

// add an event listener to listen for keyup event
textArea.addEventListener('keyup', (e) => {
    // deal with backspace key
    if (e.keyCode == 8){
        ;
    }
    if (e.key.charCodeAt() >= 65 && e.key.charCodeAt() <= 122){
        pasted = []; 
        pasted = textArea.value.split('');
        process();
    }
});

function placeBlock(key){
    var lowered = key.toLowerCase();
    const labels = document.getElementsByClassName('label');
    for (label of labels){
        if (`label${lowered}` == label.id){
            // don't create a new block, just increase the height
            var block = document.createElement('div');
            block.setAttribute('class', 'block');
            block.setAttribute('id', 'block'+label);
            // get the length of the column
            var blockLength = label.getElementsByTagName('div').length;
            
            var blockLabel = document.createTextNode(blockLength + 1);
            block.style.height = 10 + 'px';
            block.appendChild(blockLabel);
            label.appendChild(block);    
        }  
    }
}

function clearText(){
    textArea.value = "";
    removeBlocks();
    drawLetters();
    textArea.autofocus;
}

function process(){
    // redraw the blocks every time from the string in the textArea
    removeBlocks();
    drawLetters();
    for (let i = 0; i < pasted.length; i++) {
        placeBlock(pasted[i]);
    }
}

function returnRandomNumber(){
    return Math.round(Math.random() * 500 + 100);        
}

function tap(){
    audio.currentTime = 0; // rewind to start
    audio.play();
}

var audio = document.getElementById('click');
audio.addEventListener('loadeddata', () => {
    if (audio.readyState == 4)
    typewriter();
});

function typewriter(){
    let speed = returnRandomNumber();
    if (j < text.length){
        title.innerHTML += text.charAt(j);
        tap();
        j++;
        setTimeout(typewriter, speed);
    }
}
