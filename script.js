const responses = {
    // Course Details
    "course number": "The course number for CUL 101: Professional Cooking Foundations is 40371.",
    "credits": "CUL 101 is a 3-credit course.",
    "class format": "This is an online, asynchronous class with scheduled assignments, discussions, and quizzes.",
    "course length": "The course runs for 16 weeks, from February 24, 2025, to June 15, 2025.",
    "start date": "The class begins on February 24, 2025.",
    "end date": "The class ends on June 15, 2025.",

    // Course Objectives & Learning Outcomes
    "course objectives": "By the end of CUL 101, students will be able to identify traits of a professional chef, explain food safety practices, complete mise en place schedules, identify kitchen products and tools, and apply culinary math formulas.",
    "student learning outcomes": "Students will learn to identify the traits of a professional chef and apply culinary math formulas to complete recipe scaling and costing.",

    // Instructor & Contact Information
    "instructor contact": "You can contact Professor Carillo via Canvas Inbox, email at acarrillo74@mtsac.edu, or phone at (909) 274-5982.",
    "office hours": "On-campus office hours: Monday & Wednesday 11:00 AM - 12:00 PM, Tuesday & Thursday 3:00 PM - 4:00 PM. Virtual office hours can be scheduled through TechConnect Zoom.",
    "preferred communication": "The preferred method of communication is the Canvas Inbox.",
    
    // Canvas & Tech Support
    "canvas resources": "Canvas is the online learning management system used to access course materials. Complete the Canvas Orientation Module to get started.",
    "canvas help": "Use the floating blue question mark on the right side of the Canvas screen for help. You can also click Help in Canvas Global Navigation or contact the Mt. SAC IT helpdesk at helpdesk@mtsac.edu, (909) 274-4357.",

    // Grading & Assignments
    "grading policy": "Final grades are based on Discussions (30%), Assignments (30%), Quizzes (25%), Exams (10%), and Participation (5%).",
    "grade breakdown": "Grading includes Discussions (30%), Assignments (30%), Quizzes (25%), Exams (10%), and Participation (5%).",
    "late work": "Late work is not accepted. Submit all assignments on time to avoid grade penalties.",
    "extra credit": "Extra credit is not available in this course.",
    "assignment deadlines": "Assignment due dates are available in the Course Schedule on Canvas.",
    "quiz schedule": "Quizzes are scheduled weekly and can be found in the Course Schedule on Canvas.",
    "discussion requirements": "Weekly discussion topics open Monday at 7:00 AM. Initial responses (150 words) are due by Friday at 11:59 PM, and two responses must be submitted by Sunday at 11:59 PM.",
    
    // Attendance & Participation
    "attendance policy": "Attendance is tracked by participation in online activities. Completing the Course Orientation Module in Week 1 is required to stay enrolled.",
    "participation expectations": "Students are expected to complete all assignments, contribute to discussions, and respond promptly to instructor communication.",
    "no-show policy": "Students who do not complete the Course Orientation Module by the due date will be dropped from the course.",
    
    // AI & Academic Integrity
    "ai usage": "AI can be used for idea generation, research aid, and recipe adaptation, but it should not be used to generate entire assignments.",
    "plagiarism policy": "Plagiarism includes presenting someone else's work as your own, copying from sources without citation, or paraphrasing without credit. Violations may result in a failing grade or further disciplinary action.",
    "turnitin policy": "Turnitin checks for originality. A similarity score under 10% is acceptable. Scores above 20% will be reviewed for potential plagiarism.",
    
    // Dropping & Withdrawal
    "drop deadline": "The last day to drop with a refund is March 7, 2025. The last day to drop without a 'W' is March 9, 2025. The last day to drop with a 'W' is May 2, 2025.",
    "withdrawal policy": "It is the student’s responsibility to drop or withdraw from courses they no longer attend. Failure to drop may result in a failing grade.",
    
    // Required Materials & Technology
    "required textbook": "The required textbook is 'On Cooking' (6th Edition) by Labensky, Hause, and Martel (ISBN: 9780134441900).",
    "technical requirements": "Students need a computer with internet access and should use an updated version of Chrome or Firefox for Canvas.",
    "software requirements": "Adobe Acrobat Reader may be needed for PDF documents. Windows 7 or higher (PC) or OS 10.4 or higher (Mac) is required.",
    
    // Student Support & Resources
    "academic support": "Students can access tutoring, counseling, and support services through the Mt. SAC Student Hub.",
    "early alert system": "This system connects students with campus resources if they need additional support with participation, assignments, or challenges outside class.",
    
    // Course Etiquette & Expectations
    "netiquette": "Use professional language, avoid all caps, and be respectful in online discussions.",
    "course expectations": "Students should actively participate in discussions, complete all assignments, and communicate professionally.",
    
    // Course Schedule
    "syllabus quiz": "The Syllabus Quiz is due during Week 1.",
    "midterm exam": "The midterm covers Chapters 1, 2, 4, 5, and 6 from 'On Cooking' and takes place in Week 8.",
    "final exam": "The final exam covers Chapters 3, 7, 8, 9, and 10 from 'On Cooking' and is due June 13, 2025, at 11:59 PM.",
    
    // Default Response
    "default": "I'm not sure about that. Please check the syllabus in Canvas or contact your instructor for more details."
};


// Function to calculate Levenshtein Distance (edit distance)
function levenshteinDistance(s1, s2) {
    const len1 = s1.length, len2 = s2.length;
    let dp = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1, // Deletion
                dp[i][j - 1] + 1, // Insertion
                dp[i - 1][j - 1] + cost // Substitution
            );
        }
    }
    return dp[len1][len2];
}

// Function to find the best match using fuzzy search
function getBestMatch(userInput) {
    let bestMatch = "default";
    let lowestDistance = Infinity;
    
    for (const key in responses) {
        let distance = levenshteinDistance(userInput, key);
        if (distance < lowestDistance) {
            lowestDistance = distance;
            bestMatch = key;
        }
    }

    // If the match is close (threshold 5), return it, otherwise default response
    return lowestDistance <= 5 ? responses[bestMatch] : responses["default"];
}

// Function to handle user input
function handleUserInput() {
    const inputField = document.getElementById("chat-input");
    const userText = inputField.value.trim().toLowerCase();
    if (userText === "") return;

    addMessage("You: " + userText, "user");

    // Find best match using fuzzy search
    let botResponse = getBestMatch(userText);

    setTimeout(() => addMessage("Bot: " + botResponse, "bot"), 1000);
    inputField.value = "";
}

// Function to add messages to the chat window
function addMessage(text, sender) {
    const chatBody = document.getElementById("chat-body");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerText = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        handleUserInput();
    }
}
