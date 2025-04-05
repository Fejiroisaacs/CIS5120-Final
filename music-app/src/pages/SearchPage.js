import React from 'react';
import "../components/Style.css";
import ProjectCard from "../components/ProjectCard";

const SearchPage = () => {
  return (
    <div>
      <div className="search-results">
        <ProjectCard
          title="DISCO PRINCE"
          members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
          tags={["Pop", "Indie"]}
        />
        <ProjectCard
          title="DISCO PRINCE"
          members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
          tags={["Pop", "Indie"]}
        />
        <ProjectCard
          title="DISCO PRINCE"
          members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
          tags={["Pop", "Indie"]}
        />
        <ProjectCard
          title="DISCO PRINCE"
          members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
          tags={["Pop", "Indie"]}
        />
        <ProjectCard
          title="DISCO PRINCE"
          members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
          tags={["Pop", "Indie"]}
        />
      </div>
    </div>
  );
};

export default SearchPage;
