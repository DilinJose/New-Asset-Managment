import { combineReducers } from 'redux';
const initial = {
  userData: JSON.parse(sessionStorage.getItem('user')),
  employeesData: [],
  editEmployeeData: {},
  assetsData: [],
  editAssetsData: {},
  allocationsData: [],
  editAllocationData: {},
};

const dataReducers = (state = initial, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userData: action.payload };
    case 'GET_EMPLOYEES':
      return { ...state, employeesData: action.payload };
    case 'EDIT_EMPLOYEE':
      return { ...state, editEmployeeData: action.payload };
    case 'GET_ASSETS':
      return { ...state, assetsData: action.payload };
    case 'EDIT_ASSETS':
      return { ...state, editAssetsData: action.payload };
    case 'GET_ALLOCATION':
      return { ...state, allocationsData: action.payload };
    case 'EDIT_ALLOCATION':
      return { ...state, editAllocationData: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  dataReducers,
});
