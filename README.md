# LLMComparisonApplication

LLMComparisonApplication is a full-stack AI project that lets users write a single prompt and compare responses from multiple large language models in one interface. The current implementation uses Spring Boot and Spring AI on the backend, React on the frontend, OpenAI via API for hosted inference, and DeepSeek-R1:1.5B through Ollama for local inference.

## Repository Description

Compare OpenAI and DeepSeek-R1:1.5B side by side using Spring Boot, Spring AI, React, and Ollama.

## Overview

The project is designed to make model comparison simple, visual, and practical. Instead of testing prompts separately across different tools, users can enter one prompt once and view both responses side by side in a clean interface.

This setup is useful for evaluating differences in reasoning style, clarity, response structure, and general output quality across models. It also demonstrates how a Java backend can orchestrate multiple LLM providers behind a single application flow.

## Features

- Single prompt input for multiple LLMs.
- Side-by-side comparison UI built with React.
- OpenAI integration through Spring AI.
- Local DeepSeek-R1:1.5B integration through Ollama.
- Separate backend endpoints for each model.
- Clean full-stack architecture for extending to more providers later.

## Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React |
| Backend | Spring Boot |
| AI Integration | Spring AI `ChatClient` |
| Hosted Model | OpenAI API |
| Local Model | DeepSeek-R1:1.5B via Ollama |

## How it works

1. The user enters a prompt in the React frontend.
2. The frontend sends the same prompt to the Spring Boot backend.
3. The backend exposes model-specific endpoints and uses Spring AI `ChatClient` to call each model.
4. Responses are returned independently and displayed side by side for easy comparison.

Example endpoint structure:

```text
/api/openai/{message}
/api/ollama/{message}
```

## Why this project matters

LLMComparisonApplication is more than a chatbot UI. It is an orchestration layer for comparing cloud-hosted and locally run models through one consistent workflow, which makes it valuable for prompt testing, AI experimentation, and future benchmarking features.

This project also highlights backend engineering skills such as API design, multi-provider integration, exception handling, and building a developer-friendly architecture that can be extended over time.

## Future improvements

- Add support for more models.
- Save prompt and response history.
- Add response scoring and benchmarking.
- Improve UI with richer comparison views.
- Introduce authentication and persistence for saved sessions.

## Getting Started

### Prerequisites

- Java
- Node.js and npm
- Ollama installed locally
- DeepSeek-R1:1.5B model pulled in Ollama
- OpenAI API key configured for Spring Boot

### Backend setup

1. Configure the OpenAI API key in the Spring Boot application configuration.
2. Ensure Ollama is running locally.
3. Make sure the DeepSeek-R1:1.5B model is available in Ollama.
4. Start the Spring Boot backend.

### Frontend setup

1. Install dependencies.
2. Start the React development server.
3. Open the application in the browser and enter a prompt.
