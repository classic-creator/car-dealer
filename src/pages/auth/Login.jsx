import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Mock authentication
    console.log("Login Data:", data);
    
    const mockUser = {
      id: 'usr_123',
      name: 'Admin User',
      email: data.email,
      role: 'Super Admin'
    };
    
    dispatch(loginSuccess({ user: mockUser, token: 'mock-jwt-token-12345' }));
    navigate('/admin');
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Sign in to your account</h3>
        <p className="text-sm text-gray-500 mt-2">Enter any email and password to access the admin dashboard.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1">
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
              placeholder="admin@autoelite.com"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-accent hover:text-accent-hover">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
