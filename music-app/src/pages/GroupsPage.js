import React from 'react';
import PageHeader from "../components/PageHeader.js";
import "../components/Style.css";
import GroupCard from "../components/GroupCard";
import groups from "../data/groups.json";
import musicProjects from "../data/musicProjects.json";

const GroupsPage = () => {
  return (
    <div>
      <PageHeader title="MY GROUPS" />
      <div className="group-list">
        {groups.map((group, index) => {
          const associatedProjects = musicProjects.filter(
            (project) => project.groupName === group.title
          );

          const genres = [
            ...new Set(associatedProjects.flatMap((p) => p.genres || []))
          ];

          const mostRecent = associatedProjects
            .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))[0];

          return (
            <div key={index} style={{ cursor: "pointer" }}>
              <GroupCard
                key={index}
                name={group.name}
                members={group.members}
                genres={genres}
                audioFile={mostRecent?.audioFile}
                groupId={group.groupId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupsPage;
