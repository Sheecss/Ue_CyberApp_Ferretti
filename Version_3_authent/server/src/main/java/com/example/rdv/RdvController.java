package com.example.rdv;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
class RdvController {
    private RdvRepository repository;

    public RdvController(RdvRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/rdv-liste")
    @CrossOrigin(origins = "https://localhost:4200")
    public Collection<Rdv> rdv() {
        return repository.findAll().stream().collect(Collectors.toList());
    }
    


}
