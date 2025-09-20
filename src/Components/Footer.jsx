import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaHeart,
} from "react-icons/fa";
import "../Styles/Components/Footer.css";

export default function Footer() {
  return (
    <footer className="footer__container">
      <div className="footer__content">
        {/* About */}
        <div className="footer__section">
          <h2 className="footer__title">School Task Manager</h2>
          <p className="footer__description">
            Streamline your school tasks and enhance collaboration between
            teachers, engineers, and staff.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer__section">
          <h3 className="footer__subtitle">Quick Links</h3>
          <ul className="footer__links">
            <li>Dashboard</li>
            <li>Team Members</li>
            <li>Add New Task</li>
            <li>My Profile</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__section">
          <h3 className="footer__subtitle">Contact Us</h3>
          <p><FaPhoneAlt className="footer__icon" /> +1 (555) 123-4567</p>
          <p><FaEnvelope className="footer__icon" /> support@schooltasks.com</p>
          <p><FaGlobe className="footer__icon" /> www.schooltaskmanager.com</p>
        </div>

        {/* Social */}
        <div className="footer__section">
          <h3 className="footer__subtitle">Follow Us</h3>
          <div className="footer__social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <p>© 2025 School Task Manager. All rights reserved.</p>
        <p>Made with <FaHeart className="footer__heart" /> for education</p>
      </div>
    </footer>
  );
}
