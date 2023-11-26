import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editUser, addUser } from './UserReducer'; 
import axios from 'axios';

const Update = () => {

  const { id } = useParams();
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingUser = users.find((user) => user.id === parseInt(id, 10)) || {};

  const { name: initialName, email: initialEmail ,username: initialUserName} = existingUser;

  const [name, setName] = useState(initialName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [username, setCity] = useState(initialUserName || '');

  useEffect(() => {
    setName(initialName || '');
    setEmail(initialEmail || '');
    setCity(initialUserName || '');

  }, [initialName, initialEmail, initialUserName]);

  const handleUpdate = (event) => {
    event.preventDefault();

    if (existingUser.id) {
      axios
  .patch(`https://jsonplaceholder.typicode.com/users/${id}`, { name, email, username, })
  .then((response) => {

    dispatch(editUser(response.data));
    navigate('/');

  })

  .catch((error) => {
    console.error('Error updating user:', error);
  });

    } else {
      axios
        .post('https://jsonplaceholder.typicode.com/users', { name, email, username })
        .then((response) => {

          dispatch(addUser(response.data));
          navigate('/');
        })

        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className="w-50 border bg-secondary text-white p-5">

        <h3>{existingUser.id ? 'Edit User Details' : 'Add New User'}</h3>
        <form onSubmit={handleUpdate}>

          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className='form-control'
              placeholder='Enter your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
         
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name='email'
              className='form-control'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="username">UserName:</label>
            <input
              type="text"
              name="username"
              className='form-control'
              placeholder='Enter your UserName'
              value={username}
              onChange={(e) => setCity(e.target.value)}
            />
          </div><br />

          <button type="submit" className='btn btn-info'>
            {existingUser.id ? 'Update' : 'Add'}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Update;
