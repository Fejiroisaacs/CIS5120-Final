import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import HomePage from './pages/HomePage'; 
import CreatePage from './pages/CreatePage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import MusicPage from './pages/MusicPage';
import ChatPage from './pages/ChatPage';
import ProjectCard from "./components/ProjectCard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="music" element={<MusicPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>

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