package com.darshaan;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/ollama")
@CrossOrigin("*")
public class OllamaController 
{

	private final ChatClient chatClient;
    public OllamaController(OllamaChatModel chatModel) {
        this.chatClient = ChatClient.builder(chatModel).build();
    }
    @GetMapping("/{message}")
    public ResponseEntity<String> askOllama(@PathVariable String message) 
    {
        try 
        {
            String response = chatClient.prompt(message)
                    .call()
                    .content();
            return ResponseEntity.ok(response);
        } catch (Exception e) 
        {
            return ResponseEntity
                    .status(500)
                    .body("500: Error while calling Ollama - " + e.getMessage());
        }
    }

}
