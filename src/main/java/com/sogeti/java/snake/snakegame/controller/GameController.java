package com.sogeti.java.snake.snakegame.controller;

import com.sogeti.java.snake.snakegame.model.Food;
import com.sogeti.java.snake.snakegame.model.Obstacle;
import com.sogeti.java.snake.snakegame.model.Position;
import com.sogeti.java.snake.snakegame.model.Snake;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class GameController {

    private Snake snake;
    private Food food;
    private List<Obstacle> obstacles;
    private final Random random = new Random();
    private boolean gameOver = false;
    private int score = 0;

    @GetMapping("/start")
    public Snake startGame() {
        gameOver = false;
        snake = new Snake(1, "UP", new Position(10, 10));
        food = generateNewFood();
        obstacles = generateObstacles();
        return snake;
    }

    private List<Obstacle> generateObstacles() {
        this.obstacles = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            Position position;
            do {
                int x = random.nextInt(20);
                int y = random.nextInt(20);
                position = new Position(x, y);
            } while (snake.getBody().contains(position) || position.equals(food.getPosition()));
            obstacles.add(new Obstacle(position));
        }
        return obstacles;
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
            food = generateNewFood();
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

    private Food generateNewFood() {
        Position position;
        do {
            int x = random.nextInt(20);
            int y = random.nextInt(20);
            position = new Position(x, y);
        } while (snake.getBody().contains(position));
        return new Food(position);
    }


}