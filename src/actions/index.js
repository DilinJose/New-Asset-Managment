import {
  getData,
  postData,
  editData,
  patchData,
} from '../api/Services';
import { encryptPassword, validatePassword } from '../HashPassword';


//Action for login

export const loginAction = (values, navigate) => async (dispatch) => {
  const { data: loginData } = await getData('users/');

  const user = loginData.find((d) => d.email === values.email);
  if (!user) {
    alert("User Doesn't Exist");
  } else {
    if (validatePassword(user.pswd, values.pswd)) {
      sessionStorage.setItem(
        'user',
        JSON.stringify({ currentUser: user.email, status: true })
      );
      dispatch({
        type: 'LOGIN',
        payload: { currentUser: user.email, status: true },
      });
      navigate();
    } else {
      alert('login failed');
    }
  }
};

//Action for logout


export const logoutAction = () => async (dispatch) => {
  sessionStorage.removeItem('user');
  dispatch({
    type: 'LOGIN',
    payload: null,
  });
};

//Action for getting employee details

export const getEmployees = () => async (dispatch) => {
  const { data } = await getData('employees');

  dispatch({
    type: 'GET_EMPLOYEES',
    payload: data,
  });
};


//Action for Adding Employee


export const postEmployee = (values, navigate) => async (dispatch) => {
  await postData('employees', values);
  dispatch(getEmployees('employees'));
  navigate('/employeemanagement');
};

//Action for Editing employee

export const editEmployee = (id) => async (dispatch) => {
  const { data } = await getData(`employees/${id}`);
  dispatch({
    type: 'EDIT_EMPLOYEE',
    payload: data,
  });
};

//Action for posting edited employee

export const postEditEmployee = (id, values, navigate) => async (dispatch) => {
  await editData(`employees/${id}`, values);
  dispatch(getEmployees());
  navigate('/employeemanagement');
};

//Action for getting assets details


export const getAssets = () => async (dispatch) => {
  const { data } = await getData('assets');

  dispatch({
    type: 'GET_ASSETS',
    payload: data,
  });
};
//Action for posting assets details

export const postAssets = (values, navigate) => async (dispatch) => {
  await postData('assets', values);
  dispatch(getAssets('assets'));
  navigate('/assetmanagement');
};

//Action for editting assets details


export const editAssets = (id) => async (dispatch) => {
  const { data } = await getData(`assets/${id}`);

  dispatch({
    type: 'EDIT_ASSETS',
    payload: data,
  });
};

//Action for posting edited assets details

export const postEditAssets = (id, values, navigate) => async (dispatch) => {
  await editData(`assets/${id}`, values);
  navigate('/assetmanagement');
  dispatch(getAssets());
};

// allocations

export const getAllocations = () => async (dispatch) => {
  const { data } = await getData('/allocations');

  dispatch({
    type: 'GET_ALLOCATION',
    payload: data,
  });
};

export const postAllocations = (values, navigate) => async (dispatch) => {
  await postData('allocations', values);
  dispatch(getAllocations());
  navigate('/assetallocation');
};

export const editAllocation = (id) => async (dispatch) => {
  const { data } = await getData(`allocations/${id}`);
  dispatch({
    type: 'EDIT_ALLOCATION',
    payload: data,
  });
};

export const postEditAllocation = (id, values, navigate) => async (dispatch) => {
  await editData(`allocations/${id}`, values);
  dispatch(getAllocations());
  navigate('/assetallocation');
};

//Action for Changing password

export const changePswdAction = (values, navigate) => async (dispatch) => {
  const { data } = await getData('users');
  const userEmail = JSON.parse(sessionStorage.getItem('user'));
  const user = data.find((d) => d.email === userEmail.currentUser);

  if (values.currentPswd === values.newPswd) {
    alert('Current password and new password are same');
  } else {
    if (validatePassword(user.pswd, values.currentPswd)) {
      let { pswd, ...rest } = user;
      pswd = encryptPassword(values.newPswd);
      rest = { ...rest, pswd };

      await patchData(`users/${user.id}`, rest);
      alert('password Changed');
      navigate('/dashboard');
    } else {
      alert('Current password is incorrect');
    }
  }
};
