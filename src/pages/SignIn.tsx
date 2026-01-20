import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignInFormData {
  email: string;
  password: string;
}

interface SignUpFormData extends SignInFormData {
  fullName: string;
  confirmPassword: string;
}

export const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const {
    register: registerSignIn,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors },
  } = useForm<SignInFormData>();

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
    watch,
  } = useForm<SignUpFormData>();

  const password = watch('password');

  const onSignIn = async (data: SignInFormData) => {
    setIsLoading(true);
    setError('');

    const { error } = await signIn(data.email, data.password);

    setIsLoading(false);

    if (error) {
      setError(error.message || 'Invalid email or password');
    } else {
      navigate('/dashboard');
    }
  };

  const onSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError('');

    const { error } = await signUp(data.email, data.password, data.fullName);

    setIsLoading(false);

    if (error) {
      setError(error.message || 'Failed to create account');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-ghost-green to-white flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-body-text">
                {isSignUp
                  ? 'Start your study abroad journey with us'
                  : 'Sign in to access your dashboard'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {isSignUp ? (
              <form onSubmit={handleSignUpSubmit(onSignUp)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...registerSignUp('fullName', { required: 'Full name is required' })}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      placeholder="John Doe"
                    />
                  </div>
                  {signUpErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{signUpErrors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...registerSignUp('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      placeholder="john@example.com"
                    />
                  </div>
                  {signUpErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{signUpErrors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...registerSignUp('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      placeholder="••••••••"
                    />
                  </div>
                  {signUpErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{signUpErrors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...registerSignUp('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === password || 'Passwords do not match',
                      })}
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      placeholder="••••••••"
                    />
                  </div>
                  {signUpErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Account
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignInSubmit(onSignIn)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...registerSignIn('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      placeholder="john@example.com"
                    />
                  </div>
                  {signInErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{signInErrors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-heading mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...registerSignIn('password', { required: 'Password is required' })}
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                      placeholder="••••••••"
                    />
                  </div>
                  {signInErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{signInErrors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-turquoise hover:text-turquoise-dark font-semibold"
              >
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
