const responses = {
    "grading policy": "Your grade is based on assignments (40%), quizzes (20%), projects (30%), and participation (10%).",
    "office hours": "Office hours are Monday and Wednesday from 2 PM to 4 PM.",
    "due dates": "Assignments are due every Friday at 11:59 PM.",
    "textbook": "The required textbook is 'Professional Cooking' by Wayne Gisslen, 9th Edition.",
    "default": "Please check the syllabus for more details."
};

function addMessage(text, sender) {
    const chatBody = document.getElementById("chat-body");
    const messageDiv = document.createElement("div");
    messageDiv.innerText = text;
    chatBody.appendChild(messageDiv);
}

function handleUserInput() {
    const inputField = document.getElementById("chat-input");
    const userText = inputField.value.trim().toLowerCase();
    if (userText === "") return;
    addMessage("You: " + userText, "user");

    let botResponse = responses["default"];
    for (const key in responses) {
        if (userText.includes(key)) {
            botResponse = responses[key];
            break;
        }
    }

    setTimeout(() => addMessage("Bot: " + botResponse, "bot"), 1000);
    inputField.value = "";
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        handleUserInput();
    }
}
