import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar';
import TwitterDownloader from './Components/TwitterDownloader';
function App() {
  return (
    <div>
      <NavBar />
      <TwitterDownloader />
    </div>
  );
}

export default App;
