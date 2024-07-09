const boxes = document.querySelectorAll('.box');
        const statusTxt = document.querySelector('.status');
        const btnReset = document.querySelector('.reset');
        const x = "<img src='../assets/cross.png'>";
        const o = "<img src='../assets/circle.png'>";

        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        let options = ["", "", "", "", "", "", "", "", ""];
        let currentPlayer = x;
        let player = "X";
        let running = false;
        
        init();

        function init() {
            boxes.forEach(box => box.addEventListener('click', boxClick));
            btnReset.addEventListener('click', resetGame);
            running = true;
            statusTxt.textContent = `${player} Your Turn`;
        }

        function boxClick() {
            const index = this.dataset.index;

            if (options[index] !== "" || !running) {
                return;
            }

            updateBox(this, index);
            checkWinner();
        }

        function updateBox(box, index) {
            options[index] = player;
            box.innerHTML = currentPlayer;
        }

        function changePlayer() {
            player = (player === "X") ? "O" : "X";
            currentPlayer = (currentPlayer === x) ? o : x;
            statusTxt.textContent = `${player} Your Turn`;
        }

        function checkWinner() {
            let roundWon = false;

            for (let i = 0; i < winConditions.length; i++) {
                const condition = winConditions[i];
                const box1 = options[condition[0]];
                const box2 = options[condition[1]];
                const box3 = options[condition[2]];

                if (box1 === "" || box2 === "" || box3 === "") {
                    continue;
                }

                if (box1 === box2 && box2 === box3) {
                    roundWon = true;
                    boxes[condition[0]].classList.add('win');
                    boxes[condition[1]].classList.add('win');
                    boxes[condition[2]].classList.add('win');
                    break;
                }
            }

            if (roundWon) {
                statusTxt.textContent = `${player} Wins!`;
                running = false;
            } else if (!options.includes("")) {
                statusTxt.textContent = `Game Draw!`;
                running = false;
            } else {
                changePlayer();
            }
        }

        function resetGame() {
            options = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = x;
            player = "X";
            running = true;
            statusTxt.textContent = `${player} Your Turn`;

            boxes.forEach(box => {
                box.innerHTML = "";
                box.classList.remove('win');
            });
        }