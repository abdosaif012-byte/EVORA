import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FiTrash2, FiX } from "react-icons/fi";
import "../CSS/chatbot.css";

export function Chatbot({ forceOpen = false }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(forceOpen);
  const messagesEndRef = useRef(null);

  // Load previous chat when chatbot opens, default greeting if empty
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem("evoraChat");
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading evoraChat from localStorage", e);
    }
    return [
      {
        sender: "Evora AI",
        text: "Welcome to ÉVORA. How can I help you today? Ask me for an outfit under any budget (e.g., outfit under 10k)!",
        products: [],
        total: 0,
      },
    ];
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Save to localStorage on any message update
  useEffect(() => {
    try {
      localStorage.setItem("evoraChat", JSON.stringify(messages));
    } catch (e) {
      console.error("Error saving evoraChat to localStorage", e);
    }
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    const newUserMessage = {
      sender: "user",
      text: userMessage,
      products: [],
      total: 0,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: updatedMessages,
        }),
      });

      const data = await response.json();

      const aiMessage = {
        sender: "Evora AI",
        text:
          data.reply?.message ||
          "Here are the product recommendations for you.",
        products: data.reply?.products || [],
        total: data.reply?.total || 0,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        sender: "Evora AI",
        text: "Sorry, I couldn't connect to the chatbot server. Please ensure the Python chatbot backend is running.",
        products: [],
        total: 0,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  const openProduct = (id) => {
    navigate(`/products/${id}`);
  };

  const clearChat = () => {
    const initialMsg = [
      {
        sender: "Evora AI",
        text: "Chat history cleared. How can I help you today?",
        products: [],
        total: 0,
      },
    ];
    setMessages(initialMsg);
    localStorage.setItem("evoraChat", JSON.stringify(initialMsg));
  };

  return (
    <>
      {/* Floating Launcher Button on Bottom Right */}
      <button
        className="chatbot-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        title="Chat with ÉVORA AI"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <FiX /> : <RiCustomerServiceFill />}
      </button>

      {/* Floating Chat Window on Bottom Right */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header Bar */}
          <div className="chatbot-header-bar">
            <div className="chatbot-header-info">
              <span className="chatbot-label">ÉVORA</span>
              <h1>AI ASSISTANT</h1>
            </div>

            <div className="chatbot-header-actions">
              <button
                className="chatbot-action-btn"
                onClick={clearChat}
                title="Clear Chat History"
              >
                <FiTrash2 />
              </button>
              <button
                className="chatbot-action-btn"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "chat-message user-message"
                    : "chat-message ai-message"
                }
              >
                <div className="message-sender">
                  {msg.sender === "user" ? "YOU" : "ÉVORA AI"}
                </div>

                <div className="message-text">{msg.text}</div>

                {/* Products */}
                {msg.products && msg.products.length > 0 && (
                  <div className="chat-products">
                    {msg.products.map((product) => (
                      <div className="chat-product-card" key={product.id}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="chat-product-image"
                        />

                        <div className="chat-product-info">
                          <span className="chat-product-category">
                            {product.category || "ÉVORA COLLECTION"}
                          </span>
                          <h2>{product.title}</h2>
                          <p className="chat-product-price">
                            {Number(product.price).toLocaleString()} EGP
                          </p>

                          <button
                            className="chat-product-button"
                            onClick={() => openProduct(product.id)}
                          >
                            VIEW PRODUCT
                          </button>
                        </div>
                      </div>
                    ))}

                    {msg.products.length > 1 && (
                      <div className="chat-total">
                        TOTAL: {Number(msg.total).toLocaleString()} EGP
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-message ai-message">
                <div className="message-sender">ÉVORA AI</div>
                <div className="message-text typing">Typing...</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input-container">
            <div className="chatbot-input-area">
              <input
                type="text"
                placeholder="ASK ÉVORA AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button onClick={sendMessage}>SEND</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
