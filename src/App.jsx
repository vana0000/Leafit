import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import JoinLeafit from './components/Joinleafit';
import BookRecommendations from './components/BookRecommendations';
import SignUp from './components/SignUp';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import logo from './assets/leafit.png';

// Modal Component
const Modal = ({ show, onClose, children, width = 'w-96' }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-gray-800 p-6 rounded-lg relative ${width}`}>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// Main App Component with Router integration
function AppWrapper() {
  return (
    <Router>
      <Routes>
        {/* Main route to the main App */}
        <Route path="/" element={<App />} />
        {/* Route to Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function App() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate(); // React Router hook to navigate programmatically

  
  const startLoginModalSequence = () => {
    setShowLoginModal(true);
  };

  const handleLoginDone = () => {
    setShowLoginModal(false);
    navigate('/dashboard');
  };

  const startModalSequence = () => {
    setShowSignUpModal(true);
    setShowJoinModal(false);
    setShowRecommendationsModal(false);
  };

  // After SignUp is done, show JoinLeafit
  const handleSignUpDone = () => {
    setShowSignUpModal(false);
    setShowJoinModal(true);  // Show JoinLeafit next
    setShowRecommendationsModal(false);
  };

  // After JoinLeafit is done, show BookRecommendations
  const handleJoinDone = () => {
    setShowJoinModal(false);
    setShowRecommendationsModal(true);  // Show BookRecommendations next
  };

  // After BookRecommendations, navigate to Dashboard
  const handleRecommendationsDone = () => {
    setShowRecommendationsModal(false);
    navigate('/dashboard');
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f2937] via-[#030712] to-[#030712] text-white flex flex-col relative">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-600">
        <div className="flex items-center ml-9">
          <img
            src={logo}
            alt="Leafit Logo"
            className="w-36 h-auto"
          />
        </div>
        <div className="flex items-center space-x-4 mr-12">
          {/* Login Button with hover animation */}
          <button className="bg-[#5fbf00] px-4 py-2 rounded-md text-white hover:bg-[#4ea600] transition-transform transform hover:scale-105" onClick={startLoginModalSequence}>
            Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 pt-20 pb-4 flex-grow">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 relative">
              <img
                src="https://media.discordapp.net/attachments/1293755238246907906/1294796538421313739/Screenshot_2024-10-12_at_5.55.22_PM-removebg-preview.png"
                width={700}
                height={700}
                alt="Book illustration"
                className="mx-auto relative z-10 bottom-[-40px]"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h1 className="text-5xl font-bold mb-4">Book smart.</h1>
              <p className="text-xl mb-8">Track every book, share them with the world (or don't) and find new life-changing reads.</p>

              <button
                className="bg-[#5fbf00] px-6 py-3 rounded-md text-lg font-semibold text-white hover:bg-[#4ea600] transition-transform transform active:scale-95"
                onClick={startModalSequence}  // Start modal sequence
              >
                Finish Account
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section with feature cards */}
        <div className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature Cards */}
              {/* Add your FeatureCard components here */}
            </div>
          </div>
        </div>
      </main>

      <Modal show={showJoinModal} onClose={() => setShowJoinModal(false)}>
        <JoinLeafit onDone={handleJoinDone} />
      </Modal>

      <Modal show={showRecommendationsModal} onClose={() => setShowRecommendationsModal(false)} width="w-[40rem]">
        <BookRecommendations onSignUp={handleRecommendationsDone} />
      </Modal>

      <Modal show={showSignUpModal} onClose={() => setShowSignUpModal(false)} width="w-[30rem]">
        <SignUp onClose={handleSignUpDone} />
      </Modal>

      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)} width="w-[30rem]">
        <Login onCloseLogin={handleLoginDone} />
      </Modal>


    </div>
  );
}

export default AppWrapper;
