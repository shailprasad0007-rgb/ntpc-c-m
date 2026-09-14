import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import nmllogo from '../../public/nml_logo.png'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(username, password);
    if (result.success) {
      navigate('/upload');
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/*Main Card*/}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">

        {/* Left Side - Branding*/}
        <div className="md:w-2/5 bg-white p-10 flex flex-col justify-center items-center text-white relative">
          <div className="flex flex-col items-center text-center">

            {/*Placeholder for NML LOGO*/}
            
               <img src={nmllogo} alt="NML" className='w-20 md:w-24 lg:w-[110px] h-auto object-contain' />

            <h1 className="text-[#0a2561] font-bold text-center mt-10 text-[17px] leading-tight tracking-wide">
              SHARED SERVICE SITE C&M
            </h1>
            <p className="text-[#0a2561] font-semibold text-sm text-center mt-3">
             CBCMP & KDCMP
            </p>
          </div>
        </div>

        {/* Right Side - Form*/}
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-[#eef4ff]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-700 text-sm">Please sign in to access your dashboard.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Username / EMP-CODE
              </label>
              <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-800 transition-all">
                <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Employee ID" className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
              <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-800 transition-all">
                <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input type={showPassword? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="AD-Password" className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 ml-2">
                  {showPassword? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 mt-4">
              {isLoading? 'SIGNING IN...' : 'SIGN IN'}
              {!isLoading && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;