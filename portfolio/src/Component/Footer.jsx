const Footer = () => (
  <footer style={styles.footer}>
    <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
  </footer>
);

const styles = {
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#222',
    color: '#fff',
    marginTop: '2rem'
  }
};

export default Footer;
