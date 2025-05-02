import './App.css';
import "./components/CSS";
import WelcomePage from './components/Welcome/WelcomePage';

function App() {

  localStorage.clear();
  
  return (
    <div className="App">
      <WelcomePage />
    </div>
  );
}

export default App;


// git push -u origin main