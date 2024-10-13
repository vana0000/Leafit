import React, { useState, useEffect } from 'react';
import { Settings, Bell, Flame, ChevronLeft, ChevronRight, X } from 'lucide-react';

const DashboardCard = ({ title, children, className }) => (
  <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
    {typeof title === 'string' ? <h2 className="text-2xl font-bold mb-4">{title}</h2> : title}
    {children}
  </div>
);

const ReadingStreakDay = ({ day, date, isActive, isToday }) => (
  <div className={`text-center p-2 rounded ${isActive ? 'bg-green-500' : 'bg-gray-700'} ${isToday ? 'bg-yellow-400' : ''}`}>
    <div className="text-sm">{day}</div>
    <div className="text-lg font-bold">{date}</div>
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

const Calendar = ({ activedays }) => {
  const daysInOctober2024 = 31;
  const firstDayOfOctober2024 = 2; // 0 is Sunday, 1 is Monday, etc. October 1, 2024 is a Tuesday

  const days = Array.from({ length: daysInOctober2024 }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfOctober2024 }, (_, i) => i);

  return (
    <DashboardCard
      title={
        <div className="flex justify-between items-center mb-4">
          <ChevronLeft className="text-gray-400 cursor-pointer" />
          <h2 className="text-xl font-bold">October 2024</h2>
          <ChevronRight className="text-gray-400 cursor-pointer" />
        </div>
      }
    >
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-gray-400 font-semibold">{day}</div>
        ))}
        {emptyDays.map(day => (
          <div key={`empty-${day}`}></div>
        ))}
        {days.map(day => (
          <div 
            key={day} 
            className={`p-2 rounded ${activedays.includes(day) ? 'bg-green-500' : 'hover:bg-gray-700'} cursor-pointer`}
          >
            {day}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

const Dashboard = ({ logoUrl }) => {
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
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDays, setActiveDays] = useState([]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - currentDate.getDay() + i);
    return date;
  });

  useEffect(() => {
    // Update streaks when journal entries change
    updateStreaks();
  }, [journalEntries]);

  const updateStreaks = () => {
    let streak = 0;
    let bestStreak = 0;
    let currentStreak = 0;
    let lastDate = null;

    // Sort entries by date
    const sortedEntries = [...journalEntries].sort((a, b) => a.date - b.date);

    sortedEntries.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (lastDate) {
        const dayDiff = (entryDate - lastDate) / (1000 * 60 * 60 * 24);
        if (dayDiff === 1) {
          currentStreak++;
        } else {
          bestStreak = Math.max(bestStreak, currentStreak);
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      lastDate = entryDate;
    });

    bestStreak = Math.max(bestStreak, currentStreak);

    setCurrentStreak(currentStreak);
    setBestStreak(bestStreak);

    // Update active days
    const newActiveDays = sortedEntries.map(entry => new Date(entry.date).getDate());
    setActiveDays([...new Set(newActiveDays)]);
  };

  const handleJournalEntry = (entry) => {
    if (isNewUser) {
      setCurrentBook(entry.book);
      setIsNewUser(false);
    }
    const entryDate = new Date();
    setJournalEntries([...journalEntries, { ...entry, date: entryDate }]);
    setCurrentDate(entryDate);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="h-10 w-32">
            <img src={logoUrl} alt="Leafit Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              @UserName
            </button>
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
                <p className="text-gray-400 text-base font-normal mb-4">Ready to read?</p>
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
                  Reading Streak <Flame className="ml-2 text-yellow-500" size={24} />
                </div>
              }
            >
              <div className="flex justify-between items-center mb-4 text-gray-400">
                <span>Current Streak: {currentStreak}</span>
                <span>Best Streak: {bestStreak}</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <ReadingStreakDay
                    key={day}
                    day={day}
                    date={weekDates[index].getDate()}
                    isActive={activeDays.includes(weekDates[index].getDate())}
                    isToday={index === currentDate.getDay()}
                  />
                ))}
              </div>
            </DashboardCard>

            {/* October Calendar */}
            <Calendar activedays={activeDays} />
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
                    {new Date(entry.date).toLocaleDateString()}: Read {entry.pages} pages of {entry.book}
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