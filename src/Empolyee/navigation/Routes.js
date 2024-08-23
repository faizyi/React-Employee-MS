import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Home from '../../Empolyee/components/pages/home/home';
// import Empoyless from '../../Empolyee/components/pages/empoylees/Empoyless';
export default function EmployeeRoutes() {
  return (
    <>
    <Router>
    <Routes>
    <Route path="/" element={<Home/>} />
    {/* <Route path="/empoylees" element={<Empoyless/>} /> */}
    </Routes>
    </Router>
    </>
  )
}
