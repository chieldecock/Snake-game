package com.sogeti.java.snake.snakegame.service;

import com.sogeti.java.snake.snakegame.model.ScoreModel;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.PriorityQueue;
import java.util.List;
import java.util.ArrayList;

@Service
public class ScoreService {
    private final PriorityQueue<ScoreModel> topScores = new PriorityQueue<>();
    private static final int MAX_SCORES = 10; // Aangepast naar 10 voor max opslag

    public void addScore(int score) {
        topScores.add(new ScoreModel(score));
        // Zorg ervoor dat de PriorityQueue niet meer dan MAX_SCORES elementen bevat
        while (topScores.size() > MAX_SCORES) {
            topScores.poll();
        }
    }

    public List<ScoreModel> getTopScores() {
        PriorityQueue<ScoreModel> copy = new PriorityQueue<>(topScores);
        List<ScoreModel> topFiveScores = new ArrayList<>();
        int count = 0;
        while (!copy.isEmpty() && count < 5) { // Beperk tot top 5 scores
            topFiveScores.add(copy.poll());
            count++;
        }
        return topFiveScores;
    }
}