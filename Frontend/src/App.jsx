import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [sharedPrompt, setSharedPrompt] = useState('');
  const [responses, setResponses] = useState({
    ollama: '',
    openai: ''
  });
  const [loading, setLoading] = useState({
    ollama: false,
    openai: false
  });

  const models = [
    { id: 'ollama', name: 'Ollama(Deepseek)', color: '#f97316' },
    { id: 'openai', name: 'OpenAI', color: '#22c55e' }
  ];

  const handlePromptChange = useCallback((value) => {
    setSharedPrompt(value);
  }, []);

  const fetchModelResponse = useCallback(async (model, prompt) => {
    try {
      const encodedPrompt = encodeURIComponent(prompt);
      const response = await fetch(
        `http://localhost:8080/api/${model}/${encodedPrompt}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.text();
      return data;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!sharedPrompt.trim()) return;

    setLoading({
      ollama: true,
      openai: true
    });

    setResponses({
      ollama: 'Loading...',
      openai: 'Loading...'
    });

    models.forEach((model) => {
      fetchModelResponse(model.id, sharedPrompt)
        .then((response) => {
          setResponses((prev) => ({
            ...prev,
            [model.id]: response
          }));

          setLoading((prev) => ({
            ...prev,
            [model.id]: false
          }));
        })
        .catch((error) => {
          setResponses((prev) => ({
            ...prev,
            [model.id]: `Error: ${error.message}`
          }));

          setLoading((prev) => ({
            ...prev,
            [model.id]: false
          }));
        });
    });
  }, [sharedPrompt, fetchModelResponse, models]);

  const isLoading = Object.values(loading).some((status) => status);

  return (
    <div className="app-container">
      <div className="hero-section">
        <p className="eyebrow">LLM Comparison Workspace</p>
        <h1>Ollama(Deepseek) vs OpenAI</h1>
        <p className="hero-subtitle">
          Send one prompt and compare responses side by side in a clean, focused interface.
        </p>
      </div>

      <div className="shared-prompt-container">
        <div className="shared-prompt-header">
          <div>
            <h2>Prompt</h2>
            <p>Write once and test both models instantly.</p>
          </div>
        </div>

        <div className="shared-prompt-area">
          <textarea
            placeholder="Ask something like: Explain microservices vs monolith architecture with a real-world example..."
            value={sharedPrompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            disabled={isLoading}
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading || !sharedPrompt.trim()}
            className="submit-all-btn"
          >
            {isLoading ? 'Sending...' : 'Compare Responses'}
          </button>
        </div>
      </div>

      <div className="model-grid">
        {models.map((model) => (
          <div
            key={model.id}
            className="model-box"
            style={{
              borderColor: `${model.color}55`,
              boxShadow: `0 20px 45px rgba(0, 0, 0, 0.28)`
            }}
          >
            <div className="model-header">
              <div className="model-title-wrap">
                <span
                  className="model-dot"
                  style={{ backgroundColor: model.color }}
                ></span>
                <h2 style={{ color: model.color }}>{model.name}</h2>
              </div>
              <span className="model-status">
                {loading[model.id] ? 'Generating' : 'Ready'}
              </span>
            </div>

            <div className="response-area">
              <h3>Response</h3>
              <div className="response-content">
                {responses[model.id] ? (
                  <div className="response-text">{responses[model.id]}</div>
                ) : (
                  <div className="placeholder-text">Response will appear here</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;