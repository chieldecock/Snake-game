package com.sogeti.java.snake.snakegame.controller;

import com.sogeti.java.snake.snakegame.model.Position;
import com.sogeti.java.snake.snakegame.model.Snake;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    private Snake snake;

    @GetMapping("/start")
    public Snake startGame() {
        snake = new Snake(1, "UP", new Position(0, 0));
        return snake;
    }

    @GetMapping("/move")
    public Snake moveSnake() {
        snake.move();
        return snake;
    }
}
