package com.souchanrojame.librarymanagement;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        System.out.println("hello world");
        return "Welcome to the Library Management System!.";
    }
}
