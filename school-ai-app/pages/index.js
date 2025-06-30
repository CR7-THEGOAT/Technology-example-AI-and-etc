import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  async function sendMessage() {
    if (!input.trim()) return;

    setChat((prev) => [...prev, { user: input }]);
    const userMessage = input;
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await res.json();
    if (data.reply) {
      setChat((prev) => [...prev, { bot: data.reply }]);
    } else {
      setChat((prev) => [...prev, { bot: "Sorry, no response." }]);
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>ChatGPT School Bot</h1>
      <div style={{ border: "1px solid #ddd", padding: 10, minHeight: 200, marginBottom: 10 }}>
        {chat.map((msg, i) =>
          msg.user ? (
            <p key={i} style={{ textAlign: "right" }}>
              <b>You:</b> {msg.user}
            </p>
          ) : (
            <p key={i} style={{ textAlign: "left" }}>
              <b>Bot:</b> {msg.bot}
            </p>
          )
        )}
      </div>
      <input
        style={{ width: "80%", padding: 8 }}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here"
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 8 }}>
        Send
      </button>
    </main>
  );
}