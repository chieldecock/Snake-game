package com.sogeti.java.snake.snakegame.controller;

import com.sogeti.java.snake.snakegame.model.Food;
import com.sogeti.java.snake.snakegame.model.Position;
import com.sogeti.java.snake.snakegame.model.Snake;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
public class GameController {

    private Snake snake;
    private Food food;
    private Random random = new Random();

    @GetMapping("/start")
    public Snake startGame() {
        snake = new Snake(1, "UP", new Position(20, 20));
        food = generateNewFood();
        return snake;
    }

    @GetMapping("/move")
    public Snake moveSnake() {
        snake.move();
        if (snake.getHead().equals(food.getPosition())) {
            snake.grow();
            food = generateNewFood();
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

    private Food generateNewFood() {
        Position position;
        do {
            int x = random.nextInt(40);
            int y = random.nextInt(40);
            position = new Position(x, y);
        } while (snake.getBody().contains(position));
        return new Food(position);
    }
}