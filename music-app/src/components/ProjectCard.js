import React, { useState, useRef } from "react";
import "./ProjectCard.css";
import groupsData from "../data/groups.json"; // adjust path!
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HistoryIcon from '@mui/icons-material/History';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import Feedback from './FeedbackCard';

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
  const [showUploadForm, setShowUploadForm] = useState(false);
  const audioRef = useRef(null);


  const [feedback, setFeedback] = useState({ show: false, message: '', type: 'success' });

  const closeFeedback = () => {
    setFeedback(prev => ({ ...prev, show: false }));
  };

  console.log(audioHistory)

  const handleCardClick = (e) => {
    if (e.target.closest('audio, .audio-player, .card-button, .feedback')) return;
    if (isExpanded) {
      onCollapse();
      setShowHistory(false);
      setShowUploadForm(false);
    } else onExpand();
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
        setFeedback({
          show: true,
          message: "Failed to add project",
          type: "error"
        });
        throw new Error(errorData.error || "Failed to add project");
      }

      console.log("Project added successfully!");
      setFeedback({
        show: true,
        message: "Project added successfully!",
        type: "success"
      });
    } catch (error) {
      setFeedback({
        show: true,
        message: "Failed to add project",
        type: "error"
      });
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
        setFeedback({
          show: true,
          message: "Failed to apply to group",
          type: "error"
        });
        throw new Error(errorData.error || "Failed to apply to group");
      }

      console.log("Applied to group successfully!");
      setFeedback({
        show: true,
        message: "Applied to group successfully!",
        type: "success"
      });
    } catch (error) {
      console.error("Error applying to group:", error.message);
      setFeedback({
        show: true,
        message: "Failed to apply to group",
        type: "error"
      });
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
                controlsList="nodownload noplaybackrate"
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
                  controlsList="nodownload noplaybackrate"
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
                {!search && (
                  <button
                    className="card-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUploadForm(prev => !prev);
                    }}
                    title="Upload Audio Version"
                  >
                    <AddIcon />
                  </button>
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
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <audio
                          controls
                          className="audio-history-player"
                          controlsList="nodownload noplaybackrate"
                        >
                          <source src={entry.file} type="audio/m4a" />
                          <source src={entry.file.replace(".m4a", ".mp3")} type="audio/mp3" />
                          <source src={entry.file.replace(".m4a", ".ogg")} type="audio/ogg" />
                          Your browser does not support the audio element.
                        </audio>
                        {!search && (
                          <IconButton
                            onClick={(e) => e.stopPropagation()}
                            component="a"
                            href={entry.file}
                            download
                            size="small"
                            sx={{ color: "inherit" }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!search && isExpanded && showUploadForm && (
                <div
                  className="audio-history-dropdown"
                  onClick={(e) => e.stopPropagation()} // prevent card collapse
                  style={{ marginTop: "1rem", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "8px" }}
                >
                  <form
                    className="upload-history-form"
                    onSubmit={async (e) => {
                      e.preventDefault();

                      const formData = new FormData();
                      const file = e.target.elements.audioFile.files[0]; // Get selected file
                      const label = e.target.elements.label.value; // Get label value

                      // Check if file is selected
                      if (!file) {
                        return alert("Please select an audio file.");
                      }

                      // Append the form data with file and label
                      formData.append("file", file); // 'file' matches the field expected by the server
                      formData.append("title", label); // 'title' should match the field name on the server

                      try {
                        // Make POST request to the server to upload the audio history
                        const response = await fetch(`http://localhost:3001/api/add-audio-history/${projectId}`, {
                          method: "POST",
                          body: formData,
                        });

                        if (!response.ok) {
                          const errorData = await response.json();
                          setFeedback({
                            show: true,
                            message: "Failed to upload audio",
                            type: "error"
                          });
                          throw new Error(errorData.error || "Upload failed");
                        }

                        console.log("Audio uploaded successfully");
                        setFeedback({
                          show: true,
                          message: "Audio uploaded successfully!",
                          type: "success"
                        });
                        setShowUploadForm(false); // Hide form after upload
                        // window.location.reload(); // Refresh to reflect the new version
                      } catch (error) {
                        setFeedback({
                          show: true,
                          message: "Failed to upload audio",
                          type: "error"
                        });
                        console.error("Error uploading audio history:", error.message);
                      }
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                  >
                    <input type="file" name="audioFile" accept="audio/*" required />
                    <input type="text" name="label" placeholder="Optional label" />
                    <button type="submit" className="card-button">Upload</button>
                  </form>
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

          {feedback.show && (
            <Feedback
              message={feedback.message}
              type={feedback.type}
              onClose={closeFeedback}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
