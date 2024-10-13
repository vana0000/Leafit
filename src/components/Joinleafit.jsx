import React, { useState } from 'react';

const JoinLeafit = ({ onDone }) => {
  const [genre, setGenre] = useState('Fiction'); // Default genre is Fiction
  const [favoriteAuthor, setFavoriteAuthor] = useState('');
  const [readingGoals, setReadingGoals] = useState('');
  const [readingPreference, setReadingPreference] = useState('');

  const handleReset = () => {
    setGenre('Fiction');
    setFavoriteAuthor('');
    setReadingGoals('');
    setReadingPreference('');
  };
  const handleDone = () => {
    const preferences = {
      genres: [genre],
      favorite_authors: [favoriteAuthor],
      reading_goal: readingGoals,
      reading_habits: readingPreference
    };
    onDone(preferences);
  };
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Set Your Preferences</h2>

      {/* Genre Selection */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Genre</label>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-md transition-transform transform ${
              genre === 'Mystery' ? 'bg-[#5fbf00] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[#4ea600] hover:text-white hover:scale-105`}
            onClick={() => setGenre('Mystery')}
          >
            Mystery
          </button>

          <button
            className={`px-4 py-2 rounded-md transition-transform transform ${
              genre === 'Romance' ? 'bg-[#5fbf00] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[#4ea600] hover:text-white hover:scale-105`}
            onClick={() => setGenre('Romance')}
          >
            Romance
          </button>

          <button
            className={`px-4 py-2 rounded-md transition-transform transform ${
              genre === 'Fantasy' ? 'bg-[#5fbf00] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[#4ea600] hover:text-white hover:scale-105`}
            onClick={() => setGenre('Fantasy')}
          >
            Fantasy
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
      className="bg-[#5fbf00] px-6 py-2 rounded-md text-white transition-transform transform hover:bg-[#4ea600] hover:scale-105"
      onClick={handleDone}
    >
      Done
    </button>
    </div>
    </div>
  );
};

export default JoinLeafit;

