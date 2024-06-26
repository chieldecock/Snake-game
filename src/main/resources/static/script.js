let gameInterval;

function startGame() {
        fetch('/start')
            .then(response => response.json())
            .then(data => {
            drawSnake(data);
            fetchFood();
        });
    }

    function moveSnake() {
        fetch('/move')
            .then(response => response.json())
            .then(data => {
            drawSnake(data);
            fetchFood();
        });
    }

    function fetchFood() {
    fetch('/getFood')
        .then(response => response.json())
        .then(data => drawFood(data));
    }

    function drawFood(food) {
    const gameBoard = document.getElementById('game-board');
    const foodElement = document.createElement('div');
    foodElement.classList.add('dot');
    foodElement.style.left = `${food.position.x * 10}px`;
    foodElement.style.top = `${food.position.y * 10}px`;
    foodElement.style.backgroundColor = 'red';
    gameBoard.appendChild(foodElement);
}

    function drawSnake(snake) {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = ''; // Clear the game board
        for (const position of snake.body) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.left = `${position.x * 10}px`;
            dot.style.top = `${position.y * 10}px`;
            gameBoard.appendChild(dot);
        }
    }

    window.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                changeDirection('UP');
                break;
            case 'ArrowDown':
                changeDirection('DOWN');
                break;
            case 'ArrowLeft':
                changeDirection('LEFT');
                break;
            case 'ArrowRight':
                changeDirection('RIGHT');
                break;
        }
    });

    function changeDirection(direction) {
    fetch(`/changeDirection?direction=${direction}`)
        .then(response => response.json())
        .then(data => {
            drawSnake(data);
            if (!gameInterval) {
                gameInterval = setInterval(moveSnake, 100);
            }
        });
}

    window.onload = function() {
    startGame();
};