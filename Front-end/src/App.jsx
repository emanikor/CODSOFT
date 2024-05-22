import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import About from './Components/About/About';
import Home from "./Pages/Home";
import PostJob from './Pages/PostJob';
import Sign from './Pages/Sign';
import PreviewJob from './Components/Preview/PreviewJob';
import Employer from './Components/Regstration/Employer';
import Signup from './Components/Regstration/Signup';
import Secret from './Components/Profile/Secret';
import Category from './Components/PostForm/Category'
import JobApplication from './Components/JobAplicationForm/jobApplication';
import Signin from  './Components/Regstration/Signin';
import Jobcategory from './Components/Category/Jobcategory'


function App() {

  return (
    <>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About />} />
          <Route path="/previewjob/:jobId" element={<PreviewJob/>} />
           <Route path='/postjob' element={<PostJob />} />
           <Route path='/sign' element={<Sign/>}/>
           <Route path='/signin' element={<Signin/>}/>
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/employer' element={<Employer/>}/>
           <Route path='category' element={<Category/>}/>
           <Route path='/login' element={<Secret/>} />
           <Route path='/application' element={<JobApplication/>} />
           <Route path="/category/:category" element={<Jobcategory/>} />
        </Routes>
      </div>
    </Router>
  </>
  )
}

export default App
