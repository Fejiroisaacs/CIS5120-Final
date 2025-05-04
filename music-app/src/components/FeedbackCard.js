// Toast.jsx
import React, { useEffect } from 'react';
import './FeedbackCard.css';

const Feedback = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`feedback ${type}`}>
      <div className="feedback-message">{message}</div>
      <button className="feedback-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Feedback;