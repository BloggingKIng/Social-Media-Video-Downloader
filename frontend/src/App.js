import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar';
import TwitterDownloader from './Components/TwitterDownloader';
import Main from './Components/Main';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <NavBar />
      <Main />
    </div>
  );
}

export default App;
