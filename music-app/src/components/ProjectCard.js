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
  
  const toggleAudio = (e) => {
    e.stopPropagation(); // Prevent card click handler from firing
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

            {/* Audio Player */}
            {audioFile && (
              <div className="audio-player" onClick={toggleAudio}>
              <button className="play-button">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <audio 
                ref={audioRef} 
                onEnded={() => setIsPlaying(false)}
                style={{ display: 'none' }}
              >
                <source src={audioFile} type="audio/m4a" />
                <source src={audioFile.replace('.m4a', '.mp3')} type="audio/mp3" />
                <source src={audioFile.replace('.m4a', '.ogg')} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
