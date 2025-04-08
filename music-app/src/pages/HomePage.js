import React from 'react';
import ProjectCard from "../components/ProjectCard";
import PageHeader from "../components/navbar/PageHeader.js";
import myProjects from "../data/myProjects.js";


import "../components/Style.css";

const MyResults = ({data}) => {
    return (<div className="search-results">
        {myProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            members={project.members}
            tags={project.genres}
            image={project.image}
          />))}
    </div>)
  }

const HomePage = () => {
    return (
      <div>
        <PageHeader title="MY PROJECTS" />
        <MyResults data={myProjects}/>
      </div>
    );
  };

export default HomePage;
