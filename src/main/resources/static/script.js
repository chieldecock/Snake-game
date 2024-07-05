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
            gameInterval = null; // Zet de gameInterval op undefined
        });
}

async function moveSnake() {
    try {
        const response = await fetch('/move');
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        if (data.gameOver) {
            document.getElementById('game-over').style.display = 'block'; // Toon de game over melding
            document.getElementById('start-button').style.display = 'block'; // Toon de startknop
        } else {
            drawSnake(data);
            fetchFood();
            updateScore(); // Update de score
        }
    } catch (error) {
        clearInterval(gameInterval); // Stop het spel
        const currentScore = await fetch('/getScore').then(res => res.json()); // Veronderstelt dat /getScore de huidige score teruggeeft
        await addScore(currentScore); // Voeg de score toe aan de topscorelijst
        document.getElementById('game-over').style.display = 'block'; // Toon de game over melding
        const gameBoard = document.getElementById('game-board');
        gameBoard.classList.add('game-over');
        document.getElementById('start-button').style.display = 'block'; // Toon de startknop
        document.getElementById('start-button').addEventListener('click', function() {
            resetGame(); // Roep de functie resetGame aan als er op de startknop wordt geklikt
        });
    }
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
            document.getElementById('score').innerText = `Current score: ${score}`; // Update de score in het HTML-element
        });
}

async function addScore(score) {
    try {
        const response = await fetch('/scores/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `score=${score}`
        });
        if (response.ok) {
            console.log('Score successfully added');
            fetchTopScores(); // Update de top scores lijst
        } else {
            console.error('Failed to add score');
        }
    } catch (error) {
        console.error('Error adding score:', error);
    }
}

async function fetchTopScores() {
    try {
        const response = await fetch('/scores/top');
        const scores = await response.json();
        const scoresListElement = document.getElementById('top-scores-list');
        scoresListElement.innerHTML = ''; // Maak de lijst leeg voor nieuwe scores

        scores.forEach((score, index) => {
            const scoreItem = document.createElement('li');
            scoreItem.textContent = `Score ${index + 1}: ${score}`;
            scoresListElement.appendChild(scoreItem);
        });
    } catch (error) {
        console.error('Error fetching top scores:', error);
    }
}

// Roep deze functie op wanneer de pagina wordt geladen of wanneer nodig
fetchTopScores();

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

function resetGame() {
    document.getElementById('game-over').style.display = 'none'; // Verberg de game over melding
    document.getElementById('start-button').style.display = 'none'; // Verberg de startknop
    const gameBoard = document.getElementById('game-board');
    gameBoard.focus(); // Zet focus op het speelveld
    startGame(); // Start het spel opnieuw
}