// The HTML structure for the chatbox as a string
const chatHTML = `
  <div class="chatbox-popup" id="chatboxPopup">
    <div class="chatbox-header">
      <span>Chat with us 💬</span>
      <button id="closeChatbox" class="close-button">×</button>
    </div>
    <div class="chatbox-body" id="chatboxBody">
      <div class="msg bot">Hi! How can I help you today?</div>
    </div>
    <div class="chatbox-input-bar">
      <input type="text" id="chatboxInput" placeholder="Type a message...">
      <button id="sendButton">Send</button>
    </div>
  </div>

  <button class="chatbox-toggle" id="chatboxToggle">💬</button>
`;

// when page is ready, put the chat HTML into the chatbox container
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('chatbox-container');
    if (!container) return;
    container.innerHTML = chatHTML;
    initializeChatbox();
})

function initializeChatbox() {
    const chatboxPopup = document.getElementById("chatboxPopup");
    const chatboxToggle = document.getElementById("chatboxToggle");
    const closeChatbox = document.getElementById("closeChatbox");
    const chatboxInput = document.getElementById("chatboxInput");
    const sendButton = document.getElementById("sendButton");
    const chatboxBody = document.getElementById("chatboxBody");

    function toggleChatbox() {
      const isOpen = chatboxPopup.style.display === "block";
      
      if (isOpen) {
        // chat is closing so delete all messages
        chatboxBody.innerHTML = "";

        // add a default welcome message
        const welcome = document.createElement("div");
        welcome.classList.add("msg", "bot");
        welcome.textContent = "Hi! How can I help you today?";
        chatboxBody.appendChild(welcome);
      }

      chatboxPopup.style.display = isOpen ? "none" : "block";
    }

    chatboxToggle.addEventListener("click", toggleChatbox);
    closeChatbox.addEventListener("click", toggleChatbox);

    function addMessage(text, who) {
      const msg = document.createElement("div");
      msg.classList.add("msg", who );
      msg.textContent = text;
      chatboxBody.appendChild(msg);
      chatboxBody.scrollTop = chatboxBody.scrollHeight; // auto-scroll to bottom
    }

    function sendMessage() {
      const text = chatboxInput.value.trim();
      if (!text) return;

      addMessage(text, "user");     // show user message
      chatboxInput.value = "";      // clear box

       // Fake bot reply
      setTimeout(() => {
        addMessage("You said: " + text, "bot");
      }, 400);
    }

    sendButton.addEventListener("click", sendMessage);

    chatboxInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {      //press enter button
        sendMessage();
      }
    });
}