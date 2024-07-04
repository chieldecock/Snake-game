package com.sogeti.java.snake.snakegame.service;

import com.sogeti.java.snake.snakegame.model.ScoreModel;
import org.springframework.stereotype.Service;

import java.util.PriorityQueue;

@Service
public class ScoreService {
    private final PriorityQueue<ScoreModel> topScores = new PriorityQueue<>();
    private static final int MAX_SCORES = 5;

    public void addScore(int score) {
        topScores.add(new ScoreModel(score));
        // Zorg ervoor dat de PriorityQueue niet meer dan MAX_SCORES elementen bevat
        while (topScores.size() > MAX_SCORES) {
            topScores.poll();
        }
    }

    public PriorityQueue<ScoreModel> getTopScores() {
        return new PriorityQueue<>(topScores);
    }
}