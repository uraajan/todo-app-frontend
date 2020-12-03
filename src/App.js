import React from 'react';
// import FirstComponent from './components/learningComponents/FirstComponent';
// import SecondComponent from './components/learningComponents/SecondComponent';
//import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';
//import logo from './logo.svg';
import './App.css';
import './bootstrap.css';

function App() {
  console.log("App");
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

// function LearningComponent() {
//   return (
//     <div className="App">
//       <FirstComponent />
//       <SecondComponent />
//     </div>
//   );
// }

export default App;
