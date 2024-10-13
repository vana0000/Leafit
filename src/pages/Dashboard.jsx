import React from 'react';
import { Settings, Bell } from 'lucide-react';

const getBackgroundColorClass = (isActive, isToday) => {
  if (isToday) return 'bg-yellow-400';
  return isActive ? 'bg-green-600' : 'bg-red-600';
};

const ReadingStreakDay = ({ day, date, isActive, isToday }) => (
  <div className={`text-center p-2 rounded ${getBackgroundColorClass(isActive, isToday)}`}>
    <div className="text-xs">{day}</div>
    <div className="text-sm font-bold">{date}</div>
  </div>
);

const Dashboard = () => {
  const currentStreak = 4;
  const bestStreak = 69;
  const userName = "Name";
  const currentReads = [
    { title: "Book Title 1", author: "Author 1" },
    { title: "Book Title 2", author: "Author 2" },
  ];
  const tasks = ["Task 1", "Task 2", "Task 3"];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-[#5fbf00] text-4xl font-bold">Leafit</div>
          <div className="flex items-center space-x-4">
            <Settings className="w-6 h-6 text-gray-400" />
            <Bell className="w-6 h-6 text-gray-400" />
            <div className="bg-gray-800 px-3 py-1 rounded-full">@UserName</div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Greeting */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h1 className="text-3xl font-bold">Hello <span className="text-[#5fbf00]">{userName}</span></h1>
              <p className="text-gray-400">Ready to read?</p>
            </div>

            {/* Reading Streak */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Reading Streak <span className="text-orange-500">🔥</span></h2>
              <div className="flex justify-between items-center mb-4">
                <span>Current Streak: {currentStreak}</span>
                <span>Best Streak: {bestStreak}</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <ReadingStreakDay 
                    key={day} 
                    day={day} 
                    date={6 + index} 
                    isActive={index < 3 || index > 4}
                    isToday={index === 6}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Current Reads */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Current Reads</h2>
              <ul className="space-y-2">
                {currentReads.map((book, index) => (
                  <li key={index} className="text-gray-400">
                    {book.title} - {book.author}
                  </li>
                ))}
              </ul>
            </div>

            {/* Task Tracker */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Task Tracker</h2>
              <ul className="space-y-2">
                {tasks.map((task, index) => (
                  <li key={index} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-400">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;