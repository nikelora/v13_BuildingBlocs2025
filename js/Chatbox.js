// The HTML structure for the chatbox as a string
const chatHTML = `
  <div class="chatbox-popup" id="chatboxPopup">
    <div class="chatbox-header">
      <span>Need some help? 💬</span>
      <button id="closeChatbox" class="close-button">×</button>
    </div>

    <div class="chatbox-body" id="chatboxBody"></div>
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
    //const chatboxInput = document.getElementById("chatboxInput");
    //const sendButton = document.getElementById("sendButton");
    const chatboxBody = document.getElementById("chatboxBody");

    // add options here for chatbox
    const chatboxOptions = [
      {
        label: "More about Mental Health",
        replyText: "You can go to this link:",
        href: "/Pages/Information.html",
        linkText: "Mental Health Information",
      },
      {
        label: "More about SerenityHub",
        replyText: "You can go to this link:",
        href: "/Pages/AboutUs.html",
        linkText: "About SerenityHub",
      },
      {
        label: "Looking for approved clinics?",
        replyText: "You can go to this link:",
        href: "/Pages/Clinics.html",
        linkText: "Available Clinics",
      },
    ];

    function openChatbox() {
      chatboxPopup.style.display = "flex"; // keep flex layout
    }

    function closeChatboxAndReset() {
      chatboxPopup.style.display = "none";
      resetChat();
    }

    function toggleChatbox() {
      const isOpen = chatboxPopup.style.display === "flex";
      if (isOpen) closeChatboxAndReset();
      else openChatbox();
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

    function addBotLinkMessage(prefixText, href, linkText) {
      const msg = document.createElement("div");
      msg.classList.add("msg", "bot");

      const span = document.createElement("span");
      span.textContent = prefixText + " ";

      const a = document.createElement("a");
      a.href = href;
      a.textContent = linkText;
      a.target = "_self";

      msg.appendChild(span);
      msg.appendChild(a);

      chatboxBody.appendChild(msg);
      chatboxBody.scrollTop = chatboxBody.scrollHeight;
    }

    function clearQuickReplies() {
      const existing = chatboxBody.querySelector(".quick-replies");
      if (existing) existing.remove();
    }

    function showQuickReplies() {
      clearQuickReplies();

      const wrap = document.createElement("div");
      wrap.className = "quick-replies";

      chatboxOptions.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "quick-reply-btn";
        btn.type = "button";
        btn.textContent = opt.label;

        btn.addEventListener("click", ()=> {
            // show the chosen option as user message
            addMessage(opt.label, "user");
            clearQuickReplies();

            // bot replies with link
            setTimeout(() => {
              addBotLinkMessage(opt.replyText, opt.href, opt.linkText);

              // show options again
              setTimeout(showQuickReplies, 250);
            }, 200);
        });
         wrap.appendChild(btn);
      });

      chatboxBody.appendChild(wrap);
      chatboxBody.scrollTop = chatboxBody.scrollHeight;
    }

    function resetChat() {
      chatboxBody.innerHTML = "";
      addMessage("Hello! How can I help you?", "bot");
      showQuickReplies();
    }

    // Start state
    resetChat();

    // function sendMessage() {
    //   const text = chatboxInput.value.trim();
    //   if (!text) return;

    //   addMessage(text, "user");     // show user message
    //   chatboxInput.value = "";      // clear box

    //    // Fake bot reply
    //   setTimeout(() => {
    //     addMessage("You said: " + text, "bot");
    //   }, 400);
    // }

    // sendButton.addEventListener("click", sendMessage);

    // chatboxInput.addEventListener("keydown", (e) => {
    //   if (e.key === "Enter") {      //press enter button
    //     sendMessage();
    //   }
    // });
}