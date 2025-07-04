package com.example.swim_team_management2.controller;

import com.example.swim_team_management2.dto.SwimmerDto;
import com.example.swim_team_management2.service.SwimmerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/swimmers")
public class SwimmerController {

    private final SwimmerService swimmerService;

    @Autowired
    public SwimmerController(SwimmerService swimmerService) {
        this.swimmerService = swimmerService;
    }

    @GetMapping
    public List<SwimmerDto> getAllSwimmers() {
        return swimmerService.getAllSwimmers();
    }

    @PostMapping
    public SwimmerDto createSwimmer(@RequestBody @Valid SwimmerDto swimmer) {
        return swimmerService.createSwimmer(swimmer);
    }

    @PutMapping("/{id}")
    public SwimmerDto updateSwimmer(@PathVariable Long id, @RequestBody @Valid SwimmerDto swimmerDto) {
        return swimmerService.updateSwimmer(id, swimmerDto);
    }
}
