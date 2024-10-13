import React, { useState } from 'react';

const Login = ({ onCloseLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!email) newErrors.email = 'Please enter your email';
        if (!password) newErrors.password = 'Please enter your password';

        if (Object.keys(newErrors).length === 0) {
            onCloseLogin();
        } else {
            setErrors(newErrors);
        }
    };

    const handleClose = () => {
        console.log("Closing Login Modal"); // Debug log
        setEmail('');
        setPassword('');
        setErrors({});
        onCloseLogin();
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Log In</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full bg-gray-700 text-white rounded px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full bg-gray-700 text-white rounded px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <button
                    type="submit"
                    className="mb-6 w-full bg-[#5fbf00] px-6 py-2 rounded-md text-white transition-transform transform hover:bg-[#4ea600] hover:scale-105"
                >
                    Log In
                </button>
                <p className="block text-gray-300">Forgot password?</p>
                <p className="text-gray-300 mb-6">Already have an account?{'\u00A0'}
                    <span className='hover:underline'>Log In</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
