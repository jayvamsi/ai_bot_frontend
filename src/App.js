// import React, { useState } from 'react';
// import './App.css';
// import ChatBox from './components/ChatBox';
// import UserIdPrompt from './components/UserIdPrompt';

// function App() {
//   const [userId, setUserId] = useState('');

//   return (
//     <div className="app">
//       {!userId ? (
//         <UserIdPrompt onSubmit={setUserId} />
//       ) : (
//         <ChatBox userId={userId} />
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import UserIdPrompt from './components/UserIdPrompt';
import './App.css';

function App() {
  const [userId, setUserId] = useState('');
  const [theme, setTheme] = useState('light'); // 🌗 toggle state

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}`}>
      {userId ? (
        <>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <ChatBox userId={userId} />
        </>
      ) : (
        <UserIdPrompt onSubmit={setUserId} />
      )}
    </div>
  );
}

export default App;
