"use client";
import styles from "./page.module.css";
import { useState, useRef, ChangeEvent } from "react";

interface ChunkInfo {
  currentChunk: number;
  totalChunks: number;
  hasMoreChunks: boolean;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChat = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || error?.message || "Request failed");
      }

      const data = await res.json();
      setResponse(
        typeof data?.response === "string"
          ? data.response
          : JSON.stringify(data)
      );
    } catch (error) {
      console.error("Chat error:", error);
      setResponse((error as Error)?.message || "Error processing request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.mainContent}>
        <div className={styles.headerAnimation}>
          <div className={styles.logo}>{/* You can place your logo here */}</div>
          <h1 className={styles.animatedTitle}>
            <span className={styles.titlePart}>Ai chat model </span>
            <span className={styles.titleAccent}> NeXtGenXsAi</span>
          </h1>
          <p className={styles.subtitle}>
           New era of AI chat model with openrouter
          </p>
        </div>
        
        <div className={styles.chatContainer}>
          <div className={styles.chatLayout}>
            <div className={styles.inputSection}>
              <div className={styles.fileUploadArea}>
                <div className={styles.inputGroup}>
                  <textarea
                    className={styles.input}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    id="chat-input"
                  />
                </div>
              </div>
              <button className={styles.button} onClick={() => handleChat()} disabled={loading}>
                {loading ? "Loading..." : "Send"}
              </button>
            </div>
            
            <div className={styles.responseSection}>
              {response ? (
                <div className={styles.response}>
                  <h2>Response:</h2>
                  <div className={styles.responseContent}>
                    <pre>{response}</pre>
                  </div>
                </div>
              ) : (
                <div className={styles.responsePlaceholder}>
                  <p>Ask a question to get started...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <footer className={styles.footer}>
        <p>Powered by NextGenXsAI's Organization</p>
      </footer>
    </div>
  );
}