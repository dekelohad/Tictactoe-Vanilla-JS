const ticTacToeGame = {

  //grabing  all the elements with the class:"square" will return a HTMLCollection,then we convert this HTMLCollection to an array using the method Array.from.
//when squareArray is the actually Game Board.
squareArray : Array.from(document.getElementsByClassName("square")),
playersMove: [],
//track the clickAmount both users clicked.
availableMoves: 9,

// gameover will tell us if the game was over or not. 
gameover : false,
   
//players score counters.
firstPlayerScore  : 0 ,
secondPlayerScore : 0,
currentPlayer: 'firstPlayer',

//start the game.
startGame()  
{
 //initialize the game.
   this.init();
   //invoke the anonymous function for each element in the squareArray.
   this.squareArray.forEach((square, index) =>
   {
      square.addEventListener("click", ()=>
       {
         //if the current square is empty and the the game was not over yet.
           if(square.textContent === '' && (!this.gameover))
           {
               this.availableMoves -- ;
               if(this.currentPlayer === 'firstPlayer'){
                 this.playersMove[index] = 'O'; 
                 this.createColorfulBox(index,'blue');
               }
               else{
                this.playersMove[index] = 'X'; 
                this.createColorfulBox(index,'red');
               }
              this.checkForWinner(this.currentPlayer);
              this.changePlayerTurn(this.currentPlayer);
           }
        });
   }); 
},
//initial function
init(){
   this.activateButtons();
   this.resetGameScore();
},
changePlayerTurn(currentPlayer){
  if(currentPlayer === 'firstPlayer'){
      this.currentPlayer = 'secondPlayer';
  }
  else{
    this.currentPlayer = 'firstPlayer';
  }
},
//create a colorful box with a sign inside it('X' or 'O') ,for each player move.
createColorfulBox(index,boxColor){
   let colorfulBox = document.createElement('div');
   let SignBox = document.createElement('span');

   if(boxColor === 'blue')
   {
       colorfulBox.classList.add('blueBox');
       SignBox.textContent = 'O' ;
       SignBox.classList.add('O');     
   }
   else{
       colorfulBox.classList.add('redBox');
       SignBox.textContent = 'X' ;
       SignBox.classList.add('X');   
   } 
       colorfulBox.appendChild(SignBox);
       this.squareArray[index].appendChild(colorfulBox); 
},
isEqualSymbol(a,b,c){
  return a == b && b == c &&  a != undefined;
},
 // check if one of the players won the current game.  
checkForWinner(currentPlayer){
  let isEqualSymbol = this.isEqualSymbol;
  let playersMove = this.playersMove;

//lines 1,2,3 check if there are 3 same symbols in a single row. 
//lines 4,5,6 check if there are 3 same symbols in a single column. 
//lines 7,8  check if there are 3 same symbols in a diagonal. 
if ((isEqualSymbol(playersMove[0],playersMove[1],playersMove[2]))||
    (isEqualSymbol(playersMove[3],playersMove[4],playersMove[5]))||
    (isEqualSymbol(playersMove[6],playersMove[7],playersMove[8]))||
    (isEqualSymbol(playersMove[0],playersMove[3],playersMove[6]))||
    (isEqualSymbol(playersMove[1],playersMove[4],playersMove[7]))||
    (isEqualSymbol(playersMove[2],playersMove[5],playersMove[8]))||
    (isEqualSymbol(playersMove[0],playersMove[4],playersMove[8]))||
    (isEqualSymbol(playersMove[2],playersMove[4],playersMove[6])))
      {
        this.gameover = true;
        this.updateGameScore(currentPlayer); 
      }
          
//if all squares were clicked and we haven't found a winner yet,then we have  a draw.
  if(this.availableMoves === 0 && !(this.gameover) ){
      this.updateGameScore('draw'); 
  }
},
// update the screen players score. 
updateGameScore(currentPlayer){
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const resetButtons = document.getElementsByClassName('buttonsDiv')[0];

if(currentPlayer === 'firstPlayer'){
    this.firstPlayerScore ++ ;
    firstPlayerScoreValue.textContent  = this.firstPlayerScore;
    winningMessageTextElement.innerText = "O Player Won";
    winningMessageElement.classList.add('winning-message-O');
}
else if(currentPlayer === 'secondPlayer'){
   this.secondPlayerScore ++ ;
   secondPlayerScoreValue.textContent  = this.secondPlayerScore;
   winningMessageTextElement.innerText = "X Player Won";
   winningMessageElement.classList.add('winning-message-X');
   }
else{
  winningMessageTextElement.innerText = "We Have A Draw";
  winningMessageElement.classList.add('winning-message-draw');
}
setTimeout(function() {
  winningMessageElement.classList.add('show');
  resetButtons.classList.add('buttons-hide');
},500);
setTimeout(function() {
  winningMessageElement.classList.remove('show');
  resetButtons.classList.remove('buttons-hide');
},1500);
},

//delete all the colorful boxes that are currently displayed on the screen.
deleteColorfulBoxes(){
//setting the textContent of each square to empty string.
this.squareArray.forEach(function(sqaure){
 sqaure.textContent = '';
 });
},

//reset players score.
resetGameScore(){
    //reset player score stats
    ticTacToeGame.firstPlayerScore =  0 ;
    ticTacToeGame.secondPlayerScore = 0 ;

//update the screen,players score will be 0.
document.getElementById("firstPlayerScoreValue").textContent = 0;
document.getElementById("secondPlayerScoreValue").textContent = 0;
},
 
//Reset the the game board.
resetGameBoard(){
 ticTacToeGame.playersMove.length  = 0;
 ticTacToeGame.currentPlayer ='firstPlayer';
 ticTacToeGame.availableMoves = 9 ;
 ticTacToeGame.gameover = false;   
 ticTacToeGame.deleteColorfulBoxes();
},

//activate the buttons we have created = with HTML.
activateButtons(){
   let newGameButton = document.getElementById('newGame');
   newGameButton.addEventListener('click',this.resetGameBoard);

   let resetPlayersScore = document.getElementById('resetScore');
   resetPlayersScore.addEventListener('click',this.resetGameScore);
},
}

//invoke the startGame function,by invoking the function the game starts.
ticTacToeGame.startGame();
