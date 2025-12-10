import "../pages/UserDetail.css";


import cmLogo from "../assets/cmLogo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <img
        src={cmLogo}
        alt="Chris-Marine Logo"
        className="footer-logo"
      />
      <p className="footer-text">© 2025 Chris-Marine. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
