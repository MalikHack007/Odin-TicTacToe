function newGame(){

    let player1, player2;


    function initializeGame(){
        //load the initial page
        let startingPage = 
        `    <div class="pageContentContainer">
                <h2>Tic Tac Toe</h2>
                <form action="#" method="post" id="playerInfoForm">
                    <div>
                        <div>
                            <label for="player1Name">Player One's Name:</label>
                            <input type="text" id="player1Name" name="player1Token">
                        </div>
                        <div>
                            <label for="player1Token">Select a token:</label>
                            <select name="player1Token" id="player1Token">
                                <option value="">Please Select a Token</option>
                                <option value="X">X</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                        <div>
                            <label for="player2Name">Player Two's Name:</label>
                            <input type="text" id="player2Name">
                        </div>
                        <div>
                            <label for="player2Token">Select a token:</label>
                            <select name="player2Token" id="player2Token">
                                <option value="">Please Select a Token</option>
                                <option value="X">X</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                    </div>
                    <div><button id="startNewGame" type="submit">Start Game</button></div>
                </form>
            </div>`
        
        document.body.innerHTML = startingPage;
    
        let startGameButton = document.querySelector("#startNewGame");
        startGameButton.addEventListener("click", (e)=>{
            e.preventDefault();
            console.log("executed");
            let player1Name = document.querySelector("#player1Name").value;
            let player1Token = document.querySelector("#player1Token").value;
            let player2Name = document.querySelector("#player2Name").value;
            let player2Token = document.querySelector("#player2Token").value;
            player1 = createPlayer(player1Token, player1Name);

            player2 = createPlayer(player2Token, player2Name);   
            // console.log("values read");
            this.playNewGame();
        })
    }

    function createPlayer(token, name){
        let roundsWon = 0;
        let win = false;
        let winnerOfThisRound = false;
        return {token, name, roundsWon, winnerOfThisRound, win};
    }

    function newRound(){
        let row1, row2, row3, board, playNumber, validPlay;
        function dropToken(player, row, col){
            this.validPlay = true;
            // let row = prompt("Please enter row number for your token:");
            // let col = prompt("Please enter column number for your token:");
    
            //obtain the latest input from user's click
            let rowIndex = row-1;
            let colIndex = col-1;
            //make sure player click on an unoccupied grid.
            if(this.board[rowIndex][colIndex] != 0){
                this.validPlay = false;
                return;
            }   
    
            this.board[rowIndex][colIndex] = player.token;
    
            this.playNumber++;
    
            //evaluate if somebody won
            evaluate(player, this.playNumber, rowIndex, colIndex, this.board);
    
            
        }

        function initializeRound(){
           player1.winnerOfThisRound = false;
           player2.winnerOfThisRound = false; 
           row1 = [0, 0, 0], row2 = [0, 0, 0], row3 = [0, 0, 0];
    
           this.board = [row1, row2, row3];

           this.playNumber = 0;

           document.querySelector("body").innerHTML = gamePage;
           document.querySelector("#player1Name").innerHTML = player1.name;
           document.querySelector("#player1Token").innerHTML = player1.token;
           document.querySelector("#player1WinCount").innerHTML = player1.roundsWon;
           document.querySelector("#player2Name").innerHTML = player2.name;
           document.querySelector("#player2Token").innerHTML = player2.token;
           document.querySelector("#player2WinCount").innerHTML = player2.roundsWon;
           let grids = document.querySelectorAll("td");
           //eventlistener gets the user input and calls the dropToken function for the round
           grids.forEach((grid)=>{
                   grid.addEventListener("click", (e)=>{
                       let row = e.target.getAttribute("row");
                       let col = e.target.getAttribute("col");


       
                       if(this.playNumber == 0 || this.playNumber % 2 == 0){
                           this.dropToken(player1, row, col);
                           if(player1.win == true || player2.win == true){
                            return;
                           }

                           if(this.validPlay == true){
                               e.target.innerHTML = player1.token;
                           }
                           else{
                               alert("Please place your token in an empty cell.");
                           }
                       }
               
                       else{
                           this.dropToken(player2, row, col);
                           if(player1.win == true || player2.win == true){
                            return;
                           }
                           if(this.validPlay == true){
                               e.target.innerHTML = player2.token;
                           }
                           else{
                               alert("Please place your token in an empty cell.");
                           }
                       }
           
                       if(player1.winnerOfThisRound == true || player2.winnerOfThisRound == true){
                           this.initializeRound();
                       }
                       
       
               
               
                   })
               }) 

        }
    

    
        function evaluate(player, playNumber, rowIndex, colIndex, board){
            let grids = document.querySelectorAll("td");
            //When there's been enough play for winning to be a possibility
            if (playNumber >= 5){
                //check horizontally
                if(colIndex-2 >= 0){
                    if(board[rowIndex][colIndex] == board[rowIndex][colIndex-1] && board[rowIndex][colIndex-1] == board[rowIndex][colIndex-2]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        //find the grid that has the rowIndex and colIndex
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        // player.winnerOfThisRound = true;
                        //Display who won this round
                        alert(`${player.name} has won this round!` );
                        //check if anybody won the game
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        }
                        //If no one won the game, initialize another round
                        //backend reset
                        //if so, display dialogue box to either play again, or enter new player info
                        //if play again, simply reset the two players' roundsWon values to 0
                        //if enter new player info, call loadStartingPage().
                        // console.log(`${player.name} is the winner for this round`);
                        return;
                    }
                }
    
                if(colIndex - 1 >= 0 && colIndex + 1 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex][colIndex+1] && board[rowIndex][colIndex+1] == board[rowIndex][colIndex-1]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        }
                        return;
                    }
                }
    
                if (colIndex + 2 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex][colIndex+1] && board[rowIndex][colIndex+1] == board[rowIndex][colIndex+2]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        }
                        return;
                    }
                }
                //check vertically
                if(rowIndex-2 >= 0){
                    if(board[rowIndex][colIndex] == board[rowIndex-1][colIndex] && board[rowIndex-1][colIndex] == board[rowIndex-2][colIndex]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        } 
                        return;
                    }
                }
    
                if(rowIndex - 1 >= 0 && rowIndex + 1 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex] && board[rowIndex+1][colIndex] == board[rowIndex-1][colIndex]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        } 
                        return;
                    }
                }
    
                if (rowIndex + 2 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex] && board[rowIndex+1][colIndex] == board[rowIndex+2][colIndex]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        }
                        return;
                    }
                }
    
                //check diagonally
                //one diagonal
                if(rowIndex-2 >= 0 && colIndex-2 >= 0){
                    if(board[rowIndex][colIndex] == board[rowIndex-1][colIndex-1] && board[rowIndex-1][colIndex-1] == board[rowIndex-2][colIndex-2]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        } 
                        return;
                    }
                }
    
                if(rowIndex - 1 >= 0 && colIndex - 1 >= 0 && rowIndex + 1 <= 2 && colIndex + 1 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex+1] && board[rowIndex+1][colIndex+1] == board[rowIndex-1][colIndex-1]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        }
                        return;
                    }
                }
    
                if (rowIndex + 2 <= 2 && colIndex+2 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex+1] && board[rowIndex+1][colIndex+1] == board[rowIndex+2][colIndex+2]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        }
                        return;
                    }
                }
                //the other diagonal

                if(rowIndex - 2 >= 0 && colIndex + 2 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex-1][colIndex+1] && board[rowIndex-1][colIndex+1] == board[rowIndex-2][colIndex+2]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        }
                        return;
                    }
                }

                if(rowIndex + 1 <= 2 && colIndex - 1 >= 0 && rowIndex - 1 >= 0 && colIndex + 1 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex-1] && board[rowIndex+1][colIndex-1] == board[rowIndex-1][colIndex+1]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        }
                        return;
                    }
                }

                if(rowIndex + 2 <= 2 && colIndex - 2 >= 0){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex-1] && board[rowIndex+1][colIndex-1] == board[rowIndex+2][colIndex-2]){
                        player.roundsWon++;
                        player.winnerOfThisRound = true;
                        grids.forEach((grid)=>{
                            if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                                //fill it with whoever's token
                                grid.innerHTML = player.token;
                            }
                        })
                        alert(`${player.name} has won this round!` );
                        if(player1.roundsWon == 3){
                            alert(`${player1.name} has won the game!`);
                            player1.win = true;
                            ticTacToe.initializeGame();
                        }

                        else if(player2.roundsWon == 3){
                            alert(`${Player2.name} has won the game!`);
                            player2.win = true;
                            ticTacToe.initializeGame();
                        }
                        return;
                    }
                }
            }
            //When no more play can be made
            if (playNumber == 9){
                player.winnerOfThisRound = true;
                grids.forEach((grid)=>{
                    if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                        //fill it with whoever's token
                        grid.innerHTML = player.token;
                    }
                })
                alert(`It's a tie!`);
                return;
            }
        }
    
        return {dropToken, initializeRound, playNumber, board, validPlay};
    }

    let gamePage = 
        `
            <div class="pageContentContainer2">
        <div class="playerInfo">
            <div id="player1Name"></div>
            <div id="player1Token"></div>
            <div id="player1WinCount"></div>
        </div>
        <table class="board">
            <tbody>
                <tr>
                    <td row="1" col="1"></td>
                    <td row="1" col="2"></td>
                    <td row="1" col="3"></td>
                </tr>
                <tr>
                    <td row="2" col="1"></td>
                    <td row="2" col="2"></td>
                    <td row="2" col="3"></td>
                </tr>
                <tr>
                    <td row="3" col="1"></td>
                    <td row="3" col="2"></td>
                    <td row="3" col="3"></td>
                </tr>
            </tbody>
        </table>
        <div class="playerInfo">
            <div id="player2Name"></div>
            <div id="player2Token"></div>
            <div id="player2WinCount"></div>
        </div>
    </div>
        `

    //load game page







    function playNewGame(){
    //tuck the game playing logic inside an event listener
    //however many rounds it take for a player to reach 3 wins.
    //create a new round first 
    let newRoundObject = newRound();
    newRoundObject.initializeRound();
    }



    return {player1,player2,playNewGame, initializeGame};


    //evaluate who won the most rounds to determin win, lose, or tie;
}

let ticTacToe = newGame();

ticTacToe.initializeGame();


















