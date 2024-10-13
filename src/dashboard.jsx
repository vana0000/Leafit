import React from 'react';
import fireImage from './assets/fire.png';
import logo from './assets/leafit.png';
import settings from './assets/settingsIcon.png';
import bell from './assets/bell.png';

const App = () => {
  return (
    <div id='body2'>
      <header>
        <nav>
          <div id="logoBox">
            <img id='logo' src={logo} alt="logo" />
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
            <p>Ready to read?</p>
          </div>
          <div id="streak" className="box">
            <h2>
              Reading&nbsp;<span>Streak&nbsp;</span>
              <img src={fireImage} alt="Streak Symbol" />
            </h2>
            <p id='streakList'>Current Streak: <span>4</span>&nbsp;&nbsp;|&nbsp;&nbsp;Best Streak: <span>69</span></p>
            <div id="streakBox">
              <div className="dayBox read firstDay">Sun
                <p>6</p>
              </div>
              <div className="dayBox didntread">Mon
                <p>7</p>
              </div>
              <div className="dayBox didntread">Tue
                <p>8</p>
              </div>
              <div className="dayBox read">Wed
                <p>9</p>
              </div>
              <div className="dayBox read">Thu
                <p>10</p>
              </div>
              <div className="dayBox read">Fri
                <p>11</p>
              </div>
              <div className="dayBox currDay lastDay">Sat
                <p>12</p>
              </div>
            </div>
          </div>
        </div>
        <div id="right">
          <div id="topUserBar" className='box'>
            <img id='settings' src={settings} alt="settings" />
            <img id='bell' src={bell} alt="Notifications" />
            <div id="usernameBox">
              <p>@UserName</p>
            </div>
          </div>
          <div id="currentReads" className="box">
            <h2>Current Reads</h2>
            <a href="">
              <p>Book Title - Author</p>
            </a>
            <a href="">
              <p>Book Title - Author</p>
            </a>
          </div>
          <div id="taskBox" className="box">
            <h2>Task Tracker</h2>
            <div className='task'>
              <input type="checkbox" name="" id="" />
              <p>Task</p>
            </div>
            <div className='task'>
              <input type="checkbox" name="" id="" />
              <p>Task</p>
            </div>
            <div className='task'>
              <input type="checkbox" name="" id="" />
              <p>Task</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
