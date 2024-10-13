import React, { useState } from 'react';
import BookRecommendations from './BookRecommendations';


const Modal = ({ show, onClose, children }) => {
  if (!show) return null; // Don't render modal if 'show' is false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg relative w-96">
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

const JoinLeafit = () => {
  const [genre, setGenre] = useState('Fiction'); // Default genre is Fiction
  const [favoriteAuthor, setFavoriteAuthor] = useState('');
  const [readingGoals, setReadingGoals] = useState('');
  const [readingPreference, setReadingPreference] = useState('');
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false); // Modal state for book recommendations

  const handleReset = () => {
    setGenre('Fiction');
    setFavoriteAuthor('');
    setReadingGoals('');
    setReadingPreference('');
  };
  const handleDone = () => {
    setShowRecommendationsModal(true);  // Show the book recommendations modal when the "Done" button is clicked
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Set Your Preferences</h2>
      
      {/* Genre Selection */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Genre</label>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${genre === 'Fiction' ? 'bg-[#5fbf00] text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setGenre('Fiction')}
          >
            Fiction
          </button>
          <button
            className={`px-4 py-2 rounded-md ${genre === 'Non-Fiction' ? 'bg-[#5fbf00] text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setGenre('Non-Fiction')}
          >
            Non-Fiction
          </button>
        </div>
      </div>

      {/* Favorite Author */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2" htmlFor="favoriteAuthor">Favorite Author</label>
        <input
          type="text"
          id="favoriteAuthor"
          value={favoriteAuthor}
          onChange={(e) => setFavoriteAuthor(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-md text-white"
          placeholder="Enter your favorite author"
        />
      </div>

      {/* Reading Goals */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2" htmlFor="readingGoals">Reading Goals</label>
        <textarea
          id="readingGoals"
          value={readingGoals}
          onChange={(e) => setReadingGoals(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-md text-white"
          placeholder="Enter your reading goals"
        />
      </div>

      {/* Reading Preference */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2" htmlFor="readingPreference">Reading Preference</label>
        <textarea
          id="readingPreference"
          value={readingPreference}
          onChange={(e) => setReadingPreference(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-md text-white"
          placeholder="Enter your reading preferences"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          className="text-[#5fbf00] hover:underline"
          onClick={handleReset}
        >
          Reset to defaults
        </button>
        <button 
        className="bg-[#5fbf00] px-6 py-2 rounded-md text-white"
        onClick={handleDone}>
          Done
        </button>
        <Modal show={showRecommendationsModal} onClose={() => setShowRecommendationsModal(false)}>
        <BookRecommendations />
      </Modal>
      </div>
    </div>
  );
};

export default JoinLeafit;
