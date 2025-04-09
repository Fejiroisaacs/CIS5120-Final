import React, { useState } from "react";
import "./ProjectCard.css";

const ProjectCard = ({
  title,
  members,
  tags,
  image,
  runtime,
  creationDate,
  isExpanded,
  onExpand,
  onCollapse,
  blurred
}) => {
  const handleCardClick = () => {
    isExpanded ? onCollapse() : onExpand();
  };

  return (
    <>
      {isExpanded && <div className="card-backdrop" onClick={onCollapse} />}
      <div
        className={`music-card ${isExpanded ? "expanded" : ""} ${blurred ? "blurred" : ""}`}
        onClick={handleCardClick}
      >
        <div className="card-left">
          <img src={image} alt={`${title} cover`} className="album-image" />
        </div>
        <div className="card-right">
          <h2>{title}</h2>
          <div className="text-box">
            <p><strong>Members:</strong></p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {members.map((member, idx) => (
                <li key={idx}>{member}</li>
              ))}
            </ul>
            <div className="tags">
              {tags.map((tag, index) => (
                <span className="tag" key={index}>{tag}</span>
              ))}
            </div>
            {isExpanded && (
              <div className="extra-info">
                <p><strong>Runtime:</strong> {runtime}</p>
                <p><strong>Created on:</strong> {creationDate}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
