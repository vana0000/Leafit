import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import JoinLeafit from './components/Joinleafit';
import BookRecommendations from './components/BookRecommendations';
import SignUp from './components/SignUp';
import Dashboard from './pages/Dashboard'; // Dashboard page

function App() {
  const [showJoinModal, setShowJoinModal] = React.useState(false);
  const [showRecommendationsModal, setShowRecommendationsModal] = React.useState(false);
  const [showSignUpModal, setShowSignUpModal] = React.useState(false);

  const navigate = useNavigate(); // Hook for navigating to different routes

  // Modal sequence functions
  const startModalSequence = () => setShowJoinModal(true);
  const handleJoinDone = () => {
    setShowJoinModal(false);
    setShowRecommendationsModal(true);
  };
  const handleSignUp = () => {
    setShowRecommendationsModal(false);
    setShowSignUpModal(true);
  };
  const handleSignUpDone = () => {
    setShowSignUpModal(false);
    navigate('/dashboard'); // Navigate to the dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f2937] via-[#030712] to-[#030712] text-white flex flex-col relative">
      {/* Your main content and modals */}
      <header className="p-4 flex justify-between items-center border-b border-gray-600">
        <div className="flex items-center ml-9">
          <img src="https://media.discordapp.net/attachments/1293755238246907906/1294822799294332973/leafit.png" alt="Leafit Logo" className="w-36 h-auto" />
        </div>
        <div className="flex items-center space-x-4 mr-12">
          <button className="bg-[#5fbf00] px-4 py-2 rounded-md text-white hover:bg-[#4ea600] transition-transform transform hover:scale-105">
            Login
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 pt-20 pb-4 flex-grow">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 relative">
              <img src="https://media.discordapp.net/attachments/1293755238246907906/1294796538421313739/Screenshot_2024-10-12_at_5.55.22_PM-removebg-preview.png" width={700} height={700} alt="Book illustration" className="mx-auto relative z-10 bottom-[-40px]" />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h1 className="text-5xl font-bold mb-4">Book smart.</h1>
              <p className="text-xl mb-8">Track every book, share them with the world (or don't) and find new life-changing reads.</p>

              <button className="bg-[#5fbf00] px-6 py-3 rounded-md text-lg font-semibold text-white hover:bg-[#4ea600] transition-transform transform active:scale-95"
                onClick={startModalSequence}>
                Finish Account
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal structure */}
      {/* JoinLeafit, BookRecommendations, and SignUp Modals here */}

      {/* Routing structure */}
      <Routes>
        <Route path="/" element={<App />} /> {/* Default Route */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard Route */}
      </Routes>
    </div>
  );
}

export default App;
