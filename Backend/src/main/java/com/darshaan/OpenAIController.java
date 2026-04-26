package com.darshaan;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/openai")
@CrossOrigin("*")
public class OpenAIController 
{
    private final ChatClient chatClient;
    public OpenAIController(OpenAiChatModel chatModel) 
    {
        this.chatClient = ChatClient.builder(chatModel).build();
    }
    @GetMapping("/{message}")
    public ResponseEntity<String> askOpenAi(@PathVariable String message) 
    {
        try 
        {
            String response = chatClient.prompt(message)
                    .call()
                    .content();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("500: Error while calling OpenAI - "
                            + e.getClass().getSimpleName() + " - " + e.getMessage());
        }
    }
}