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

    @GetMapping("/start")
    public Snake startGame() {
        snake = new Snake(1, "UP", new Position(20, 20));
        food = new Food(new Position(new Random().nextInt(20), new Random().nextInt(20)));
        return snake;
    }

    @GetMapping("/move")
    public Snake moveSnake() {
        snake.move();
        if (snake.getHead().equals(food.getPosition())) {
            snake.grow();
            food.setPosition(new Position(new Random().nextInt(20), new Random().nextInt(20)));
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
}
