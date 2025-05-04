const chatForm = document.getElementById('chat-form')
const chatMessages = document.getElementById('chat-box')
const chatInput = document.getElementById('chat-input')

// Função para imprimir mensagens no DOM
function appendMessage(sender, text, className) {
  const msg = document.createElement('div')
  msg.className = `message ${className}`
  // msg.innerText = text
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatMessages.appendChild(msg)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

// Evento de envio do formulário
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const userMsg = chatInput.value.trim()
  if (!userMsg) return
  // Adiciona a mensagem do usuário ao chat visualmente
  appendMessage("Você", userMsg, 'user-message')
  // Limpa o input
  chatInput.value = ''

  // Envia a mensagem via POST para a API
  try {
    const response = await fetch('https://chatbot-flask-44as.onrender.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg })
    })
    
    const data = await response.json()
    // Exibe a resposta do bot no chat
    appendMessage("FURIA BOT", data.response, 'bot-message')
  } catch (err) {
    appendMessage('Erro ao se comunicar com o bot.', 'bot-message')
  }
})
