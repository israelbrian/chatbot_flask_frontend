const chatFormSubmit = document.getElementById('chatFormSubmit')
const chatMessageBox = document.getElementById('chatMessageBox')
const userInput = document.getElementById('userInput')

// Função para imprimir mensagens no DOM
function addMessage(sender, text, className) {
  const msg = document.createElement('div')
  msg.className = `message ${className}`
  // msg.innerText = text
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatMessageBox.appendChild(msg)
  chatMessageBox.scrollTop = chatMessageBox.scrollHeight
}

// Evento de envio do formulário
chatFormSubmit.addEventListener('submit', async (e) => {
  e.preventDefault()
  const userMessage = userInput.value.trim()
  if (!userMessage) return
  // Adiciona a mensagem do usuário ao chat visualmente
  addMessage("Você", userMessage, 'user-message')
  // Limpa o input
  userInput.value = ''

  // Envia a mensagem via POST para a API
  try {
    const response = await fetch('https://chatbot-flask-44as.onrender.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    })
    
    const data = await response.json()
    // Exibe a resposta do bot no chat
    addMessage("FURIA", data.response, 'bot-message')
  } catch (err) {
    addMessage('Erro ao se comunicar com o servidor.', 'bot-message')
  }
})
