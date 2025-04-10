import React, { useState } from 'react';
import ProjectCard from "../components/ProjectCard";
import PageHeader from "../components/navbar/PageHeader.js";
import myProjects from "../data/myProjects.js";
import "../components/Style.css";



import "../components/Style.css";


const MyResults = ({ data, expandedTitle, setExpandedTitle }) => {
  return (
    <div className="search-results">
      {data.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          members={project.members}
          tags={project.genres}
          image={project.image}
          runtime={project.runtime}
          creationDate={project.creationDate}
          isExpanded={expandedTitle === project.title}
          onExpand={() => setExpandedTitle(project.title)}
          onCollapse={() => setExpandedTitle(null)}
          blurred={expandedTitle !== null && expandedTitle !== project.title}
        />
      ))}
    </div>
  );
};

  const HomePage = () => {
    const [expandedTitle, setExpandedTitle] = useState(null); // ✅ Add this
  
    return (
      <div>
        <PageHeader title="MY PROJECTS" />
        <MyResults
          data={myProjects}
          expandedTitle={expandedTitle}
          setExpandedTitle={setExpandedTitle}
        />
      </div>
    );
  };

export default HomePage;
