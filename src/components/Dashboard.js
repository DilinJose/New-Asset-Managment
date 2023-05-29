import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { employeesData, assetsData } = useSelector(
    (state) => state.dataReducers
  );

  return (
    <div className="background d-flex justify-content-center align-items-center flex-wrap p-5 ">
      <div className="d-flex justify-content-evenly  ">
        <div className=" card m-5 p-4" style={{ width: '50%' }}>
          <div className="card-body d-flex justify-content-center align-items-center flex-column">
            <h3 className="card-title mb-5">Employees</h3>
            <h4 className="card-subtitle mb-2 text-muted">
              {employeesData.length}
            </h4>
          </div>
        </div>

        <div className="card m-5 p-4" style={{ width: '50%' }}>
          <div className="card-body d-flex justify-content-center align-items-center flex-column">
            <h3 className="card-title mb-5">Assets</h3>
            <h4 className="card-subtitle mb-2 text-muted">
              {assetsData.length}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
