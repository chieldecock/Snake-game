let gameInterval;

function startGame() {
        fetch('/start')
            .then(response => response.json())
            .then(data => {
            createContainers();
            drawSnake(data);
            fetchFood();
            fetchObstacles();
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

    function createContainers() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = ''; // Clear the game board

        // Create separate containers for the snake, food, and obstacles
        const snakeContainer = document.createElement('div');
        snakeContainer.id = 'snake-container';
        gameBoard.appendChild(snakeContainer);

        const foodContainer = document.createElement('div');
        foodContainer.id = 'food-container';
        gameBoard.appendChild(foodContainer);

        const obstaclesContainer = document.createElement('div');
        obstaclesContainer.id = 'obstacles-container';
        gameBoard.appendChild(obstaclesContainer);
    }

    function drawFood(food) {
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = ''; // Clear the food container
    const foodElement = document.createElement('div');
    foodElement.classList.add('dot');
    foodElement.style.left = `${food.position.x * 10}px`;
    foodElement.style.top = `${food.position.y * 10}px`;
    foodElement.style.backgroundColor = 'red';
    foodContainer.appendChild(foodElement);
}

    function drawSnake(snake) {
        const snakeContainer = document.getElementById('snake-container');
        snakeContainer.innerHTML = ''; // Clear the snake container
        for (const position of snake.body) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.left = `${position.x * 10}px`;
            dot.style.top = `${position.y * 10}px`;
            snakeContainer.appendChild(dot);
        }
    }

    function drawObstacles(obstacles) {
    const obstaclesContainer = document.getElementById('obstacles-container');
    for (const obstacle of obstacles) {
        const obstacleElement = document.createElement('div');
        obstacleElement.classList.add('dot');
        obstacleElement.style.left = `${obstacle.position.x * 10}px`;
        obstacleElement.style.top = `${obstacle.position.y * 10}px`;
        obstacleElement.style.backgroundColor = 'grey';
        obstaclesContainer.appendChild(obstacleElement);
    }
}

function fetchObstacles() {
    fetch('/getObstacles')
        .then(response => response.json())
        .then(data => drawObstacles(data));
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