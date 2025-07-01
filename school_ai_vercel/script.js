const chatbox = document.getElementById("chatbox");
const input = document.getElementById("input");

let userName = localStorage.getItem("userName") || null;
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

const responses = {
  "hello": () => `Hi ${userName || "there"}! Ask me anything about school.`,
  "what's my name": () => userName ? `Your name is ${userName}` : "I don't know your name yet. Say: my name is [your name]",
  "how to improve in math": () => "Practice daily, master the concepts, not just formulas.",
  "how to improve in english": () => "Read books, write essays, learn new words.",
  "how to improve in science": () => "Revise your notes, ask questions, experiment at home!",
  "how to improve in ict": () => "Practice typing, coding, and explore tech tools.",
  "how to improve in arabic": () => "Read stories, practice grammar, and memorize rules.",
  "how to improve in islamic": () => "Read Quran, study Hadith, and understand values.",
  "how to improve in social": () => "Make mind maps, timelines, and watch history videos.",
  "todo": () => "To add a task, say: todo [your task here]",
  "list": () => todoList.length ? "Your to-do list: " + todoList.map((t, i) => `\n${i + 1}. ${t}`).join('') : "Your to-do list is empty.",
};

function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;
  displayMessage("You: " + msg, "user");
  input.value = "";

  const lower = msg.toLowerCase();

  if (lower.startsWith("my name is")) {
    userName = msg.substring(11).trim();
    localStorage.setItem("userName", userName);
    displayMessage(`Bot: Nice to meet you, ${userName}!`, "bot");
  } else if (lower.startsWith("gpa")) {
    const grades = lower.split(" ").slice(1).map(Number).filter(n => !isNaN(n));
    if (grades.length) {
      const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
      displayMessage("Bot: Your GPA is " + avg.toFixed(2), "bot");
    } else {
      displayMessage("Bot: Please enter valid numbers. Example: gpa 90 80 70", "bot");
    }
  } else if (lower.startsWith("todo")) {
    const task = msg.substring(5).trim();
    todoList.push(task);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayMessage("Bot: Task added ✅", "bot");
  } else {
    const reply = responses[lower] ? responses[lower]() : "Bot: I don't understand that yet. Try asking how to improve in a subject, or use 'gpa', 'todo', or 'list'.";
    displayMessage("Bot: " + reply, "bot");
  }
}

function displayMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = "message " + className;
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}
