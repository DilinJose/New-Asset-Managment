import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  editAllocation,
  postAllocations,
  postEditAllocation,
} from '../actions';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const AddAllocation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employeesData, assetsData, editAllocationData, allocationsData } =
    useSelector((state) => state.dataReducers);



  useEffect(() => {
    if (id) {
      dispatch(editAllocation(id));
    }
  }, []);

  let activeEmployees = employeesData.filter(
    (data) => data.type.toLowerCase() === 'active'
  );
  let unAllocatedData = assetsData.filter(
    (data1) => !allocationsData.some((data2) => data2.asset === data1.name)
  );



  return (
    <div className="d-flex justify-content-center align-items-center flex-column backgroundForm  backgroundForm1">
      <div className="border border-ligth rounded m-5 p-3 w-25">
        <div>
          <h2 className="text-center my-3 " >Add Allocation</h2>
        </div>
        <Formik
          initialValues={{
            employee: id ? editAllocationData.employee : '',
            asset: id ? editAllocationData.asset : '',
          }}
          validationSchema={Yup.object({
            employee: Yup.string().required('Required'),
            asset: Yup.string().required('Required'),
          })}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            // resetForm({ values: '' });
            if (id) {
              dispatch(postEditAllocation(id, values, navigate));
              resetForm();
            } else {
              dispatch(postAllocations(values, navigate));
              resetForm();
            }
          }}
        >
          <Form>
            <div className="d-flex flex-column my-3">
              <label>Choose Employee</label>
              <Field
                name="employee"
                as="select"
                className="my-select form-control"
              >
                <option value="">--Select Employee--</option>
                {activeEmployees.map((data, index) => (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="employee"
                component="div"
                className="error-msg"
              />
            </div>

            <div className="d-flex flex-column my-3">
              <label>Choose Asset</label>
              <Field
                name="asset"
                as="select"
                className="my-select form-control"
              >
                <option value="">--Select Asset--</option>
                {id
                  ? assetsData.map((data, index) => (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    ))
                  : unAllocatedData.map((data, index) => (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    ))}
              </Field>
              <ErrorMessage
                name="asset"
                component="div"
                className="error-msg"
              />
            </div>

            <div>
              <button
                className="btn btn-primary btn-sm my-3 mx-1"
                type="submit"
              >
                {id ? 'Update' : 'Submit'}
              </button>
              <button
                className="btn btn-secondary btn-sm my-3 mx-1"
                onClick={() => navigate('/assetallocation')}
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

export default AddAllocation;
