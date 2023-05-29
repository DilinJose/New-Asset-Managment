import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddAllocation from './AddAllocation';
import AddAsset from './AddAsset';
import AddEmployee from './AddEmployee';
import AssetAllocation from './AssetAllocation';
import AssetManagement from './AssetManagement';
import ChangePassword from './ChangePassword';
import Dashboard from './Dashboard';
import EmployeeManagement from './EmployeeManagement';
import Home from './Home';
import Login from './Login';
import { PrivateRouting } from './PrivateRouting';
import { getAllocations, getEmployees } from '../actions';
import { getAssets } from '../actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getAllocations());
    dispatch(getAssets());

  }, []);


  return (
    <div className="container-fluid">
      <Home />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRouting />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employeemanagement" element={<EmployeeManagement />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/editemployee/:id" element={<AddEmployee />} />

          <Route path="/assetmanagement" element={<AssetManagement />} />
          <Route path="/addasset" element={<AddAsset />} />
          <Route path="/editasset/:id" element={<AddAsset />} />

          <Route path="/assetallocation" element={<AssetAllocation />} />
          <Route path="/addallocation" element={<AddAllocation />} />
          <Route path="/editallocation/:id" element={<AddAllocation />} />

          <Route path="/changepswd" element={<ChangePassword />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
