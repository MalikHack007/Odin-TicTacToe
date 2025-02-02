function newGame(){

    let player1, player2;


    function initializeGame(){
        //load the initial page
        let startingPage = 
        `
    <div class="pageContentContainer">
        <h2>Tic Tac Toe</h2>
        <form action="#" method="post" id="playerInfoForm">
            <div>
                <div class="formLine">
                    <label for="player1Name">*Player One's Name:</label>
                    <input type="text" id="player1Name" name="player1Token" class="requiredUserInput">
                    <div class="error-message"></div>
                </div>
                <div class="formLine">
                    <label for="player1Token">*Select a token:</label>
                    <select name="player1Token" id="player1Token" class="requiredUserInput">
                        <option value="">Please Select a Token</option>
                        <option value="X">X</option>
                        <option value="O">O</option>
                    </select>
                    <div class="error-message"></div>
                </div>
                <div class="formLine">
                    <label for="player2Name">*Player Two's Name:</label>
                    <input type="text" id="player2Name" class="requiredUserInput">
                    <div class="error-message"></div>
                </div>
                <div class="formLine">
                    <label for="player2Token">*Select a token:</label>
                    <select name="player2Token" id="player2Token" class="requiredUserInput">
                        <option value="">Please Select a Token</option>
                        <option value="X">X</option>
                        <option value="O">O</option>
                    </select>
                    <div class="error-message"></div>
                </div>
            </div>
            <div><button id="startNewGame" type="submit">Start Game</button></div>
        </form>
    </div>
        `

        
        document.body.innerHTML = startingPage;
    
        let startGameButton = document.querySelector("#startNewGame");
        let player1TokenField = document.querySelector("#player1Token");
        let player2TokenField = document.querySelector("#player2Token");
        let requiredInputFields = document.querySelectorAll(".requiredUserInput");
        startGameButton.addEventListener("click", (e)=>{
            e.preventDefault();

            function checkFormValidity(){
                let formIsValid = true;
                //check for empty fields
                requiredInputFields.forEach((inputField)=>{
                    if(!inputField.value){
                        inputField.classList.add('error');
                        inputField.parentElement.querySelector(".error-message").innerHTML = 
                        "This field is required."
                    }

                    else if (inputField.value){
                        //take away the 'error' class
                        inputField.classList.remove('error');
                        inputField.parentElement.querySelector('.error-message').innerHTML = "";
                    }
                })
                //make sure token fields have different values when both have been filled.
                if(player1TokenField.value == player2TokenField.value && player1TokenField.value && player2TokenField.value){
                    player1TokenField.classList.add("error");
                    player2TokenField.classList.add("error");
                    player1TokenField.parentElement.querySelector(".error-message").innerHTML = "Tokens cannot be the same.";
                    player2TokenField.parentElement.querySelector(".error-message").innerHTML = "Tokens cannot be the same.";
                }

                else if (player1TokenField.value != player2TokenField.value && player1TokenField.value && player2TokenField.value){
                    player1TokenField.classList.remove("error");
                    player2TokenField.classList.remove("error");
                    player1TokenField.parentElement.querySelector(".error-message").innerHTML = "";
                    player2TokenField.parentElement.querySelector(".error-message").innerHTML = "";
                }

                //check for error
                requiredInputFields.forEach((inputField)=>{
                    if(inputField.classList.contains('error')){
                        formIsValid = false;
                    }
                })

                return formIsValid;

            }
            
            if(checkFormValidity()){
                let player1Name = document.querySelector("#player1Name").value;
                let player1Token = document.querySelector("#player1Token").value;
                let player2Name = document.querySelector("#player2Name").value;
                let player2Token = document.querySelector("#player2Token").value;
                player1 = createPlayer(player1Token, player1Name);
    
                player2 = createPlayer(player2Token, player2Name);   
                // console.log("values read");
                this.playNewGame();
            }
        })
    }

    function createPlayer(token, name){
        let roundsWon = 0;
        let win = false;
        let winnerOfThisRound = false;
        return {token, name, roundsWon, winnerOfThisRound, win};
    }

    function newRound(){
        let row1, row2, row3, board, playNumber, validPlay, player1TokenSVG, player2TokenSVG;
        if(player1.token == "X"){
            player1TokenSVG = 
                    `
                    <div>
                        <svg
                        version="1.1"
                        id="svg2"
                        width="512.61334"
                        height="627.81335"
                        viewBox="0 0 512.61334 627.81335"
                        sodipodi:docname="X.eps"
                        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:svg="http://www.w3.org/2000/svg">
                        <defs
                            id="defs6" />
                        <sodipodi:namedview
                            id="namedview4"
                            pagecolor="#ffffff"
                            bordercolor="#000000"
                            borderopacity="0.25"
                            inkscape:showpageshadow="2"
                            inkscape:pageopacity="0.0"
                            inkscape:pagecheckerboard="0"
                            inkscape:deskcolor="#d1d1d1" />
                        <g
                            id="g8"
                            inkscape:groupmode="layer"
                            inkscape:label="ink_ext_XXXXXX"
                            transform="matrix(1.3333333,0,0,-1.3333333,0,627.81333)">
                            <g
                            id="g10"
                            transform="scale(0.1)">
                            <path
                                d="m 3387.1,4648.8 c 194.52,97.72 214,88.46 265.45,-131.2 204.69,55.88 31.73,-79.32 99.16,-209.96 49.1,-95.1 -156.46,-16.63 -154.35,-138.69 2.97,-171.71 5.31,-114.93 -1155.05,-1620.44 C 2242.98,2289.9 4057.27,1147.13 3808.28,956.191 3696.44,870.43 3985.84,726.16 3747.14,613.73 c -42.39,-19.96 -137.18,86.391 -184.92,-18.878 -70.4,-14.391 -266.81,-68.571 -379.35,73.91 -68.55,86.777 -157.49,-5.883 -604.64,502.528 -15.5,17.63 -32.28,41.62 -52.42,46.53 -205.47,50.14 -309.09,229.83 -455.26,354.82 -243.5,208.22 -162.52,316.74 -566.27,-271.39 C 1217.94,884.172 702.27,175.5 697.684,170.332 441.238,-118.961 28.9102,40.332 3.08203,74.3984 -17.8242,101.969 65.207,352.77 325.301,847.32 1275.93,2654.88 1621.44,1963.14 935.23,2736.2 c -6.32,7.12 -612.039,725.81 -689.269,805.19 -113.059,116.21 19.367,251.83 44.125,240.92 172.012,-75.82 151.746,237.33 246.441,236.83 402.508,-2.12 1167.813,-1155.09 1317.643,-953.63 84.06,113.03 254.19,266.28 272.85,294.79 547.9,837.22 515.63,570.58 573.75,693.77 117.69,249.45 20.04,134.72 424.07,514.44 142.49,133.91 166.74,193.73 262.26,80.29"
                                style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path12" />
                            </g>
                        </g>
                        </svg>
                    </div>
                    `
            
            player2TokenSVG = 
            `
                                    <div>
                            <svg class="O" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 595.28 841.89" style="enable-background:new 0 0 595.28 841.89;" xml:space="preserve">
                            <g>
                                <g>
                                    <path d="M346.99,251.23c-49.91-32.05-118.72-26.42-167.39,5.17c-48.09,31.21-79.03,80.33-98.18,133.4
                                        c-9.51,26.34-14.52,53.85-17.29,81.66c-2.79,28.02-0.78,55.6,3.32,83.39c8.06,54.73,31.72,114.61,82.92,142.2
                                        c49.07,26.44,107.19,22.65,160.05,11.96c20.17-4.08,40-9.88,59.11-17.49c22.57-8.99,44.6-19.12,64.89-32.56
                                        c39.07-25.87,74.13-60.66,94.18-103.53c6.33-13.53,12.05-27.49,15.91-41.95c4.06-15.2,6.27-31.04,7.61-46.69
                                        c2.36-27.46-0.74-55.86-7.1-82.6c-12.26-51.55-40.49-98.59-76.85-136.75c-17.88-18.77-38.33-35.25-59.62-49.97
                                        c-9.13-6.32-18.57-12.2-28.25-17.63c-12.42-6.97-25.86-13.93-39.94-16.59c-20.25-3.82-44.05-3.64-61.25,9.62
                                        c-5.54,2.98-9.98,7.06-13.33,12.23c-4.2,4.59-7.03,9.97-8.5,16.15c-3.13,11.37-1.72,26.51,4.79,36.6
                                        c6.54,10.14,16.28,19.07,28.39,21.83c11.53,2.63,26.76,2.8,36.6-4.79c1.95-1.5,3.93-2.68,6.17-3.67
                                        c-3.78,1.6-7.56,3.19-11.35,4.79c2.24-0.83,4.45-1.38,6.81-1.72c-4.21,0.57-8.42,1.13-12.63,1.7c2.93-0.28,5.78-0.22,8.7,0.09
                                        c-4.21-0.57-8.42-1.13-12.63-1.7c5.65,0.79,11.01,2.44,16.29,4.57c-3.78-1.6-7.56-3.19-11.35-4.79
                                        c20.6,8.73,39.95,22.06,57.63,35.62c-3.2-2.48-6.41-4.95-9.61-7.43c20.45,15.84,39.03,33.95,54.95,54.36
                                        c-2.48-3.2-4.95-6.41-7.43-9.61c13.41,17.4,24.75,36.26,33.39,56.47c-1.6-3.78-3.19-7.56-4.79-11.35
                                        c7.92,18.9,13.4,38.67,16.27,58.96c-0.57-4.21-1.13-8.42-1.7-12.63c2.56,19.09,2.76,38.35,0.32,57.46
                                        c0.57-4.21,1.13-8.42,1.7-12.63c-2.29,16.8-6.6,33.16-13.11,48.83c1.6-3.78,3.19-7.56,4.79-11.35
                                        c-6.53,15.34-15,29.68-25.16,42.89c2.48-3.2,4.95-6.41,7.43-9.61c-11.68,14.96-25.29,28.18-40.29,39.78
                                        c3.2-2.48,6.41-4.95,9.61-7.43c-19.25,14.7-40.43,26.55-62.73,35.97c3.78-1.6,7.56-3.19,11.35-4.79
                                        c-28.01,11.68-57.5,19.47-87.56,23.59c4.21-0.57,8.42-1.13,12.63-1.7c-20.2,2.69-40.67,3.79-60.94,1.15
                                        c4.21,0.57,8.42,1.13,12.63,1.7c-10.74-1.51-21.22-4.1-31.25-8.25c3.78,1.6,7.56,3.19,11.35,4.79
                                        c-7.06-3.05-13.67-6.79-19.84-11.39c3.2,2.48,6.41,4.95,9.61,7.43c-6.33-4.89-11.86-10.5-16.79-16.79
                                        c2.48,3.2,4.95,6.41,7.43,9.61c-6.84-9.01-12.18-18.9-16.58-29.29c1.6,3.78,3.19,7.56,4.79,11.35
                                        c-8.39-20.33-13.6-41.96-16.6-63.71c0.57,4.21,1.13,8.42,1.7,12.63c-3.4-25.8-3.35-51.86,0.08-77.65
                                        c-0.57,4.21-1.13,8.42-1.7,12.63c3.5-25.19,10.18-49.78,20.07-73.22c-1.6,3.78-3.19,7.56-4.79,11.35
                                        c8.08-18.82,18.09-36.74,30.61-52.99c-2.48,3.2-4.95,6.41-7.43,9.61c8.77-11.2,18.64-21.41,29.82-30.23
                                        c-3.2,2.48-6.41,4.95-9.61,7.43c9.15-7.06,18.97-13.07,29.58-17.69c-3.78,1.6-7.56,3.19-11.35,4.79
                                        c10.18-4.28,20.77-7.21,31.71-8.75c-4.21,0.57-8.42,1.13-12.63,1.7c9.83-1.25,19.68-1.35,29.53-0.12
                                        c-4.21-0.57-8.42-1.13-12.63-1.7c8.69,1.21,17.11,3.44,25.22,6.81c-3.78-1.6-7.56-3.19-11.35-4.79c4.75,2.07,9.28,4.49,13.64,7.29
                                        c10.11,6.49,25.21,7.93,36.6,4.79c11.02-3.03,22.96-11.55,28.39-21.83C376.48,292.66,369.34,265.59,346.99,251.23L346.99,251.23z"
                                        />
                                </g>
                            </g>
                            </svg>
                        </div>
            `
        }
        else if (player1.token == "O"){
            player2TokenSVG = 
                    `
                    <div>
                        <svg
                        version="1.1"
                        id="svg2"
                        width="512.61334"
                        height="627.81335"
                        viewBox="0 0 512.61334 627.81335"
                        sodipodi:docname="X.eps"
                        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:svg="http://www.w3.org/2000/svg">
                        <defs
                            id="defs6" />
                        <sodipodi:namedview
                            id="namedview4"
                            pagecolor="#ffffff"
                            bordercolor="#000000"
                            borderopacity="0.25"
                            inkscape:showpageshadow="2"
                            inkscape:pageopacity="0.0"
                            inkscape:pagecheckerboard="0"
                            inkscape:deskcolor="#d1d1d1" />
                        <g
                            id="g8"
                            inkscape:groupmode="layer"
                            inkscape:label="ink_ext_XXXXXX"
                            transform="matrix(1.3333333,0,0,-1.3333333,0,627.81333)">
                            <g
                            id="g10"
                            transform="scale(0.1)">
                            <path
                                d="m 3387.1,4648.8 c 194.52,97.72 214,88.46 265.45,-131.2 204.69,55.88 31.73,-79.32 99.16,-209.96 49.1,-95.1 -156.46,-16.63 -154.35,-138.69 2.97,-171.71 5.31,-114.93 -1155.05,-1620.44 C 2242.98,2289.9 4057.27,1147.13 3808.28,956.191 3696.44,870.43 3985.84,726.16 3747.14,613.73 c -42.39,-19.96 -137.18,86.391 -184.92,-18.878 -70.4,-14.391 -266.81,-68.571 -379.35,73.91 -68.55,86.777 -157.49,-5.883 -604.64,502.528 -15.5,17.63 -32.28,41.62 -52.42,46.53 -205.47,50.14 -309.09,229.83 -455.26,354.82 -243.5,208.22 -162.52,316.74 -566.27,-271.39 C 1217.94,884.172 702.27,175.5 697.684,170.332 441.238,-118.961 28.9102,40.332 3.08203,74.3984 -17.8242,101.969 65.207,352.77 325.301,847.32 1275.93,2654.88 1621.44,1963.14 935.23,2736.2 c -6.32,7.12 -612.039,725.81 -689.269,805.19 -113.059,116.21 19.367,251.83 44.125,240.92 172.012,-75.82 151.746,237.33 246.441,236.83 402.508,-2.12 1167.813,-1155.09 1317.643,-953.63 84.06,113.03 254.19,266.28 272.85,294.79 547.9,837.22 515.63,570.58 573.75,693.77 117.69,249.45 20.04,134.72 424.07,514.44 142.49,133.91 166.74,193.73 262.26,80.29"
                                style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                                id="path12" />
                            </g>
                        </g>
                        </svg>
                    </div>
                    `
            
            player1TokenSVG = 
            `
                                    <div>
                            <svg class="O" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 595.28 841.89" style="enable-background:new 0 0 595.28 841.89;" xml:space="preserve">
                            <g>
                                <g>
                                    <path d="M346.99,251.23c-49.91-32.05-118.72-26.42-167.39,5.17c-48.09,31.21-79.03,80.33-98.18,133.4
                                        c-9.51,26.34-14.52,53.85-17.29,81.66c-2.79,28.02-0.78,55.6,3.32,83.39c8.06,54.73,31.72,114.61,82.92,142.2
                                        c49.07,26.44,107.19,22.65,160.05,11.96c20.17-4.08,40-9.88,59.11-17.49c22.57-8.99,44.6-19.12,64.89-32.56
                                        c39.07-25.87,74.13-60.66,94.18-103.53c6.33-13.53,12.05-27.49,15.91-41.95c4.06-15.2,6.27-31.04,7.61-46.69
                                        c2.36-27.46-0.74-55.86-7.1-82.6c-12.26-51.55-40.49-98.59-76.85-136.75c-17.88-18.77-38.33-35.25-59.62-49.97
                                        c-9.13-6.32-18.57-12.2-28.25-17.63c-12.42-6.97-25.86-13.93-39.94-16.59c-20.25-3.82-44.05-3.64-61.25,9.62
                                        c-5.54,2.98-9.98,7.06-13.33,12.23c-4.2,4.59-7.03,9.97-8.5,16.15c-3.13,11.37-1.72,26.51,4.79,36.6
                                        c6.54,10.14,16.28,19.07,28.39,21.83c11.53,2.63,26.76,2.8,36.6-4.79c1.95-1.5,3.93-2.68,6.17-3.67
                                        c-3.78,1.6-7.56,3.19-11.35,4.79c2.24-0.83,4.45-1.38,6.81-1.72c-4.21,0.57-8.42,1.13-12.63,1.7c2.93-0.28,5.78-0.22,8.7,0.09
                                        c-4.21-0.57-8.42-1.13-12.63-1.7c5.65,0.79,11.01,2.44,16.29,4.57c-3.78-1.6-7.56-3.19-11.35-4.79
                                        c20.6,8.73,39.95,22.06,57.63,35.62c-3.2-2.48-6.41-4.95-9.61-7.43c20.45,15.84,39.03,33.95,54.95,54.36
                                        c-2.48-3.2-4.95-6.41-7.43-9.61c13.41,17.4,24.75,36.26,33.39,56.47c-1.6-3.78-3.19-7.56-4.79-11.35
                                        c7.92,18.9,13.4,38.67,16.27,58.96c-0.57-4.21-1.13-8.42-1.7-12.63c2.56,19.09,2.76,38.35,0.32,57.46
                                        c0.57-4.21,1.13-8.42,1.7-12.63c-2.29,16.8-6.6,33.16-13.11,48.83c1.6-3.78,3.19-7.56,4.79-11.35
                                        c-6.53,15.34-15,29.68-25.16,42.89c2.48-3.2,4.95-6.41,7.43-9.61c-11.68,14.96-25.29,28.18-40.29,39.78
                                        c3.2-2.48,6.41-4.95,9.61-7.43c-19.25,14.7-40.43,26.55-62.73,35.97c3.78-1.6,7.56-3.19,11.35-4.79
                                        c-28.01,11.68-57.5,19.47-87.56,23.59c4.21-0.57,8.42-1.13,12.63-1.7c-20.2,2.69-40.67,3.79-60.94,1.15
                                        c4.21,0.57,8.42,1.13,12.63,1.7c-10.74-1.51-21.22-4.1-31.25-8.25c3.78,1.6,7.56,3.19,11.35,4.79
                                        c-7.06-3.05-13.67-6.79-19.84-11.39c3.2,2.48,6.41,4.95,9.61,7.43c-6.33-4.89-11.86-10.5-16.79-16.79
                                        c2.48,3.2,4.95,6.41,7.43,9.61c-6.84-9.01-12.18-18.9-16.58-29.29c1.6,3.78,3.19,7.56,4.79,11.35
                                        c-8.39-20.33-13.6-41.96-16.6-63.71c0.57,4.21,1.13,8.42,1.7,12.63c-3.4-25.8-3.35-51.86,0.08-77.65
                                        c-0.57,4.21-1.13,8.42-1.7,12.63c3.5-25.19,10.18-49.78,20.07-73.22c-1.6,3.78-3.19,7.56-4.79,11.35
                                        c8.08-18.82,18.09-36.74,30.61-52.99c-2.48,3.2-4.95,6.41-7.43,9.61c8.77-11.2,18.64-21.41,29.82-30.23
                                        c-3.2,2.48-6.41,4.95-9.61,7.43c9.15-7.06,18.97-13.07,29.58-17.69c-3.78,1.6-7.56,3.19-11.35,4.79
                                        c10.18-4.28,20.77-7.21,31.71-8.75c-4.21,0.57-8.42,1.13-12.63,1.7c9.83-1.25,19.68-1.35,29.53-0.12
                                        c-4.21-0.57-8.42-1.13-12.63-1.7c8.69,1.21,17.11,3.44,25.22,6.81c-3.78-1.6-7.56-3.19-11.35-4.79c4.75,2.07,9.28,4.49,13.64,7.29
                                        c10.11,6.49,25.21,7.93,36.6,4.79c11.02-3.03,22.96-11.55,28.39-21.83C376.48,292.66,369.34,265.59,346.99,251.23L346.99,251.23z"
                                        />
                                </g>
                            </g>
                            </svg>
                        </div>
            `
        }

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
                               e.target.innerHTML = player1TokenSVG;
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
                               e.target.innerHTML = player2TokenSVG;
                           }
                           else{
                               alert("Please place your token in an empty cell.");
                           }
                       }
           
                       if(player1.winnerOfThisRound == true || player2.winnerOfThisRound == true){
                        if(player1.winnerOfThisRound == true){
                            setTimeout(()=>{
                                alert(`${player1.name} has won this round!` );
                            }, 200);

                        }
                        else{
                            setTimeout(()=>{
                                alert(`${player2.name} has won this round!` );
                            }, 200);
                        }
                        setTimeout(()=>{
                            this.initializeRound();
                        }, 500);




                       }
                       
       
               
               
                   })
               }) 

        }
    
        function roundWinningHandler(player, rowIndex, colIndex){
            let grids = document.querySelectorAll("td");
            player.roundsWon++;
            player.winnerOfThisRound = true;
            grids.forEach((grid)=>{
                if(grid.getAttribute("row") == rowIndex+1 && grid.getAttribute("col") == colIndex+1){
                    //fill it with whoever's token
                    if(player.token == player1.token){
                        grid.innerHTML = player1TokenSVG;
                    }

                    else{
                        grid.innerHTML = player2TokenSVG;
                    }
                }
            })

            //determine if a game winner has been born
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
        }
    
        function evaluate(player, playNumber, rowIndex, colIndex, board){
            //When there's been enough play for winning to be a possibility
            if (playNumber >= 5){
                //check horizontally
                if(colIndex-2 >= 0){
                    if(board[rowIndex][colIndex] == board[rowIndex][colIndex-1] && board[rowIndex][colIndex-1] == board[rowIndex][colIndex-2]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }
    
                if(colIndex - 1 >= 0 && colIndex + 1 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex][colIndex+1] && board[rowIndex][colIndex+1] == board[rowIndex][colIndex-1]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }
    
                if (colIndex + 2 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex][colIndex+1] && board[rowIndex][colIndex+1] == board[rowIndex][colIndex+2]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }
                //check vertically
                if(rowIndex-2 >= 0){
                    if(board[rowIndex][colIndex] == board[rowIndex-1][colIndex] && board[rowIndex-1][colIndex] == board[rowIndex-2][colIndex]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }
    
                if(rowIndex - 1 >= 0 && rowIndex + 1 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex] && board[rowIndex+1][colIndex] == board[rowIndex-1][colIndex]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }
    
                if (rowIndex + 2 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex] && board[rowIndex+1][colIndex] == board[rowIndex+2][colIndex]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }
    
                //check diagonally
                //one diagonal
                if(rowIndex-2 >= 0 && colIndex-2 >= 0){
                    if(board[rowIndex][colIndex] == board[rowIndex-1][colIndex-1] && board[rowIndex-1][colIndex-1] == board[rowIndex-2][colIndex-2]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }
    
                if(rowIndex - 1 >= 0 && colIndex - 1 >= 0 && rowIndex + 1 <= 2 && colIndex + 1 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex+1] && board[rowIndex+1][colIndex+1] == board[rowIndex-1][colIndex-1]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }
    
                if (rowIndex + 2 <= 2 && colIndex+2 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex+1] && board[rowIndex+1][colIndex+1] == board[rowIndex+2][colIndex+2]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }
                //the other diagonal

                if(rowIndex - 2 >= 0 && colIndex + 2 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex-1][colIndex+1] && board[rowIndex-1][colIndex+1] == board[rowIndex-2][colIndex+2]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }

                if(rowIndex + 1 <= 2 && colIndex - 1 >= 0 && rowIndex - 1 >= 0 && colIndex + 1 <= 2){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex-1] && board[rowIndex+1][colIndex-1] == board[rowIndex-1][colIndex+1]){
                        roundWinningHandler(player, rowIndex, colIndex);
                        return;
                    }
                }

                if(rowIndex + 2 <= 2 && colIndex - 2 >= 0){
                    if(board[rowIndex][colIndex] == board[rowIndex+1][colIndex-1] && board[rowIndex+1][colIndex-1] == board[rowIndex+2][colIndex-2]){
                        roundWinningHandler(player, rowIndex, colIndex);
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


















