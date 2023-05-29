import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { changePswdAction } from '../actions';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
// Modal.setAppElement('App');
const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#000';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column backgroundForm backgroundForm1">
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="d-flex justify-content-between">
            <h2 className="mt-4" ref={(_subtitle) => (subtitle = _subtitle)}>Are you sure?</h2>
            <button className="btn btn-ligth" onClick={closeModal}>
              close
            </button>
          </div>
          <form>
            <button>yes</button>
            <button>no</button>
          </form>
        </Modal>
      </div>

      <div className="border border-ligth rounded m-5 px-3 py-3">
        <div>
          <h2>Change Password</h2>
        </div>
        <Formik
          initialValues={{ currentPswd: '', newPswd: '', confirmPswd: '' }}
          validationSchema={Yup.object({
            currentPswd: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            newPswd: Yup.string()
              .min(5, 'Must be 5 characters or more')
              .required('Required'),
            confirmPswd: Yup.string()
              .oneOf([Yup.ref('newPswd'), null], 'Passwords must match')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(changePswdAction(values, navigate));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <div className="my-3">
              <Field
                className="form-control"
                name="currentPswd"
                type="text"
                placeholder="Current Password"
              />
              <ErrorMessage
                name="currentPswd"
                component="div"
                className="error-msg"
              />
            </div>

            <div className="my-3">
              <Field
                className="form-control"
                name="newPswd"
                type="text"
                placeholder="New Password"
              />
              <ErrorMessage
                name="newPswd"
                component="div"
                className="error-msg"
              />
            </div>

            <div className="my-3">
              <Field
                className="form-control"
                name="confirmPswd"
                type="text"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPswd"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="d-flex justify-content-center mt-3">
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

export default ChangePassword;
