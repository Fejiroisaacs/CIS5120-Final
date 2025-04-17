import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import HomePage from './pages/HomePage'; 
import CreatePage from './pages/CreatePage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import MusicPage from './pages/MusicPage';
import GroupsPage from './pages/GroupsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="music" element={<MusicPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}