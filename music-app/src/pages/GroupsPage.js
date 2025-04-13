import React from 'react';
import PageHeader from "../components/navbar/PageHeader.js";
import "../components/Style.css";
import GroupCard from "../components/GroupCard";
import groups from "../data/groups.json";

const GroupsPage = () => {
  return (
    <div>
      <PageHeader title="MY GROUPS" />
      <div className="group-list">
        {groups.map((group, index) => (
          <GroupCard 
            key={index}
            name={group.name}
            members={group.members}
            tags={group.tags}
            audioFile={group.audioFile}
          />
        ))}
      </div>
    </div>
  );
};
export default GroupsPage;
