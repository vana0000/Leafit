const BookRecommendations = ({ onClose, recommendations }) => {
  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return <p>No recommendations available.</p>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 bg-white border rounded-lg shadow-lg overflow-auto max-h-[70vh] max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Book Recommendations</h2>
        <ul>
          {recommendations.map((book, index) => (
            <li key={index} className="mb-4 text-gray-600">
              <strong>{book.title}</strong> by {book.author}
              <p>{book.summary}</p>
              <p><em>{book.whyMatch}</em></p>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 text-[#5fbf00] hover:underline">Close</button>
      </div>
    </div>

  );
};

export default BookRecommendations;