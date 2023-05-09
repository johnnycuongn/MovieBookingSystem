
import './App.css';
import { Main } from './views/main';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import ManageBookingPage from './views/ManageBookingPage';
import AppNavigationBar from './views/AppBar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<AppNavigationBar />}>
          <Route path='/' element={<Main />}/>
          <Route path='/bookings' element={<ManageBookingPage />} />
        </Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
