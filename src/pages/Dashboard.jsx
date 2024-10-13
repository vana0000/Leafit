import React, { useState } from 'react';
import { Settings, Bell, Flame, X } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const DashboardCard = ({ title, children, className }) => (
  <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
    {typeof title === 'string' ? <h2 className="text-2xl font-bold mb-4">{title}</h2> : title}
    {children}
  </div>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg relative max-w-md w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const JournalEntry = ({ isNewUser, onSave, onClose }) => {
  const [book, setBook] = useState('');
  const [pages, setPages] = useState('');
  const [comments, setComments] = useState('');

  const handleSave = () => {
    onSave({ book, pages, comments });
    onClose();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{isNewUser ? 'Start a New Reading Journal' : 'What did you read today?'}</h2>
      {isNewUser && (
        <input
          type="text"
          placeholder="Book Title"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          className="w-full bg-gray-700 text-white p-2 rounded"
        />
      )}
      <input
        type="number"
        placeholder="Pages Read"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded"
      />
      <textarea
        placeholder="Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded h-32"
      ></textarea>
      <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded w-full">
        Save Entry
      </button>
    </div>
  );
};

const Dashboard = () => {
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [currentBook, setCurrentBook] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const userName = "Name";
  const currentReads = [
    { title: "Book Title 1", author: "Author 1" },
    { title: "Book Title 2", author: "Author 2" },
  ];
  const tasks = ["Task 1", "Task 2", "Task 3"];

  // Reading Streak data
  const currentStreak = 4;
  const bestStreak = 69;
  const currentDate = new Date(2024, 9, 12); // October 12, 2024
  const activeDays = [6, 7, 8, 9, 10, 11, 12]; // Active days in October

  const handleJournalEntry = (entry) => {
    if (isNewUser) {
      setCurrentBook(entry.book);
      setIsNewUser(false);
    }
    setJournalEntries([...journalEntries, { ...entry, date: new Date() }]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-[#5fbf00] text-4xl font-bold">Leafit</div>
          <div className="flex items-center space-x-4">
            <Settings className="w-6 h-6 text-gray-400" />
            <Bell className="w-6 h-6 text-gray-400" />
            <div className="text-gray-400">@UserName</div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Greeting */}
            <DashboardCard>
              <div>
                <h2 className="text-2xl font-bold mb-4">Hello <span className="text-[#5fbf00]">{userName}</span></h2>
                <button 
                  onClick={() => setIsJournalModalOpen(true)} 
                  className="bg-[#5fbf00] text-white px-4 py-2 rounded hover:bg-[#4ea600] transition-colors"
                >
                  What did you read today?
                </button>
              </div>
            </DashboardCard>

            {/* Reading Streak */}
            <DashboardCard 
              title={
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold mb-4">Reading <span className="text-[#ff4500]">Streak</span></h2> <Flame className="ml-2 text-yellow-500" size={24} />
                </div>
              }
            >
              <div className="flex justify-between items-center mb-4 text-gray-400">
                <span>Current Streak: {currentStreak}</span>
                <span>Best Streak: {bestStreak}</span>
              </div>
              <Calendar
                value={currentDate}
                tileClassName={({ date }) =>
                  activeDays.includes(date.getDate()) ? 'bg-green-500 text-white' : ''
                }
              />
            </DashboardCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Current Reads */}
            <DashboardCard title="Current Reads">
              <ul className="space-y-2">
                {currentBook && <li className="text-gray-400">{currentBook}</li>}
                {currentReads.map((book, index) => (
                  <li key={index} className="text-gray-400">
                    {book.title} - {book.author}
                  </li>
                ))}
              </ul>
            </DashboardCard>

            {/* Task Tracker */}
            <DashboardCard title="Task Tracker">
              <ul className="space-y-2">
                {tasks.map((task, index) => (
                  <li key={index} className="flex items-center">
                    <input type="checkbox" className="mr-2 form-checkbox h-5 w-5 text-green-500 rounded focus:ring-green-500 focus:ring-offset-gray-800" />
                    <span className="text-gray-400">{task}</span>
                  </li>
                ))}
              </ul>
            </DashboardCard>

            {/* Recent Journal Entries */}
            <DashboardCard title="Recent Journal Entries">
              <ul className="space-y-2">
                {journalEntries.slice(-3).reverse().map((entry, index) => (
                  <li key={index} className="text-gray-400">
                    {entry.date.toLocaleDateString()}: Read {entry.pages} pages of {entry.book}
                  </li>
                ))}
              </ul>
            </DashboardCard>
          </div>
        </div>
      </div>

      {/* Journal Entry Modal */}
      <Modal isOpen={isJournalModalOpen} onClose={() => setIsJournalModalOpen(false)}>
        <JournalEntry 
          isNewUser={isNewUser} 
          onSave={handleJournalEntry} 
          onClose={() => setIsJournalModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
