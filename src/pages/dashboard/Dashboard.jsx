import './Dashboard.css';

import React, { useEffect, useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';
import { useAuthContext } from '../../hooks/useAuthContext';
const Dashboard = () => {
  const theQuery = null;
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [filteredDocs, setFilteredDocs] = useState(null);
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  useEffect(() => {
    if (documents) {
      if (currentFilter === 'all') {
        setFilteredDocs(documents);
      } else if (currentFilter === 'mine') {
        setFilteredDocs(
          documents.filter((doc) => {
            let assignedToMe = false;
            doc.assignedUsersList.map((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
              return true;
            });
            return assignedToMe;
          })
        );
      } else {
        setFilteredDocs(
          documents.filter((doc) => doc.category === currentFilter)
        );
      }
    }
  }, [currentFilter, documents, user]);

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {filteredDocs && <ProjectList projects={filteredDocs} />}
    </div>
  );
};

export default Dashboard;
