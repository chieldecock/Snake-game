package com.sogeti.java.snake.snakegame.model;

import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
public class Snake {
    private int length;
    private String direction;
    private List<Position> body;

    public Snake(int initialLength, String initialDirection, Position initialPosition) {
        this.length = initialLength;
        this.direction = initialDirection;
        this.body = new LinkedList<>();
        this.body.add(initialPosition);
    }

    public void move() {
        Position head = body.get(0); // current head position
        Position newHead;

        switch (direction) {
            case "UP":
                newHead = new Position(head.getX(), head.getY() - 1);
                break;
            case "DOWN":
                newHead = new Position(head.getX(), head.getY() + 1);
                break;
            case "LEFT":
                newHead = new Position(head.getX() - 1, head.getY());
                break;
            case "RIGHT":
                newHead = new Position(head.getX() + 1, head.getY());
                break;
            default:
                throw new IllegalArgumentException("Invalid direction: " + direction);
        }

        body.add(0, newHead); // add new head to the front of the body list

        if (!hasEatenFood()) {
            body.remove(body.size() - 1); // remove the tail if the snake has not eaten food
        }
    }

    private boolean hasEatenFood() {
        // TODO: Implement the logic to check if the snake has eaten food
        return false;
    }

    public boolean checkSelfCollision() {
        // TODO: Implement the logic to check if the snake has collided with itself
        return false;
    }
}
