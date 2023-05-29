import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { useSelector } from 'react-redux';
const EmployeeManagement = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { employeesData } = useSelector((state) => state.dataReducers);

  const handleEdit = (event, cellValues) => {
    navigate(`/editEmployee/${cellValues.row.id}`);
  };

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'Status', headerName: 'Status', width: 150 },

    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'employeeid', headerName: 'Employee ID', width: 150 },
    { field: 'department', headerName: 'Department', width: 150 },

    {
      field: 'phoneno',
      headerName: 'Phone Number',
      type: 'number',
      width: 150,
    },
    { field: 'email', headerName: 'Email', width: 180 },
    {
      field: '',
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleEdit(event, cellValues);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const rows = employeesData.map((data) => ({
    id: data.id,
    Status: data.type,

    name: data.name,
    employeeid: data.employeeId,
    department: data.department,
    phoneno: data.phone,
    email: data.email,
  }));

  return (
    <div className=" m-5">
      <div>
        <h2 className="text-center m-3">Employee Management</h2>
      </div>
      <div>
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate('/addemployee')}
        >
          Add
        </button>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={handleCellClick}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default EmployeeManagement;
