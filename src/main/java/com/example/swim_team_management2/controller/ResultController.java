package com.example.swim_team_management2.controller;

import com.example.swim_team_management2.dto.ResultDto;
import com.example.swim_team_management2.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultService resultService;

    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('COACH')")
    public ResultDto createResult(@RequestBody ResultDto resultDto) {
        return resultService.createResult(resultDto);
    }
}