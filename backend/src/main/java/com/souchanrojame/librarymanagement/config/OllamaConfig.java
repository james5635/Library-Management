package com.souchanrojame.librarymanagement.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "ollama")
public class OllamaConfig {
    private String host = "localhost";
    private int port = 11434;
    private String model = "gpt-oss:120b-cloud";
    private int timeout = 120;

    public String getBaseUrl() {
        return String.format("http://%s:%d", host, port);
    }
}
