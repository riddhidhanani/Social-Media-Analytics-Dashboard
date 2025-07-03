
import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGlobe,
} from 'react-icons/fa';
import { Nav } from 'react-bootstrap';

const icons = {
  All:       <FaGlobe     className="me-2" />,
  Facebook:  <FaFacebook  className="me-2" />,
  Instagram: <FaInstagram className="me-2" />,
  LinkedIn:  <FaLinkedin  className="me-2" />,
  YouTube:   <FaYoutube   className="me-2" />,
};

const Sidebar = ({ platforms, activePlatform, setActivePlatform }) => {
  return (
    <aside
      className="d-flex flex-column shadow-sm"
      style={{
        width: 260,
        minHeight: '100vh',
        padding: '2rem 1.5rem',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #dee2e6',
        borderTopLeftRadius: '1rem',
        borderBottomLeftRadius: '1rem',
      }}
    >
      <h1 className="fw-bold text-secondary mb-4">Social&nbsp;Insights</h1>

      <Nav variant="pills" className="flex-column gap-2 w-100">
        {platforms.map((platform) => {
          const isActive = activePlatform === platform;

          return (
            <Nav.Item key={platform} className="w-100">
              <Nav.Link
                eventKey={platform}
                onClick={() => setActivePlatform(platform)}
                active={isActive}
                className="d-flex align-items-center rounded px-3 py-2 w-100 text-uppercase fw-semibold m-2"
                style={{
                  fontSize: '1rem',
                  letterSpacing: '.02em',
                  color: isActive ? 'blue' : '#495057',
                  transition: 'background-color .15s, color .15s',
                  textDecoration: 'none',
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              >
                {icons[platform]}
                {platform}
              </Nav.Link>
              <hr />
            </Nav.Item>
          );
        })}
      </Nav>
    </aside>
  );
};

export default Sidebar;
