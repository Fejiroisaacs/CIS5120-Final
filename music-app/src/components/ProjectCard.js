import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ title, members, tags }) => {
  return (
    <div className="music-card">
      <div className="card-right">
        <h2 className="project-title">{title}</h2>
        <div className="members-box">
          <strong>MEMBERS:</strong>
          <ul>
            {members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
        <div className="tags-box">
          <strong>TAGS:</strong>
          <p>{tags.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
