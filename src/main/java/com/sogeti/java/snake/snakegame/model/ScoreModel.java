package com.sogeti.java.snake.snakegame.model;

public class ScoreModel implements Comparable<ScoreModel> {
    private int score;

    public ScoreModel(int score) {
        this.score = score;
    }

    public int getScore() {
        return score;
    }

    @Override
    public int compareTo(ScoreModel o) {
        return Integer.compare(o.score, this.score);
    }
}