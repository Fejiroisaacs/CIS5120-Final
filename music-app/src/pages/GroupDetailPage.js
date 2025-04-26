import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import groups from "../data/groups.json";
import projects from "../data/musicProjects.json";
import ProjectCard from "../components/ProjectCard";
import "./GroupDetailPage.css";


const GroupDetailPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [expandedTitle, setExpandedTitle] = useState(null);

  useEffect(() => {
    const foundGroup = groups.find((g) => g.groupId === groupId);
    setGroup(foundGroup);
  }, [groupId]);

  if (!group) {
    return <div className="group-detail-loading">Loading or group not found...</div>;
  }

  const groupProjects = projects.filter((p) => group.projectIds.includes(p.projectId));
  const genres = [
    ...new Set(groupProjects.flatMap((p) => p.genres || []))
  ];
  console.log(groupProjects);

  return (
    <div className="group-detail-page">
      <h1 className="group-title">{group.name}</h1>

      <div className="tag-section">
        <h3>Genres</h3>
        <div className="tag-box">
          {genres.length > 0 ? genres.map((genre, idx) => (
            <span key={idx} className="tag">{genre}</span>
          )) : <span className="tag-empty">No genres found</span>}
        </div>
      </div>

      <div className="tag-section">
        <h3>Members</h3>
        <div className="tag-box">
          {group.members.map((member, idx) => (
            <span key={idx} className="tag">{member}</span>
          ))}
        </div>
      </div>

      <div className="project-section">
        <h3>Projects</h3>
        {groupProjects.length > 0 ? groupProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            members={project.members}
            genres={project.genres}
            instruments={project.instruments}
            image={project.image}
            runtime={project.runtime}
            creationDate={project.creationDate}
            isExpanded={expandedTitle === project.title}
            onExpand={() => setExpandedTitle(project.title)}
            onCollapse={() => setExpandedTitle(null)}
            blurred={false}
            search={false}
            audioFile={project.audioFile}
            groupName={group.name}
            groupMembers={group.members}
          />
        )) : <p>No projects found.</p>}
      </div>
    </div>
  );
};

export default GroupDetailPage;
