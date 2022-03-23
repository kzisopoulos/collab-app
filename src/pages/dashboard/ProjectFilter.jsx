import React from 'react';
const filterList = ['all', 'mine', 'development', 'infrastructure', 'network'];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => {
          return (
            <button
              className={f === currentFilter ? 'active' : ''}
              key={f}
              onClick={() => handleClick(f)}
            >
              {f}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProjectFilter;
