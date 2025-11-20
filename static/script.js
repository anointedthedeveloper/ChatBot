class PremiumChatBot {
    constructor() {
        this.isProcessing = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showWelcomeMessage();
    }

    bindEvents() {
        const sendButton = document.getElementById('sendButton');
        const messageInput = document.getElementById('messageInput');

        sendButton.addEventListener('click', () => this.sendMessage());
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Add ripple effect to button
        this.addRippleEffect(sendButton);
    }

    addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    async sendMessage() {
        if (this.isProcessing) return;

        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        this.isProcessing = true;

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();

            // Remove typing indicator
            this.removeTypingIndicator();

            // Add bot response
            this.addMessage(data.response, 'bot', data.processing_time);

        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage('System error: Prototype connection failed', 'bot');
            console.error('Chat error:', error);
        }

        this.isProcessing = false;
    }

    addMessage(text, sender, processingTime = null) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const avatar = sender === 'user' ? 
            '<div class="message-avatar">👤</div>' :
            '<div class="message-avatar">🤖</div>';

        const meta = processingTime ? 
            `<div class="message-meta">Processed in ${processingTime}</div>` : '';

        messageDiv.innerHTML = `
            ${sender === 'user' ? '' : avatar}
            <div class="message-content">
                <div class="message-text">${this.escapeHtml(text)}</div>
                ${meta}
            </div>
            ${sender === 'user' ? avatar : ''}
        `;

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Add entrance animation
        messageDiv.style.animation = 'messageSlide 0.3s ease-out';
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typingIndicator';

        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <span>Prototype is processing...</span>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    showWelcomeMessage() {
        const welcomeMessages = [
            "System initialized. Prototype interface ready.",
            "AI systems online. Running in demonstration mode.",
            "Prototype chatbot activated. All systems nominal.",
            "Welcome to the prototype interface. Systems operational."
        ];

        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        
        setTimeout(() => {
            this.addMessage(randomMessage, 'bot');
        }, 1000);
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PremiumChatBot();
});

// Add some interactive background effects
document.addEventListener('mousemove', (e) => {
    const particles = document.createElement('div');
    particles.style.position = 'fixed';
    particles.style.left = e.clientX + 'px';
    particles.style.top = e.clientY + 'px';
    particles.style.width = '4px';
    particles.style.height = '4px';
    particles.style.background = 'rgba(0, 102, 255, 0.3)';
    particles.style.borderRadius = '50%';
    particles.style.pointerEvents = 'none';
    particles.style.zIndex = '9999';
    particles.style.animation = 'float 2s ease-out forwards';
    
    document.body.appendChild(particles);
    
    setTimeout(() => {
        particles.remove();
    }, 2000);
});

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);