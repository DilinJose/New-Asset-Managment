import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployee, postEditEmployee, postEmployee } from '../actions';
import { useNavigate, useParams } from 'react-router-dom';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(editEmployee(id));
    }
  }, []);

  const { editEmployeeData } = useSelector((state) => state.dataReducers);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let initialValues;

  id
    ? (initialValues = editEmployeeData)
    : (initialValues = {
        name: id ? editEmployeeData.name : '',
        employeeId: '',
        department: '',
        phone: '',
        email: '',
        type: 'active',
      });

  console.log(initialValues);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    employeeId: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    department: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required')
      .min(10, 'Phone number should have minimum 10 digit')
      .max(10, 'Phone number should only be 10 digit'),
    type: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  return (
    <div className="d-flex justify-content-center align-items-center flex-column backgroundForm">
      <div className="border border-ligth rounded m-5 p-3">
        <div>
          <h2 className="text-center">Add Employee</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            setTimeout(() => {
              id
                ? dispatch(postEditEmployee(id, values, navigate))
                : dispatch(postEmployee(values, navigate));
            }, 400);
          }}
        >
          <Form>
            <div className="m-3">
              <Field
                className="form-control"
                placeholder="Name"
                name="name"
                type="text"
              />
              <ErrorMessage name="name" component="div" className="error-msg" />
            </div>
            <div className="m-3">
              <Field
                className="form-control"
                placeholder="Employee ID"
                name="employeeId"
                type="text"
              />
              <ErrorMessage
                name="employeeId"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="m-3">
              <Field
                className="form-control"
                placeholder="Department"
                name="department"
                type="text"
              />
              <ErrorMessage
                name="department"
                component="div"
                className="error-msg"
              />
            </div>

            <div className="m-3">
              <Field
                className="form-control"
                placeholder="Phone Number"
                name="phone"
                type="text"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-msg"
              />
            </div>

            <div className="m-3">
              <Field
                className="form-control"
                placeholder="Email Address"
                name="email"
                type="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="d-flex flex-column m-3">
              <label>Status</label>
              <Field name="type" as="select" className="form-control my-select">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
            </div>
            <div className="m-3">
              <button className="btn btn-primary btn-sm m-1" type="submit">
                {id ? 'Update' : 'Submit'}
              </button>
              <button
                className="btn btn-secondary btn-sm m-1"
                onClick={() => navigate('/employeemanagement')}
              >
                Back
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddEmployee;
