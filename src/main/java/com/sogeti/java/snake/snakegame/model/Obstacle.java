package com.sogeti.java.snake.snakegame.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Obstacle {
    private Position position;

    public Obstacle(Position position) {
        this.position = position;
    }
}