import React from 'react';
import Avatar from '../../components/Avatar';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

const ProjectSummary = ({ project }) => {
  const { deleteDocument } = useFirestore('projects');
  const { user } = useAuthContext();
  let displayBtn = user.uid === project.createdBy.id ? true : false;
  let navigate = useNavigate();
  const handleClick = (e) => {
    deleteDocument(project.id);
    navigate('/');
  };
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By: {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to: </h4>

        <div className="assigned-users">
          {project.assignedUsersList.map((user) => {
            return (
              <div key={user.id}>
                <Avatar src={user.photoURL} />
              </div>
            );
          })}
        </div>
      </div>
      {displayBtn && (
        <button onClick={handleClick} className="btn">
          Mark as complete
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
