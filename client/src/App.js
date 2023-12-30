import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useCookies} from 'react-cookie';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken


  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {authToken  && <Route path="/dashboard" element={<Dashboard />}/>}
          {authToken  && <Route path="/onboarding" element={<Onboarding />}/>}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
