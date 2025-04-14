import React, { useState, useRef } from "react";
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
  blurred,
  audioFile
}) => {


  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleCardClick = (e) => {
    // Don't expand/collapse if clicking on audio controls
    if (e.target.closest('audio, .audio-player')) return;
    isExpanded ? onCollapse() : onExpand();
  };

  const handleAddGroup = async () => {
    const groupData = {
      name: title,
      members,
      tags,
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
        throw new Error(errorData.error || "Failed to add group");
      }
  
      console.log("✅ Group added successfully!");
    } catch (error) {
      console.error("❌ Error adding group:", error.message);
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

              {audioFile && (
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
              
            <button className="add-group-button" onClick={handleAddGroup}>
                Add Group
            </button>
        </div>
      </div>
  </>
  );
};

export default ProjectCard;
