const ticTacToeGame = {
  //grabing  all the elements with the class:"square" will return a HTMLCollection,then we convert this HTMLCollection to an array using the method Array.from.
squareArray : Array.from(document.getElementsByClassName("square")),

//create Arrays for the 'X' and 'O' symbols so we can track each player moves.
xClickedArray : [],
oClickedArray : [],

//track the clickAmount both users clicked.
clickedAmount : 0 ,

// gameover will tell us if the game was over or not. 
gameover : false,
   
//players score counters.
firstPlayerScore  : 0 ,
secondPlayerScore : 0,

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
               this.clickedAmount ++ ;
                 if(this.isEven(this.clickedAmount)){
                     this.createColorfulBox(index,'red');
                 }
                 else{
                   this.createColorfulBox(index,'blue');
                 }
                 let currentSymbol = this.pushSymbolToArraySymbol(square,index);
                 this.checkForWinner(currentSymbol);
           }
        });
   }); 
},
//initial function
init(){
   this.activateButtons();
   this.resetGameScore();
},
isEven(number){ return number % 2 == 0;},

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
//push the current symbol to the symbol array.       
pushSymbolToArraySymbol(symbol,index)
{
   let currentSymbol = 'O' ; 

   //if element is 'X' push it to xClickedArray into the correct index and upadte the currentSymbol accordingly.   
   if(symbol.textContent === 'X'){
       this.xClickedArray[index] = 'X';
       currentSymbol = 'X' ;
   }   
   else{
       this.oClickedArray[index] = 'O';
       currentSymbol = 'O' ;
   }
   //return the last Symbol type( 'X' or 'O' symbol).
   return currentSymbol;
},
 // check if one of the players won the current game.  
checkForWinner(currentSymbol){
   let symbolArray ;

//check what is the  currentSymbol and update the symbolArray accordingly.
if(currentSymbol === 'O'){
 symbolArray = this.oClickedArray;
}
else{
symbolArray = this.xClickedArray;
}
//checking if we have a winner in the current game :
//lines 1,2,3 check if there are 3 same symbols in a single row. 
//lines 4,5,6 check if there are 3 same symbols in a single column. 
//lines 7,8   check if there are 3 same symbols in a diagonal. 
  if ((symbolArray[0] === currentSymbol && symbolArray[1] === currentSymbol && symbolArray[2] === currentSymbol)||
      (symbolArray[3] === currentSymbol && symbolArray[4] === currentSymbol && symbolArray[5] === currentSymbol)||
      (symbolArray[6] === currentSymbol && symbolArray[7] === currentSymbol && symbolArray[8] === currentSymbol)||
      (symbolArray[0] === currentSymbol && symbolArray[3] === currentSymbol && symbolArray[6] === currentSymbol)||
      (symbolArray[1] === currentSymbol && symbolArray[4] === currentSymbol && symbolArray[7] === currentSymbol)||
      (symbolArray[2] === currentSymbol && symbolArray[5] === currentSymbol && symbolArray[8] === currentSymbol)||
      (symbolArray[0] === currentSymbol && symbolArray[4] === currentSymbol && symbolArray[8] === currentSymbol)||
      (symbolArray[2] === currentSymbol && symbolArray[4] === currentSymbol && symbolArray[6] === currentSymbol))
      { 
      //We have a winner in the current game so we update the screen with the new score.
        this.gameover = true;
        this.updateGameScore(currentSymbol); 
    }
//if all squares were clicked and we haven't found a winner yet,then we have  a draw.
  if(this.clickedAmount === 9 && !(this.gameover) ){
    alert('Its a draw,keep on trying!');
  }
},
// update the screen players score. 
updateGameScore(currentSymbol){
if(currentSymbol === 'O'){
      this.firstPlayerScore ++ ;
    
//we want to first update the screen and only after the screen upadted we want to alert the message.
firstPlayerScoreValue.textContent  = this.firstPlayerScore;
setTimeout(() => {
   alert('Player 1 Won')},0);
 }
 else{
     this.secondPlayerScore ++ ;
    //we want to first update the screen and only after the screen upadted we want to alert the message.
     //set the text property of the secondPlayerScoreValue span element to be eual to the value of the secondPlayerScore.
   secondPlayerScoreValue.textContent  = this.secondPlayerScore;
   setTimeout(() => {
     alert('Player 2 Won')},0);
   }
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
 ticTacToeGame.xClickedArray.length  = 0;
 ticTacToeGame.oClickedArray.length  =  0;
 ticTacToeGame.clickedAmount = 0 ;
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
