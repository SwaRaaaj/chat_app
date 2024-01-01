const swarajSelectorBtn = document.querySelector('#swaraj-selector');
const userSelectorBtn = document.querySelector('#user-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessagesContainer = document.querySelector('.chat-messages-container');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="chat-message ${message.sender.toLowerCase()}-bg ${message.sender === 'user' ? 'user-message' : ''}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessagesContainer.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = 'swaraj';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  swarajSelectorBtn.classList.toggle('active-person', name === 'swaraj');
  userSelectorBtn.classList.toggle('active-person', name === 'user');

  chatInput.focus();
};

swarajSelectorBtn.addEventListener('click', () => updateMessageSender('swaraj'));
userSelectorBtn.addEventListener('click', () => updateMessageSender('user'));

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  chatMessagesContainer.innerHTML += createChatMessageElement(message);
  chatInputForm.reset();
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessagesContainer.innerHTML = '';
});
