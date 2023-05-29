import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const AssetManagement = () => {
  const navigate = useNavigate();
  const { assetsData } = useSelector((state) => state.dataReducers);

  const handleEdit = (event, cellValues) => {
    navigate(`/editasset/${cellValues.row.id}`);
  };

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 90 },
    {
      field: 'image',
      headerName: 'Photo',
      width: 130,
      height: 100,
      renderCell: (params) => (
        <img alt='no img' style={{ width: '45px' }} src={params.value} />
      ),
    },

    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'serialNo', headerName: 'Serial Number', width: 130,type:'number' },
    { field: 'dop', headerName: 'Date of purchase', width: 130 },

    {
      field: 'invoiceValue',
      headerName: 'Invoice Value',
      type: 'number',
      width: 130,
    },
    {
      field: 'invoiceNo',
      headerName: 'Invoice Number',
      type: 'number',
      width: 130,
    },
    { field: 'desc', headerName: 'Description', width: 200 },
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

  const rows = assetsData.map((data) => ({
    id: data.id,
    image: data.image,
    name: data.name,
    serialNo: data.serialNo,
    dop: data.dop,
    invoiceValue: `$ ${data.invoiceValue}`,
    invoiceNo: data.invoiceNo,
    desc: data.desc,
  }));

  return (
    <div className=" m-5">
      <div>
        <h2 className='text-center m-3'>Asset Management</h2>
      </div>
      <div className="mb-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/addasset')}
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

export default AssetManagement;
