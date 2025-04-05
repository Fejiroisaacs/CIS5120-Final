import BaseLayout from "./components/BaseLayout";
import ProjectCard from "./components/ProjectCard";

function App() {
  return (
    <BaseLayout>
      <h1>Music App 🎶</h1>
      <div style={{ padding: "2rem" }}>
      <ProjectCard
        title="DISCO PRINCE"
        members={["Jake Murphy", "Fejiro Anigboro", "Solomon Graf"]}
        tags={["Pop", "Indie"]}
      />
    </div>
    </BaseLayout>
  );
}

export default App;
