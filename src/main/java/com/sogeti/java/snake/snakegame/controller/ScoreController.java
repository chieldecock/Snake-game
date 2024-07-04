package com.sogeti.java.snake.snakegame.controller;

import com.sogeti.java.snake.snakegame.model.ScoreModel;
import com.sogeti.java.snake.snakegame.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/scores")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;
    private ScoreModel scoreModel;

    @PostMapping("/add")
    public void addScore(@RequestParam int score) {
        scoreService.addScore(score);
    }

    @GetMapping("/top")
    public List<Integer> getTopScores() {
        return scoreService.getTopScores().stream()
                .map(ScoreModel::getScore)
                .collect(Collectors.toList());
    }
}