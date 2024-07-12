package com.sogeti.java.snake.snakegame.controller;

import com.sogeti.java.snake.snakegame.model.Food;
import com.sogeti.java.snake.snakegame.model.Obstacle;
import com.sogeti.java.snake.snakegame.model.Position;
import com.sogeti.java.snake.snakegame.model.Snake;
import com.sogeti.java.snake.snakegame.service.GameService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GameController {

    private final GameService gameService = new GameService();
    private Snake snake;
    private Food food;
    private List<Obstacle> obstacles;
    private boolean gameOver = false;
    private int score;

    @GetMapping("/start")
    public Snake startGame() {
        score = 0;
        gameOver = false;
        snake = new Snake(1, "UP", new Position(10, 10));
        food = gameService.generateNewFood(snake);
        obstacles = gameService.generateObstacles(snake, food);
        while (gameService.isFoodOnObstacle(food, obstacles)) {
            food = gameService.generateNewFood(snake);
            System.out.println("Food placed on an obstacle. Regenerating food...");
        }
        return snake;
    }

    @GetMapping("/move")
    public Snake moveSnake() {
        if (gameOver) {
            throw new RuntimeException("Game over");
        }

        snake.move();
        Position newHead = snake.getHead();

        // Check if the snake has collided with itself
        List<Position> bodyWithoutHead = snake.getBody().subList(1, snake.getBody().size());
        if (bodyWithoutHead.contains(newHead)) {
            gameOver = true;
            throw new RuntimeException("Game over: Snake collided with itself");
        }

        if (snake.getHead().equals(food.getPosition())) {
            snake.grow();
            score++;
            food = gameService.generateNewFood(snake);
            while (gameService.isFoodOnObstacle(food, obstacles)) {
                food = gameService.generateNewFood(snake);
                System.out.println("Food placed on an obstacle. Regenerating food...");
            }
        }

        for (Obstacle obstacle : obstacles) {
            if (newHead.equals(obstacle.getPosition())) {
                gameOver = true;
                throw new RuntimeException("Game over: Snake collided with an obstacle");
            }
        }
        return snake;
    }

    @GetMapping("/changeDirection")
    public Snake changeDirection(@RequestParam String direction) {
        snake.setDirection(direction);
        return snake;
    }

    @GetMapping("/getFood")
    public Food getFood() {
        return food;
    }

    @GetMapping("/getObstacles")
    public List<Obstacle> getObstacles() {
        return obstacles;
    }

    @GetMapping("/getScore")
    public int getScore() {
        return score;
    }
}