package com.sogeti.java.snake.snakegame.controller;

import com.sogeti.java.snake.snakegame.model.Position;
import com.sogeti.java.snake.snakegame.model.Snake;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    private Snake snake;
    @GetMapping("/start")
    public String startGame() {
        // Initialize the snake with a length of 1, direction "UP", and initial position (0, 0)
        snake = new Snake(1, "UP", new Position(0, 0));
        return "Game started";
    }

    @GetMapping("/move")
    public String moveSnake() {
        // Move the snake
        snake.move();
        return "Snake moved";
    }
}
