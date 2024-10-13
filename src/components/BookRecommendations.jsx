import React from 'react';

const BookRecommendations = ({ onSignUp }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Book Recommendations</h2>
      <p className="mb-4">Here are some book recommendations based on your preferences:</p>

      {/* Example book list */}
      <div className="mb-6">
        <p><strong>Example Book 1</strong></p>
        <p><strong>Example Book 2</strong></p>
        <p><strong>Example Book 3</strong></p>
      </div>

      {/* Continue button that triggers the SignUp modal */}
      <button
        className="bg-[#5fbf00] px-4 py-2 rounded-md text-white hover:bg-[#4ea600] transition-transform transform hover:scale-105"
        onClick={onSignUp}  // This will open the SignUp modal
      >
        Dashboard
      </button>
    </div>
  );
};

export default BookRecommendations;
