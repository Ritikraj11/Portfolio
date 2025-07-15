import { useRef, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user_name, user_email, message } = formData;
    if (!user_name || !user_email || !message) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: user_name,
        email: user_email,
        message: message
      };

      console.log('📤 Sending data:', payload);

      const response = await fetch('https://portfolio-h6a2.onrender.com/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  body: JSON.stringify(payload)
});

      const result = await response.json();

      if (response.ok) {
        alert('✅ Message sent successfully!');
        formRef.current.reset();
        setFormData({ user_name: '', user_email: '', message: '' });
      } else {
        console.error('❌ Server responded with error:', result);
        alert(result.error || '❌ Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <section className="contact-section">
      <h2>Contact Me</h2>

      <div className="contact-container">
        {/* Contact Form */}
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message or Suggestion"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Social Media */}
        <div className="social-links">
          <h3>Connect with me</h3>
          <div className="social-icons">
            <a href="https://github.com/Ritikraj11" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/ritik-raj-srivastav/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/ritik___323" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
