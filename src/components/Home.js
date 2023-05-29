import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../actions';
const Home = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.dataReducers);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div>
      <Navbar bg="ligth" expand="lg">
        <Navbar.Brand href="#home">
          <img className='me-2'
          alt='no img'
            style={{ width: '30px' }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmg6VbQr7k4bE8m1sGjODK19nEZn-UKVChBg&usqp=CAU"
          />
          Asset Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className={`flex-grow-1 pe-3 ${
              userData ? 'justify-content-between' : 'justify-content-end'
            }`}
          >
            {userData && (
              <div className="navlinks-card ">
                <NavLink className="btn btn-light" to={'/dashboard'}>
                  Dashboard
                </NavLink>
                <NavLink
                  className="btn btn-light m-1"
                  to={'/employeemanagement'}
                >
                  Employee Mangement
                </NavLink>
                <NavLink className="btn btn-light m-1" to={'/assetmanagement'}>
                  Asset Management
                </NavLink>
                <NavLink className="btn btn-light m-1" to={'/assetallocation'}>
                  Asset Allocation
                </NavLink>
              </div>
            )}
            <div className="navlinks-card-two ">
              {userData &&  (
                <div>
                  <NavLink className="btn btn-primary m-1" to={'/changepswd'}>
                    Change Password
                  </NavLink>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Home;
