package com.souchanrojame.librarymanagement.controller;

import com.souchanrojame.librarymanagement.model.Book;
import com.souchanrojame.librarymanagement.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import java.util.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AiController {
    private final BookRepository bookRepository;
    private final OllamaChatModel chatModel;

    @PostMapping("/summarize")
    public Map<String, String> summarize(@RequestBody Map<String, String> body) {
        String isbn = body.get("isbn");
        Book book = bookRepository.findById(isbn).orElse(null);

        if (book == null) {
            return Map.of("summary", "I couldn't find this book in the library database.");
        }

        String title = book.getTitle() != null ? book.getTitle() : "Untitled";
        String desc = book.getDescription() != null ? book.getDescription() : "";
        String category = book.getCategory() != null ? book.getCategory().getCategoryName() : "General";
        String authors = "";
        if (book.getAuthors() != null && !book.getAuthors().isEmpty()) {
            authors = book.getAuthors().stream()
                    .map(a -> a.getFirstName() + " " + a.getLastName())
                    .reduce((a, b) -> a + ", " + b)
                    .orElse("Unknown");
        }
        String edition = book.getEdition() != null ? book.getEdition() : "N/A";
        String price = book.getPrice() != null ? "$" + book.getPrice() : "N/A";
        String format = book.getBookType() != null ? book.getBookType().toString() : "N/A";

        String bookInfo = String.format(
                "**Book:** %s\n\n**Author(s):** %s\n\n**Category:** %s\n\n**Format:** %s\n\n**Overview:**\n\n%s\n\n**Key Highlights:**\n\n- Categorized under %s\n- Available in %s format\n- Edition: %s\n- Price: %s",
                title,
                authors.isEmpty() ? "Unknown Author" : authors,
                category,
                format,
                desc.isEmpty() ? "No description available." : desc,
                category,
                format.toLowerCase(),
                edition,
                price
        );

        String userMessage = String.format(
                "Here is information about a book in our library:\n\n%s\n\nPlease provide a concise summary (3-5 sentences) of what this book is about, its main themes, and who would enjoy reading it.",
                bookInfo
        );

        try {
            String aiSummary = callOllama(userMessage);
            return Map.of("summary", bookInfo + "\n\n---\n\n**AI Summary:**\n\n" + aiSummary);
        } catch (Exception e) {
            return Map.of("summary", bookInfo + "\n\n_(Note: AI service unavailable.)_");
        }
    }

    @PostMapping(value = "/ask/stream", produces = "text/plain;charset=UTF-8")
    public Flux<String> askStream(@RequestBody Map<String, String> body) {
        String question = body.getOrDefault("question", "");

        SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(
                "You are a helpful library assistant. Answer questions in a friendly and informative way."
        );

        Prompt prompt = new Prompt(
                systemPromptTemplate.createMessage(),
                new UserMessage(question)
        );

        return chatModel.stream(prompt)
                .map(response -> {
                    String content = response.getResult().getOutput().getText();
                    return content != null ? content : "";
                })
                .concatWith(Flux.just("[END]"))
                .onErrorReturn("[ERROR]Sorry, I encountered an error. Please try again.");
    }

    @PostMapping("/ask")
    public Map<String, String> ask(@RequestBody Map<String, String> body) {
        String question = body.getOrDefault("question", "");

        try {
            String response = callOllama(question);
            return Map.of("response", response);
        } catch (Exception e) {
            return Map.of("response", "I'm having trouble connecting to the AI service right now. Please try again later.");
        }
    }

    private String callOllama(String userMessage) {
        SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(
                "You are a helpful library assistant. Answer questions in a friendly and informative way."
        );

        Prompt prompt = new Prompt(
                systemPromptTemplate.createMessage(),
                new UserMessage(userMessage)
        );

        return chatModel.call(prompt).getResult().getOutput().getText();
    }
}
