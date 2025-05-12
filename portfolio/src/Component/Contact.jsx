import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_8la0w88', 'template_qsaeh7i', formRef.current, 'Wjlrb53Ggl3sqB6CE')
      .then(
        (result) => {
          alert('Message sent successfully!');
          formRef.current.reset();
        },
        (error) => {
          alert('Failed to send message. Please try again.');
          console.error(error.text);
        }
      );
  };

  return (
    <section className="contact-section">
      <h2>Contact Me</h2>

      <div className="contact-container">
        {/* Contact Form */}
        <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message or Suggestion" required></textarea>
          <button type="submit">Send Message</button>
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
