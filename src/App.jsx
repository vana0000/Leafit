import React from 'react';
import { Search, Bookmark, MessageCircle, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-700 p-0.5 rounded-lg">
      <div className="bg-gray-900 p-6 rounded-lg flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {icon}
        </div>
        <p className="text-gray-400 text-sm flex-grow">{description}</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f2937] via-[#030712] to-[#030712] text-white flex flex-col">
      <header className="p-4 flex justify-between items-center border-b border-gray-600">
        <div className="flex items-center ml-9">
          {/* Updated logo */}
          <img 
            src="https://media.discordapp.net/attachments/1293755238246907906/1294822799294332973/leafit.png?ex=670c6933&is=670b17b3&hm=99d68e6fd1a2e915dcdfa9cacdda5b81bc1d4e722245e68911c2634e0c61ddc2&=&width=1598&height=590"
            alt="Leafit Logo"
            className="w-36 h-auto" // Adjust the size as needed
          />
        </div>
        <div className="flex items-center space-x-4 mr-12">
          <button className="bg-[#5fbf00] px-4 py-2 rounded-md text-white hover:bg-[#4ea600] transition-transform transform active:scale-95">Login</button> {/* Updated with click animation */}
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 pt-20 pb-4 flex-grow">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 relative">
              <img 
                src="https://media.discordapp.net/attachments/1293755238246907906/1294796538421313739/Screenshot_2024-10-12_at_5.55.22_PM-removebg-preview.png?ex=670c50be&is=670aff3e&hm=e8de59838ae840812ea197ac06b0dfe294ea6a4d5d0d027bc74fe90a53a05683&=&width=1286&height=776" 
                width={700} 
                height={700} 
                alt="Book illustration" 
                className="mx-auto relative z-10 bottom-[-40px]" 
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h1 className="text-5xl font-bold mb-4">Book smart.</h1>
              <p className="text-xl mb-8">Track every book, share them with the world (or don't) and find new life-changing reads.</p>
              <button className="bg-[#5fbf00] px-6 py-3 rounded-md text-lg font-semibold text-white hover:bg-[#4ea600] transition-transform transform active:scale-95">Join Leafit</button> {/* Updated with click animation */}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Search className="text-gray-400" size={24} />}
                title="Find"
                description="Search and browse for new books – or find inspiration in other reader's libraries."
              />
              <FeatureCard
                icon={<Bookmark className="text-gray-400" size={24} />}
                title="Track"
                description="Track every book by want to read, currently reading, read and did not finish."
              />
              <FeatureCard
                icon={<MessageCircle className="text-gray-400" size={24} />}
                title="Connect"
                description="Explore others reader's bookshelves and follow for their next reads."
              />
              <FeatureCard
                icon={<Sparkles className="text-gray-400" size={24} />}
                title="Discover"
                description="Use our set of amazing stats and tools, including AI, to discover new horizons in your reading journey."
              />
            </div>
          </div>
        </div>
      </main>

      {/* Additional layout section from main branch */}
      <div id="body2">
        <header>
          <nav>
            <div id="logo">
              <h2>Logo</h2>
            </div>
            <div id="links">
              <p>link</p>
              <p>link</p>
            </div>
          </nav>
        </header>
        <div id="main">
          <div id="left">
            <div id="hello" className="box">
              <h2>Hello <span>Name</span></h2>
              <p>Reading God</p>
            </div>
            <div id="streak" className="box">
              <h2>Month <span>Streak *</span></h2>
              <div id="streakBox"></div>
            </div>
          </div>
          <div id="right">
            <div id="topUserBar">
              <p>*</p>
              <p>*</p>
              <div id="usernameBox">
                @UserName
              </div>
            </div>
            <div id="currentReads" className="box">
              <h2>Current Reads</h2>
              <a href="">Book Title</a>
              <a href="">Book Title</a>
            </div>
            <div id="tasks" className="box">
              <h2>Task Tracker</h2>
              <ul>
                <li>Task</li>
                <li>Task</li>
                <li>Task</li>
                <li>Task</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
