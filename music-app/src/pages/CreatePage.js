import React, { useState } from "react";
import PageHeader from "../components/navbar/PageHeader.js";
import "../components/Style.css";
import "../components/create.css";  

const genres = ["Rock", "Pop", "Country", "Indie", "Alternative"];
const instruments = ["Vocals", "Guitar", "Piano", "Bass", "Drums"];

const CreatePage = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    members: "",
    tags: "",
    image: null,
    audio: null,
    audioRuntime: null, // New state for runtime
    selectedGenres: [],
    selectedInstruments: []
  });

  const handleChange = (e) => {
    setProjectData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (e, category) => {
    const { checked, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [category]: checked 
        ? [...prevData[category], value] 
        : prevData[category].filter((item) => item !== value)
    }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProjectData((prevData) => ({
      ...prevData,
      [e.target.name]: file
    }));
  
    if (e.target.name === "audio") {
      const audioElement = new Audio(URL.createObjectURL(file));
      audioElement.addEventListener("loadedmetadata", () => {
        const minutes = Math.floor(audioElement.duration / 60);
        const seconds = Math.floor(audioElement.duration % 60);
        const formattedRuntime = `${minutes}m, ${seconds}s`; 
  
        setProjectData((prevData) => ({
          ...prevData,
          audioRuntime: formattedRuntime 
        }));
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", projectData.title);
    formData.append("members", projectData.members);
    formData.append("tags", projectData.tags);
    formData.append("image", projectData.image);
    formData.append("audio", projectData.audio);
    formData.append("audioRuntime", projectData.audioRuntime);
    formData.append("selectedGenres", JSON.stringify(projectData.selectedGenres));
    formData.append("selectedInstruments", JSON.stringify(projectData.selectedInstruments));

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to upload project");
      }

      const data = await response.json();
      console.log("Project created:", data);
      alert("Project successfully uploaded!");
    } catch (error) {
      console.error("Error uploading project:", error);
      alert("Error uploading project. Please try again.");
    }
  };

  return (
    <div className="create-page-wrapper">
      <PageHeader title="Create a Project" />
    <div className="create-page-container">
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label>Project Title:</label>
          <input type="text" name="title" value={projectData.title} onChange={handleChange} required placeholder="Enter project title" />
        </div>

        <div className="form-group">
          <label>Members:</label>
          <input type="text" name="members" value={projectData.members} onChange={handleChange} placeholder="Enter member names" />
        </div>

        <div className="form-group">
          <label>Select Genres:</label>
          <div className="checkbox-group">
            {genres.map((genre) => (
              <label key={genre} className="checkbox-label">
                <input 
                  type="checkbox" 
                  value={genre} 
                  onChange={(e) => handleCheckboxChange(e, "selectedGenres")} 
                  checked={projectData.selectedGenres.includes(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Select Instruments:</label>
          <div className="checkbox-group">
            {instruments.map((instrument) => (
              <label key={instrument} className="checkbox-label">
                <input 
                  type="checkbox" 
                  value={instrument} 
                  onChange={(e) => handleCheckboxChange(e, "selectedInstruments")} 
                  checked={projectData.selectedInstruments.includes(instrument)}
                />
                {instrument}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group file-upload">
          <label>Upload Cover Image:</label>
          <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
        </div>

        <div className="form-group file-upload">
          <label>Upload Audio Track:</label>
          <input type="file" name="audio" onChange={handleFileChange} accept="audio/*" />
        </div>

        {projectData.audioRuntime && (
          <p className="runtime-display">
            Audio Runtime: <strong>{projectData.audioRuntime} seconds</strong>
          </p>
        )}

        <button type="submit" className="submit-btn">Create Project</button>
      </form>
    </div>
    </div>
  );
};

export default CreatePage;