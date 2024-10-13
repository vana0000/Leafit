const BookRecommendations = ({ onClose, recommendations }) => {
  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return <p>No recommendations available.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book Recommendations</h2>
      <ul>
        {recommendations.map((book, index) => (
          <li key={index} className="text-gray-400">
            <strong>{book.title}</strong> by {book.author}
            <p>{book.summary}</p>
            <p><em>{book.whyMatch}</em></p>
          </li>
        ))}
      </ul>
      <button onClick={onClose} className="text-[#5fbf00] hover:underline">Close</button>
    </div>
  );
};

export default BookRecommendations;
