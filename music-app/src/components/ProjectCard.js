import React, { useState, useRef } from "react";
import "./ProjectCard.css";
import { Typography } from "@mui/material";

const ProjectCard = ({
  title,
  members,
  genres,
  instruments,
  image,
  runtime,
  creationDate,
  isExpanded,
  onExpand,
  onCollapse,
  blurred,
  audioFile,
  search
}) => {


  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleCardClick = (e) => {
    // Don't expand/collapse if clicking on audio controls
    if (e.target.closest('audio, .audio-player, .card-button')) return;
    isExpanded ? onCollapse() : onExpand();
  };

  const handleAddProject = async () => {
    const projectData = {
      title,
      members,
      genres,
      instruments,
      image,
      runtime,
      creationDate,
      audioFile
    };

    try {
      const response = await fetch("http://localhost:3001/api/add-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add project");
      }

      console.log("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error.message);
    }
  };

  const handleApplyToGroup = async () => {
    const groupData = {
      title,
      members,
      genres,
      instruments,
      image,
      runtime,
      creationDate,
      audioFile
    };

    try {
      const response = await fetch("http://localhost:3001/api/add-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(groupData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to apply to group");
      }

      console.log("Applied to group successfully!");
    } catch (error) {
      console.error("Error applying to group:", error.message);
    }
  };

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`music-card ${blurred ? "blurred" : ""} ${isExpanded ? "expanded" : ""}`} onClick={handleCardClick}>
      <div className="content">
        <div className="title">{title}</div>
        <div className="member-list">{members.join(', ')}</div>
        {isExpanded && (
          <div className="member-list">{"Genres: " + genres.join(', ')}</div>
        )}
        {isExpanded && instruments && (
          <div className="member-list">{"Instruments: " + instruments.join(', ')}</div>
        )}
        <img src={image} alt={`${title} cover`} className={`album-image ${isExpanded ? "expanded" : ""}`} />
        <div className="horiz">
          <div>
            {isExpanded && (
              <div className="extra-info">
                <p><strong>Runtime:</strong> {runtime}</p>
                <p><strong>Created on:</strong> {creationDate}</p>
              </div>
            )}
            {isExpanded && audioFile && (
              <div className="audio-player" onClick={toggleAudio}>
                <audio
                  ref={audioRef}
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  className="audio-element"
                >
                  <source src={audioFile} type="audio/m4a" />
                  <source src={audioFile.replace('.m4a', '.mp3')} type="audio/mp3" />
                  <source src={audioFile.replace('.m4a', '.ogg')} type="audio/ogg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
          <div>
            {isExpanded &&
              search && (
                <div className="card-actions">
                  <span className="card-button" onClick={handleAddProject}>
                    <Typography
                      fontFamily={"Montserrat, sans-serif"}
                      fontSize={"20px"}
                    >Add Project</Typography>
                  </span>
                  <span className="card-button" onClick={handleApplyToGroup}>
                    <Typography
                      fontFamily={"Montserrat, sans-serif"}
                      fontSize={"20px"}
                    >Apply to Group</Typography>
                  </span>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
