import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './RegistrationForm.css';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 4 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords does not match').required('Confirm password is required'),
});

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm({
    resolver: yupResolver(schema),
  });  

  const onSubmit = data => {
    console.log(data);
    alert('User registered successfully!');
    reset()
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" {...register('username')} />
          <p className="error-message">{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email')} />
          <p className="error-message">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register('password')} />
          <p className="error-message">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" {...register('confirmPassword')} />
          <p className="error-message">{errors.confirmPassword?.message}</p>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
