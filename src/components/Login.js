import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center flex-column m--5 backgroundForm backgroundForm1">
      <div className="border border-ligth rounded my-3 py-4">
        <div>
          <h2 className='text-center'>Login Page</h2>
        </div>
        <Formik
          initialValues={{ email: '', pswd: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            pswd: Yup.string().required('Required'),
          })}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              resetForm({ values: '' });
              dispatch(loginAction(values, () => navigate('/dashboard')));
            }, 400);
          }}
        >
          <Form>
            {/* <div className="m-3"> */}
            <div  className='form-group m-3'>

              <label className="my-2">Email</label>
              <Field
                className="form-control"
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-msg"
              />
            </div>

            {/* <div className="m-3"> */}
            <div  className='form-group m-3'>
              <label className="my-2">Password</label>
              <Field
                className="form-control"
                name="pswd"
                type="password"
                placeholder="Enter password"
              />
              <ErrorMessage name="pswd" component="div" className="error-msg" />
            </div>
            <div className="m-3 d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
