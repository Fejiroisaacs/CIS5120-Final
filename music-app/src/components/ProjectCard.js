import React, { useState, useRef } from "react";
import "./ProjectCard.css";
import groupsData from "../data/groups.json"; // adjust path!
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HistoryIcon from '@mui/icons-material/History';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const ProjectCard = ({
  title,
  projectId,
  groupId,
  groupMembers,
  groupName,
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
  audioHistory = [],
  search,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const audioRef = useRef(null);

  console.log(audioHistory)

  const handleCardClick = (e) => {
    if (e.target.closest('audio, .audio-player, .card-button')) return;
    isExpanded ? onCollapse() : onExpand();
  };

  const handleAddProject = async () => {
    const projectData = {
      title,
      projectId,
      groupId,
      genres,
      instruments,
      image,
      runtime,
      creationDate,
      audioFile,
      audioHistory
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
    const group = groupsData.find(g => g.groupId === groupId);
    if (!group) {
      console.error("Group not found!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/add-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(group)
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
          {groupName && <p className="group-name"><em>by {groupName}</em></p>}
          <div className="text-box">
            <p><strong>Members:</strong></p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {groupMembers.slice(0, 3).map((member, idx) => (
                <li key={idx}>{member}</li>
              ))}
            </ul>
            <div className="tags">
              {genres.map((tag, index) => (
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

          {/* AUDIO PLAYER */}
          {!isExpanded && audioFile && (
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

          {isExpanded && (
            <div className="card-actions">
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

              
              <div className="card-buttons-right">
                {search && (
                  <>
                    <button className="card-button" onClick={handleAddProject}>
                      <AddIcon />
                    </button>
                    <button className="card-button" onClick={handleApplyToGroup}>
                      <GroupAddIcon />
                    </button>
                  </>
                )}

                <button className="card-button" onClick={(e) => {
                  e.stopPropagation();
                  setShowHistory((prev) => !prev);
                }}>
                  {showHistory ? <HistoryToggleOffIcon /> : <HistoryIcon />}
                </button>

                {!search && (
                  <a
                    className="card-button"
                    href={audioFile}
                    download
                    onClick={(e) => e.stopPropagation()}
                    title="Download"
                  >
                    <ArrowCircleDownIcon />
                  </a>
                )}
              </div>

              {/* Toggle audio history */}

                {/* Audio History Dropdown */}
                {isExpanded && showHistory && audioHistory.length > 0 && (
                  <div className="audio-history-dropdown">
                    {audioHistory.map((entry, idx) => (
                      <div key={idx} className="audio-history-item">
                        <p className="history-label">{entry.label || `Version ${idx + 1}`}</p>
                        <audio controls className="audio-history-player">
                          <source src={entry.file} type="audio/m4a" />
                          <source src={entry.file.replace(".m4a", ".mp3")} type="audio/mp3" />
                          <source src={entry.file.replace(".m4a", ".ogg")} type="audio/ogg" />
                          Your browser does not support the audio element.
                        </audio>
                        {!search && (
                          <a
                            href={entry.file}
                            download
                            className="card-button download-button"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Download
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}

          {/* Render audio history
          {showHistory && isExpanded && audioHistory.length > 0 && (
            <div className="audio-history">
              <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
                {audioHistory.map((file, idx) => (
                  <li key={idx}>
                    <a href={file} download className="card-button" onClick={(e) => e.stopPropagation()}>
                      Download Version {idx + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
