import { useRef, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://portfolio-h6a2.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.user_name,
          email: formData.user_email,
          message: formData.message
        })
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Failed to send message');

      alert('✅ Message sent successfully!');
      formRef.current.reset();
      setFormData({ user_name: '', user_email: '', message: '' });
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: 'What type of projects do you work on?',
      answer:
        'I specialize in full-stack web applications using React, Node.js, and modern technologies. I focus on creating responsive, secure, and user-friendly applications.'
    },
    {
      question: 'Are you available for internships?',
      answer:
        "Yes! I'm actively seeking internship opportunities where I can contribute to meaningful projects while continuing to learn and grow as a developer."
    },
    {
      question: 'How quickly do you respond?',
      answer:
        'I typically respond to emails and messages within 24 hours. For urgent matters, feel free to reach out via WhatsApp for a quicker response.'
    },
    {
      question: 'Do you work remotely?',
      answer:
        'Absolutely! I\'m comfortable working remotely and have experience collaborating with distributed teams using modern communication and project management tools.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="contact-section">
      <h2 style={{color: "White"}}>Contact Me</h2>

      <div className="decor-frame">
      <div className="contact-container">
        <motion.form ref={formRef} className="contact-form" onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.form>

        <motion.div className="social-links"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
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
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <motion.div key={i} className={`faq-item ${activeIndex === i ? 'active' : ''}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <div className="faq-question" onClick={() => toggleFAQ(i)}>
              <h3>{faq.question}</h3>
              <FaChevronDown className="chevron" />
            </div>
            {activeIndex === i && (
              <motion.div className="faq-answer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <p>{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}

        <div className="whatsapp-contact">
          <a
            href="https://wa.me/917370919305"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            <FaWhatsapp /> Contact me on WhatsApp
          </a>
        </div>
      </div>
      <span className="corner-mark tl" aria-hidden="true"></span>
      <span className="corner-mark br" aria-hidden="true"></span>
      </div>
    </section>
  );
};

export default Contact;
