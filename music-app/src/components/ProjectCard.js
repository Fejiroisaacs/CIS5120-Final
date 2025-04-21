import React, { useState, useRef } from "react";
import "./ProjectCard.css";

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
    if (e.target.closest('audio, .audio-player')) return;
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
    <div className="music-card">
      <div className="content">
        <div className="title">{title}</div>
        <div className="member-list">{members.join(', ')}</div>
        <img src={image} alt={`${title} cover`} className="album-image" />
        </div>

    </div>
  );
};

export default ProjectCard;
