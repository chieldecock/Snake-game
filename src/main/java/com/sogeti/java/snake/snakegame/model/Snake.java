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

    public Position getHead() {
        return body.get(0);
    }

    public void grow() {
        this.length++;
    }

    public void move() {
        Position head = body.get(0); // current head position
        Position newHead;

        switch (direction) {
            case "UP":
                newHead = new Position(head.getX(), (head.getY() - 1 + 20) % 20);
                break;
            case "DOWN":
                newHead = new Position(head.getX(), (head.getY() + 1) % 20);
                break;
            case "LEFT":
                newHead = new Position((head.getX() - 1 + 20) % 20, head.getY());
                break;
            case "RIGHT":
                newHead = new Position((head.getX() + 1) % 20, head.getY());
                break;
            default:
                throw new IllegalArgumentException("Invalid direction: " + direction);
        }

        body.add(0, newHead); // add new head to the front of the body list

        if (body.size() > length) {
            body.remove(body.size() - 1); // remove the tail
        }
    }
}