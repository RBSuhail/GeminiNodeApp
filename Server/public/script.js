document.getElementById('chatForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const questionInput = document.getElementById('question');
    const question = questionInput.value;
    const chatBox = document.getElementById('chatBox');
  
    // Display user's message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = question;
    chatBox.appendChild(userMessage);
  
    // Clear input
    questionInput.value = '';
  
    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Fetch bot's response
    try {
      const response = await fetch(`/api/content?question=${encodeURIComponent(question)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const data = await response.json();
      
      // Display bot's response
      const botMessage = document.createElement('div');
      botMessage.className = 'message bot-message';
      botMessage.textContent = data.result || "Error: No response from the bot.";
      chatBox.appendChild(botMessage);
  
      // Scroll to the latest message
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'message bot-message';
      errorMessage.textContent = "Error: Unable to fetch response.";
      chatBox.appendChild(errorMessage);
    }
  });
  