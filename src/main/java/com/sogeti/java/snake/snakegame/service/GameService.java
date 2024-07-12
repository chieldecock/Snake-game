package com.sogeti.java.snake.snakegame.service;

import com.sogeti.java.snake.snakegame.model.Food;
import com.sogeti.java.snake.snakegame.model.Obstacle;
import com.sogeti.java.snake.snakegame.model.Position;
import com.sogeti.java.snake.snakegame.model.Snake;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class GameService {
    private final Random random = new Random();

    public List<Obstacle> generateObstacles(Snake snake, Food food) {
        List<Obstacle> obstacles = new ArrayList<>();
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

    public Food generateNewFood(Snake snake) {
        Position position;
        do {
            int x = random.nextInt(20);
            int y = random.nextInt(20);
            position = new Position(x, y);
        } while (snake.getBody().contains(position));
        return new Food(position);
    }
}
