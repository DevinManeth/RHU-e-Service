// App.js
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import aiBotImg from '../assets/ai-bot.png'; // Import the AI bot image

// Using inline SVG for the chat icon
const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-message-circle"
  >
    <path d="M7.9 20A9.3 9.3 0 0 1 4 16.1V12a8 8 0 1 1 12 0c0 1.2-.5 2.5-1.7 3.5L12 18l-4.1 2z" />
  </svg>
);

// Using inline SVG for the close icon
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-x"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Using inline SVG for the send icon
const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-send"
  >
    <path d="m22 2-7 18-9-6-2-2 18-7Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const Chatbot = () => {
  // State for the chat messages, user input, and loading status
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // State to control the visibility of the chat popup
  const [isChatOpen, setIsChatOpen] = useState(false); 
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the chat window
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to scroll down whenever a new message is added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { text: input, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // The fetch call to your Flask backend.
      // Make sure the URL matches where your Flask app is running.
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      // Check for a successful response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { text: data.answer, isUser: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('There was an error fetching the data:', error);
      const errorMessage = { text: 'Sorry, I am having trouble connecting.', isUser: false };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans">
      {/* Chat Icon Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-blue-100 text-white rounded-full shadow-lg hover:bg-blue-300 transition-colors duration-200 z-50"
          aria-label="Open Chatbot"
        >
          {/* <ChatIcon /> */}

          <img
          src={aiBotImg}
          alt="Chat Icon"
          className="w-8 h-8"
          />

        </button>
      )}

      {/* Chatbot Popup Container */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-sm h-[70vh] md:h-[60vh] bg-white dark:bg-gray-400 rounded-2xl shadow-xl flex flex-col overflow-hidden border-4 border-white dark:border-gray-700 z-50">
          <header className="flex items-center justify-between p-4 bg-[#006A71] text-white rounded-t-xl shadow-lg">
            <h1 className="text-xl font-bold">University Chatbot</h1>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-full hover:bg-blue-500 transition-colors duration-200"
              aria-label="Close Chatbot"
            >
              <CloseIcon />
            </button>
          </header>

          <main className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-black">
                <p className="text-center">Start a conversation with the university bot!</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl shadow-md ${
                    message.isUser
                      ? 'bg-[#48A6A7] text-white rounded-br-none'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[75%] p-3 rounded-2xl shadow-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                  <div className="flex space-x-1 justify-center items-center">
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </main>

          <form onSubmit={handleSendMessage} className="flex p-4 bg-[#006A71] border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 rounded-full bg-white dark:bg-[#9ACBD0] border-2 border-gray-200  focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 dark:text-black transition-colors duration-200"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="ml-2 p-3 bg-[#9ACBD0] text-white rounded-full shadow-lg hover:bg-[#48A6A7] focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
              disabled={isLoading}
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
