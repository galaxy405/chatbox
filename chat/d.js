document.addEventListener("DOMContentLoaded", () => {
    const chatMessage = document.getElementById("chat-message");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    const OPENAI_API_KEY = "YOUR_API_KEY_HERE"; // <-- Replace with your actual OpenAI API key

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

    async function getAIResponse(userMessage) {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful chatbot." },
                        { role: "user", content: userMessage },
                    ],
                }),
            });

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Sorry, something went wrong while getting my response.";
        }
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = "";
            const botReply = await getAIResponse(message);
            addMessage(botReply);
        }
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
