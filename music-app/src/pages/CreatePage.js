import React, { useState } from "react";
import PageHeader from "../components/navbar/PageHeader.js";
import "../components/Style.css";
import "../components/create.css"; 

const CreatePage = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    members: "",
    tags: "",
    image: null,
    audio: null
  });

  const handleChange = (e) => {
    setProjectData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setProjectData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", projectData.title);
    formData.append("members", projectData.members);
    formData.append("tags", projectData.tags);
    formData.append("image", projectData.image);
    formData.append("audio", projectData.audio);
  
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
    <div className="create-pagoe-container">
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
          <label>Tags:</label>
          <input type="text" name="tags" value={projectData.tags} onChange={handleChange} placeholder="Add tags (comma separated)" />
        </div>

        <div className="form-group file-upload">
          <label>Upload Cover Image:</label>
          <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
        </div>

        <div className="form-group file-upload">
          <label>Upload Audio Track:</label>
          <input type="file" name="audio" onChange={handleFileChange} accept="audio/*" />
        </div>

        <button type="submit" className="submit-btn">Create Project</button>
      </form>
    </div>
    </div>
  );
};

export default CreatePage;