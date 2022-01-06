import './App.css';
import Home from './components/Home';
import PersistentDrawerLeft from './components/Drawer';
function App() {
  return (
    <div className="App">

      <div>
      <Home/>
      </div>

      <div>
      <PersistentDrawerLeft />
      </div>
     
    </div>
  );
}

export default App;
