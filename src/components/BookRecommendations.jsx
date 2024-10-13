import React from 'react';

const BookRecommendations = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Book Recommendations</h2>
      <p className="mb-4">Here are some book recommendations based on your preferences:</p>

      {/* Simulated recommendations displayed in read-only textboxes */}
      <div className="space-y-4">
        <textarea
          readOnly
          className="w-full p-3 bg-gray-700 text-white rounded-md"
          value="1. Example Book 1 by Example Author"
        />
        <textarea
          readOnly
          className="w-full p-3 bg-gray-700 text-white rounded-md"
          value="2. Example Book 2 by Example Author"
        />
        <textarea
          readOnly
          className="w-full p-3 bg-gray-700 text-white rounded-md"
          value="3. Example Book 3 by Example Author"
        />
      </div>

      {/* Continue Button (or for future logic) */}
      <div className="mt-6">
        <button className="bg-[#5fbf00] px-4 py-2 rounded-md text-white hover:bg-[#4ea600]">
          Continue
        </button>
      </div>
    </div>
  );
};

export default BookRecommendations;
