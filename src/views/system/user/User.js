import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'

const User = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dob: '',
    address: '',
    phone: '',
    password: '',
    pin: '',
    role: '',
    failedLoginAttempts: '',
    accountLocked: false
  });

  useEffect(() => {
    // Fetch users from the API
    axios.get('http://localhost:5244/api/User')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setShow(true);
    if (user) {
      setFormData({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        dob: user.dob ? user.dob.split('T')[0] : '', // Chuyển đổi ngày sinh
        address: user.address,
        phone: user.phone,
        password: '',
        pin: user.pin,
        role: user.role,
        failedLoginAttempts: user.failedLoginAttempts,
        accountLocked: user.accountLocked
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5244/api/User/${formData.userId}`, formData)
      .then(response => {
        setUsers(users.map(user => (user.userId === formData.userId ? response.data : user)));
        handleClose();
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
      });
  };

  return (
    <div>
            <CCard className="mb-4">
            <CCardHeader>
          User List
        </CCardHeader>
        <CCardBody>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td>
                <Button variant="primary" onClick={() => handleShow(user)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </CCardBody>

</CCard>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPin">
              <Form.Label>PIN</Form.Label>
              <Form.Control
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFailedLoginAttempts">
              <Form.Label>Failed Login Attempts</Form.Label>
              <Form.Control
                type="number"
                name="failedLoginAttempts"
                value={formData.failedLoginAttempts}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAccountLocked">
              <Form.Check
                type="checkbox"
                label="Account Locked"
                name="accountLocked"
                checked={formData.accountLocked}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default User;
