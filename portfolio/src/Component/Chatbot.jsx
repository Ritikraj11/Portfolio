import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';
import './Chatbot.css';

const starterMessages = [
  {
    id: 1,
    sender: 'bot',
    text: 'Hi! I am your portfolio assistant. I can help you explore my work, services, or get in touch.',
  },
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const quickReplies = useMemo(
    () => ['Projects', 'Services', 'Contact', 'Hire me'],
    []
  );

  const getBotReply = (value) => {
    const normalized = value.toLowerCase();

    if (normalized.includes('project') || normalized.includes('work')) {
      return 'I have a collection of modern React projects and UI builds. I can guide you to the portfolio section right away.';
    }

    if (normalized.includes('service') || normalized.includes('help')) {
      return 'I can help with frontend development, responsive UI/UX, portfolio websites, and landing pages.';
    }

    if (normalized.includes('contact') || normalized.includes('reach')) {
      return 'You can jump straight to the contact page to send a message or connect with me.';
    }

    if (normalized.includes('hire') || normalized.includes('job')) {
      return 'I am available for freelance and full-time opportunities. Let us talk about your idea.';
    }

    return 'Thanks for asking! I can share details about projects, services, or how to contact me.';
  };

  const handleSend = (customValue) => {
    const value = (customValue ?? input).trim();
    if (!value) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: value,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getBotReply(value),
      };

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);

      if (value.toLowerCase().includes('contact')) {
        navigate('/contact');
      }

      if (value.toLowerCase().includes('hire') || value.toLowerCase().includes('job')) {
        navigate('/Hireme');
      }
    }, 800);
  };

  return (
    <div className="chatbot-widget">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)} aria-label="Open chatbot">
          <FaCommentDots />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FaRobot />
              <span>Portfolio Assistant</span>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chat-bubble ${message.sender}`}>
                {message.text}
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble bot typing">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-replies">
            {quickReplies.map((reply) => (
              <button key={reply} onClick={() => handleSend(reply)}>
                {reply}
              </button>
            ))}
          </div>

          <form
            className="chatbot-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit" aria-label="Send message">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
