document.addEventListener("DOMContentLoaded", () => {
    const chatMessage = document.getElementById("chat-message");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    const botresponses = {
        hello: "Hello! How can I help you today?",
        hi: "Hi there! How can I assist you?",
        bye: "Goodbye! Have a great day!",
       "who are you":"I am your personal chatbox",
       "open google":window.open("https://www.google.com"),
       "who is your creater?":"sridhar",

        default: "I'm not sure I understand this, could you try asking something else?",
    };

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.classList.add(isUser ? "user-message" : "bot-message");

        const messageText = document.createElement("p");
        messageText.textContent = message;
        messageDiv.appendChild(messageText);

        chatMessage.appendChild(messageDiv);
        chatMessage.scrollTop = chatMessage.scrollHeight;
    }

    function getbotresponses(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        for (const [key, value] of Object.entries(botresponses)) {
            if (lowerMessage.includes(key)) {
                return value;
            }
        }
        return botresponses.default;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = "";
            setTimeout(() => {
                const botReply = getbotresponses(message);
                addMessage(botReply);
            }, 500);
        }
    }

    sendButton.addEventListener("click", sendMessage);

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
