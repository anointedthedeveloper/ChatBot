from flask import Flask, render_template, request, jsonify
import random
import time

app = Flask(__name__)

class PremiumChatBot:
    def __init__(self):
        self.name = "ProtoBot AI"
        self.developer = "AnointedTheDeveloper"
        self.version = "Prototype v1.0"
        
    def respond(self, message):
        message = message.lower()
        
        # Enhanced response logic
        if any(word in message for word in ['hello', 'hi', 'hey', 'greetings']):
            responses = [
                "Hello! Welcome to the prototype interface.",
                "Hi there! This is a demonstration version.",
                "Greetings! Testing prototype functionality."
            ]
        elif any(word in message for word in ['how are you', 'how do you do']):
            responses = [
                "System operational. Running in prototype mode.",
                "All systems nominal. This is a preview version.",
                "Functioning within expected parameters for a prototype."
            ]
        elif any(word in message for word in ['your name', 'who are you']):
            responses = [
                f"I am {self.name}, an AI prototype demonstration.",
                f"This is {self.name}, a prototype AI assistant.",
                f"Designation: {self.name}. Current status: Prototype"
            ]
        elif 'developer' in message or 'created' in message:
            responses = [
                f"This prototype was developed by {self.developer}",
                f"System creator: {self.developer}",
                f"Development credits: {self.developer}"
            ]
        elif 'prototype' in message or 'demo' in message:
            responses = [
                "Affirmative. This is a prototype build with limited capabilities.",
                "Correct. This interface represents a demonstration version.",
                "Prototype status confirmed. Feature set is currently limited."
            ]
        elif any(word in message for word in ['bye', 'exit', 'quit', 'goodbye']):
            responses = [
                f"Session terminated. Prototype developed by {self.developer}",
                "Shutting down prototype interface. Thank you for testing.",
                "Ending demonstration. This was a prototype build."
            ]
        elif 'help' in message:
            responses = [
                "Available prototype commands: greetings, inquiries about system status, developer information, or general conversation.",
                "Prototype capabilities: basic conversation, system information, demonstration of core functionality.",
                "This prototype can discuss its purpose, developer, and engage in basic dialogue."
            ]
        else:
            responses = [
                "Processing query in prototype mode...",
                "Analyzing input with current prototype capabilities...",
                "Prototype systems engaged. Continuing conversation...",
                "Demonstrating response generation capabilities...",
                "Prototype AI processing complete. Response generated."
            ]
        
        response = random.choice(responses)
        
        # Add prototype identifier
        identifier = random.choice([
            " • Prototype System",
            " • Demo Version",
            " • Preview Build"
        ])
        
        return response + identifier

bot = PremiumChatBot()

@app.route('/')
def home():
    return render_template('index.html', 
                         bot_name=bot.name,
                         developer=bot.developer,
                         version=bot.version)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    
    # Simulate AI processing time
    processing_time = random.uniform(0.3, 1.2)
    time.sleep(processing_time)
    
    bot_response = bot.respond(user_message)
    
    return jsonify({
        'response': bot_response,
        'processing_time': f"{processing_time:.2f}s"
    })

if __name__ == '__main__':
    print("🚀 Premium Prototype Chatbot Initializing...")
    print(f"💻 Developed by {bot.developer}")
    print("🔬 PROTOTYPE VERSION - LIMITED FUNCTIONALITY")
    app.run(debug=True)