import React, { useState } from 'react';
import ProjectCard from "../components/ProjectCard";
import PageHeader from "../components/PageHeader.js";
import myProjects from "../data/myProjects.json";
import groups from "../data/groups.json";
import "../components/Style.css";



import "../components/Style.css";


const MyResults = ({ data, expandedTitle, setExpandedTitle }) => {
  return (
    <div className="search-results">
      {myProjects.map((project, index) => {
        const group = groups.find(g => g.groupId === project.groupId);

        return (
          <ProjectCard
            key={index}
            title={project.title}
            projectId={project.projectId}
            groupId={project.groupId}
            members={project.members}
            genres={project.genres}
            instruments={project.instruments}
            image={project.image}
            runtime={project.runtime}
            creationDate={project.creationDate}
            isExpanded={expandedTitle === project.title}
            onExpand={() => setExpandedTitle(project.title)}
            onCollapse={() => setExpandedTitle(null)}
            blurred={expandedTitle !== null && expandedTitle !== project.title}
            search={false}
            audioFile={project.audioFile}
            groupName={group?.name || "Unknown Group"}
            groupMembers={group?.members || []}
          />
        );
      })}
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
