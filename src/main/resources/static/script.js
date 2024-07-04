let gameInterval;

function startGame() {
document.getElementById('game-over').style.display = 'none'; // Hide the game over message
document.getElementById('start-button').style.display = 'none'; // Hide the start button
const gameBoard = document.getElementById('game-board');
gameBoard.classList.remove('game-over');
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
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.gameOver) {
                clearInterval(gameInterval); // Stop the game
                document.getElementById('game-over').style.display = 'block'; // Show the game over message
                document.getElementById('start-button').style.display = 'block'; // Show the start button
            } else {
                drawSnake(data);
                fetchFood();
                updateScore(); // Update de score
            }
        })
        .catch(error => {
            clearInterval(gameInterval); // Stop the game
            document.getElementById('game-over').style.display = 'block'; // Show the game over message
            const gameBoard = document.getElementById('game-board');
            gameBoard.classList.add('game-over');
            document.getElementById('start-button').style.display = 'block'; // Show the start button
            document.getElementById('start-button').addEventListener('click', function() {
                                location.reload(); // Reload the page
                            });
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
    foodElement.classList.add('food');
    foodElement.style.left = `${food.position.x * 5}%`;
    foodElement.style.top = `${food.position.y * 5}%`;
    foodContainer.appendChild(foodElement);
}

function drawSnake(snake) {
    const snakeContainer = document.getElementById('snake-container');
    snakeContainer.innerHTML = ''; // Clear the snake container
    for (let i = 0; i < snake.body.length; i++) {
        const dot = document.createElement('div');
        if (i === 0) {
            dot.classList.add('snake-head');
            // Set the rotation based on the direction
            switch (snake.direction) {
                case 'UP':
                    dot.style.transform = 'rotate(180deg)';
                    break;
                case 'DOWN':
                    dot.style.transform = 'rotate(0deg)';
                    break;
                case 'LEFT':
                    dot.style.transform = 'rotate(90deg)';
                    break;
                case 'RIGHT':
                    dot.style.transform = 'rotate(270deg)';
                    break;
            }
        } else {
            dot.classList.add('snake-body');
        }
        dot.style.left = `${snake.body[i].x * 5}%`;
        dot.style.top = `${snake.body[i].y * 5}%`;
        snakeContainer.appendChild(dot);
    }
}

    function drawObstacles(obstacles) {
    const obstaclesContainer = document.getElementById('obstacles-container');
    for (const obstacle of obstacles) {
        const obstacleElement = document.createElement('div');
        obstacleElement.classList.add('obstacle');
        obstacleElement.style.left = `${obstacle.position.x * 5}%`;
        obstacleElement.style.top = `${obstacle.position.y * 5}%`;
        obstaclesContainer.appendChild(obstacleElement);
    }
}

function fetchObstacles() {
    fetch('/getObstacles')
        .then(response => response.json())
        .then(data => drawObstacles(data));
}

function updateScore() {
    fetch('/getScore')
        .then(response => response.json())
        .then(score => {
            document.getElementById('score').innerText = `Score 1: ${score}`; // Update de score in het HTML-element
        });
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