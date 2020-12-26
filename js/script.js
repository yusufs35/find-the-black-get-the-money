var table = document.getElementById('table');
var totalTurn = 0;
var totalWon = 0;
var totalLost = 0;
var isTableFree = true;

var cards = [
  {color:'red', src:'img/kupa-kizi.jpg'},
  {color:'black', src:'img/maca-kizi.jpg'},
  {color:'red', src:'img/maca-kizi.jpg'},
]

prepareTable();

function prepareTable(){
  setPoints('reset');
  sortRandom();
  createCards();
}


function setPoints(type){
  var elTotalTurn = document.getElementById('totalTurn');
  var elTotalWon = document.getElementById('totalWon');
  var elTotalLost = document.getElementById('totalLost');


  if(type=='won'){
    totalTurn--;
    totalWon++;
  }
  else if(type=='lost'){
    totalTurn--;
    totalLost++;
  }
  else{
    totalLost=0;
    totalTurn=5;
    totalWon=0;
  }

  elTotalLost.innerText=totalLost;
  elTotalTurn.innerText=totalTurn;
  elTotalWon.innerText=totalWon;


}

function sortRandom(){
  cards = cards.sort(function(a,b){
    return 0.5 - Math.random();
  });
}

function createCards(){
  table.innerText = '';
  cards.forEach(function(card,index){
    var strCard = '<div class="imgCont" style="background-image:url(' + card.src + ')"><img src="img/kapak.jpg" onclick="checkCard('+index+')"/></div>';
    table.insertAdjacentHTML("beforeend",strCard);
    /*
    var elImg = document.createElement('img');
    elImg.setAttribute('src', 'img/kapak.jpg');
    elImg.setAttribute('data-index', index);
    elImg.addEventListener('click', function(){
      checkCard(index);
    });
    table.appendChild(elImg);*/
  });
}

function resetCards(){
  sortRandom();
  createCards();
  /*
  document.querySelectorAll('#table img').forEach(function(el, index){
    el.setAttribute('src', 'img/kapak.jpg');
    el.setAttribute('data-index', index);
  });
  */
}

function checkCard(index){
  if(!isTableFree) return;
  isTableFree = false;

  var selectedCard = cards[index];
  var currentCard = document.querySelector('#table div:nth-child(' + (index+1) + ') img');
  currentCard.style.marginLeft = "-50px";
  //currentCard.src = selectedCard.src;

  var rslt = "lost";
  if(selectedCard.color == 'black') {
    rslt = "won";
  }

  showResult(rslt, function(c){
    if(c){
      currentCard.style.marginLeft = "0px";
      setPoints(rslt);
      resetCards();
      isTableFree = true;
      if(totalTurn<=0){
        showResult('end');
      }
    }
  });

}

function showResult(type, callback){

  var elResult = document.getElementById('result');
  if(type=='won'){
    elResult.innerText = 'Right!';
    elResult.style.backgroundColor = '#c0e218';
  }
  else if(type=='lost'){
    elResult.innerText = 'Wrong!';
    elResult.style.backgroundColor = '#c70039';
  }
  else{
    if(totalWon>totalLost){
      elResult.innerText = 'Game over. You won!';
      elResult.style.backgroundColor = '#c0e218';
    }
    else{
      elResult.innerText = 'Game over. You lost!';
      elResult.style.backgroundColor = '#c70039';
    }
    prepareTable();

  }
  elResult.style.display = 'block';

  window.setTimeout(function(){
    elResult.style.display = 'none';
    callback(true);
  },2000);
}
