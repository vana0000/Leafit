import React from 'react';

const App = () => {
  return (
    <div id='body2'>
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
  );
}

export default App;
