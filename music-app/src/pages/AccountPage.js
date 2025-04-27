import React, { useState } from 'react';
import PageHeader from "../components/PageHeader.js";
import "../components/Style.css";
import userData from "../data/users.json";
import groupData from "../data/groups.json";
import projectData from "../data/myProjects.json";


const AccountPage = () => {
  const { photo, name, bio, Instruments, Genres } = userData["User Info"];

  const cleanPath = (path) => {
    if (!path) return "";
    return path.startsWith("./") ? path.replace("./", "/") : path;
  };

  const songIDs = userData.projectIds || [];
  const groupIDs = userData.groupIds || [];

  const userProjects = projectData.filter(project => songIDs.includes(project.projectId));
  const userGroups = groupData.filter(group => groupIDs.includes(group.groupId));

  const cleanedProjects = userProjects.map(project => ({
    ...project,
    audioFile: cleanPath(project.audioFile),
    image: cleanPath(project.image),
  }));

  console.log(userGroups);
  console.log(cleanedProjects);


  const [groups, setGroups] = useState(userGroups);
  
  const handleLeaveGroup = (indexToRemove) => {
    const updatedGroups = groups.filter((_, index) => index !== indexToRemove);
    setGroups(updatedGroups);
  };

  return (
    <div>
      <PageHeader title="Profile" />
      <div className="account-container">
        <div className="user-info">
          <img src={photo || "https://via.placeholder.com/100"} alt="User" className="user-photo" />
          <div className="user-details">
            <h2>{name || "No Name Provided"}</h2>
            <p><strong>Bio:</strong> {bio || "No bio available"}</p>
            <p><strong>Instruments:</strong> {Instruments || "N/A"}</p>
            <p><strong>Genres:</strong> {Genres || "N/A"}</p>
          </div>
        </div>

        <div className="whole-section">
          <div className="section">
            <h2>Remix Projects</h2>
            <div className="card-section">
              {cleanedProjects.map((song, index) => (
                <div className="card" key={index}>
                  <img src={song.image || "https://via.placeholder.com/80"} alt="Song" className="card-photo" />
                  <div className="card-details">
                    <p><strong>{song.title || "Untitled"}</strong></p>
                    <p>{song.members.length > 0 ? song.members.join(', ') : "Unknown Artist"}</p>
                    {song.audioFile ? (
                      <audio controls style={{ width: '10vw' }}>
                        <source src={song.audioFile} type="audio/m4a" />
                        <source src={song.audioFile.replace('.m4a', '.mp3')} type="audio/mp3" />
                        <source src={song.audioFile.replace('.m4a', '.ogg')} type="audio/ogg" />
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      <p>No audio available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2>Groups</h2>
            <div className="card-section">
              {groups.map((group, index) => (
                <div className="card" key={index}>
                  <img src={group.photo || "https://via.placeholder.com/80"} alt="Group" className="card-photo" />
                  <div className="card-details">
                    <p><strong>{group.name || "Unnamed Group"}</strong></p>
                    <p><strong>Members:</strong><br />{group.members.length > 0 ? group.members.join(', ') : "No members"}</p>
                    <button className="leave-button" onClick={() => handleLeaveGroup(index)}>
                      Leave Group
                    </button>
                  </div>
                </div>
              ))}
              {groups.length === 0 && <p>No groups</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
