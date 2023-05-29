import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

const AssetAllocation = () => {
  const navigate = useNavigate();
  const { allocationsData } = useSelector((state) => state.dataReducers);
  const handleEdit = (event, cellValues) => {
    navigate(`/editallocation/${cellValues.row.id}`);
  };

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 200 },
    { field: 'employee', headerName: 'Employee', width: 400 },
    { field: 'asset', headerName: 'Asset', width: 400 },
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

  const rows = allocationsData.map((data) => ({
    id: data.id,
    asset: data.asset,
    employee: data.employee,
  }));

  return (
    <div className=" m-5">
      <div>
        <h2 className="text-center m-3">Asset Allocation</h2>
      </div>
      <div className="mb-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/addallocation')}
        >
          Add
        </button>
      </div>

      <div style={{ height: 300, width: '100%' }}>
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

export default AssetAllocation;
