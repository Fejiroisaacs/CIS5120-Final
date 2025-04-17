import React, { useState, useRef } from "react";
import "./GroupCard.css";

const GroupCard = ({ name, members, genres, audioFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.error("Playback error", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group-card">
        <div className="group-info">
            <h2>{name}</h2>
            <div className="group-meta">
            <div className="meta-section tags">
                {genres.map((tag, idx) => (
                <span key={idx} className="group-tag">{tag}</span>
                ))}
            </div>
            </div>
        </div>
        <div className="meta-section members-box">
            <div className="members-list">
                {members.map((member, idx) => (
                    <div key={idx} className="member-name">{member}</div>
                ))}
            </div>
        </div>
    {audioFile && (
        <div className="group-audio-player" onClick={toggleAudio}>
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

  );
};

export default GroupCard;
