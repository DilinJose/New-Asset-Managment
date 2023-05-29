import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editAssets, postAssets, postEditAssets } from '../actions';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploader from 'react-images-upload';

const AddAsset = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [errorImage, setErrorImage] = useState('');

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setImage(pictureDataURLs);
  };

  const { editAssetsData } = useSelector((state) => state.dataReducers);
  useState(() => {
    if (id) {
      dispatch(editAssets(id));
    }
  }, []);

  let initialValues;
  id
    ? (initialValues = editAssetsData)
    : (initialValues = {
        name: '',
        serialNo: '',
        dop: '',
        invoiceValue: '',
        invoiceNo: '',
        desc: '',
      });

  return (
    <div className="d-flex justify-content-center align-items-center flex-column backgroundForm">
      <div className="border border-ligth rounded m-5 px-2 ">
        <div>
          <h2 className="text-center mb-2">Add Assets</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            serialNo: Yup.string()
              .min(3, 'Minimum 3 digit required')
              .required('Required')
              .max(15, 'Must be 15 digit or less'),
            dop: Yup.string().required('Required'),
            invoiceValue: Yup.string().required('Required'),
            invoiceNo: Yup.string().required('Required'),
            desc: Yup.string()
              .required('Required')
              .min(3, 'Minimum 3 characters or more')
              .required('Required')
              .max(50, 'Must be 50 characters or less'),
          })}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            if (image === '') {
              setErrorImage('Required');
            }
            if (id) {
              let img = image ? image : editAssetsData.image;
              values = { ...values, image: img };
              dispatch(postEditAssets(id, values, navigate));
              setErrorImage('');
            } else {
              if (image) {
                values = { ...values, image };
                dispatch(postAssets(values, navigate));
                resetForm();
                setErrorImage('');
              }
            }
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
                placeholder="Serial Number"
                name="serialNo"
                type="text"
              />
              <ErrorMessage
                name="serialNo"
                component="div"
                className="error-msg"
              />
            </div>

            <div className="m-3">
              <Field
                className="form-control"
                placeholder="Date Of purchase"
                name="dop"
                type="date"
              />
              <ErrorMessage name="dop" component="div" className="error-msg" />
            </div>

            <div className="m-3">
              <Field
                className="form-control"
                placeholder="Invoice Value"
                name="invoiceValue"
                type="number"
              />
              <ErrorMessage
                name="invoiceValue"
                component="div"
                className="error-msg"
              />
            </div>

            <div className="m-3">
              <Field
                className="form-control"
                placeholder="Invoice Number"
                name="invoiceNo"
                type="number"
              />
              <ErrorMessage
                name="invoiceNo"
                component="div"
                className="error-msg"
              />
            </div>

            <div className="m-3">
              <Field
                className="form-control"
                placeholder="Description"
                name="desc"
                as="textarea"
              />
              <ErrorMessage name="desc" component="div" className="error-msg" />
            </div>

            <div className=" d-flex flex-column  px-3">
              <ImageUploader
                withIcon={false}
                singleImage={true}
                value={image}
                withPreview={true}
                buttonText="Choose image"
                onChange={onDrop}
                imgExtension={['.jpg', 'jpeg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
              />
              {id ? (
                <img
                  alt="no img"
                  src={editAssetsData.image}
                  style={{ width: '50px' }}
                />
              ) : null}

              {errorImage ? (
                <label className="error-msg">{errorImage}</label>
              ) : null}
            </div>

            <div className="d-flex m-3">
              <button className="btn btn-primary btn-sm m-1" type="submit">
                {id ? 'Update' : 'Submit'}
              </button>
              <button
                className="btn btn-secondary btn-sm m-1"
                onClick={() => navigate(-1)}
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

export default AddAsset;
