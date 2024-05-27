import './App.css';
// import Navigation from './Component/Navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Component/LandingPage/Landing';
import SearchFor from './Component/SearchFor/SearchFor';
import TopTutor from './Component/TopTutor/TopTutor';
import SubjectList from './Component/SubjectList/SubjectList';
import FindTutor from './Component/FindTutor/FindTutor';
import ProfileTutor from './Component/Profile_Tutor/Profile_Tutor';
import TutorRegi from './Component/TutorRegi/TutorRegi';
import ReqForTutor from './Component/ReqForTutor/ReqForTutor';
import TuitionJob from './Component/TuitionJob/TuitionJob';
// import Dashboard from './Component/Dashboard/Dashboard';
import Login from './Component/Login/Login';
import MyProfile from './Component/MyProfile/MyProfile';
import { AdminRoute, PrivateRoute } from './Component/UseAuth';
import Footer from './Component/Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Faq from './Component/FAQ/Faq';
// import Feature from './Component/Feature/Feature';
import Counter from './Component/Counter/Counter';
import ScrollToTop from './Component/ScrollToTop/ScrollToTop';
import Blog from './Component/Blog/Blog';
import Admin from './Component/Admin/Admin';
import BlogDetails from './Component/Blog/BlogDetails';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';
import Register from './Component/Register/Register';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import MyBlogs from './Component/Blog/MyBlogs';
import EditBlog from './Component/Blog/EditBlog';
import MyTuitionJob from './Component/TuitionJob/MyTuitionJob';
import EditTuitionJob from './Component/TuitionJob/EditTuitionJob';
import TuitionRequests from './Component/TuitionJob/TuitionRequests';
import TutorApplicantsRequests from './Component/TutorRegi/TutorApplicantsRequests';
import MyTeacher from './Component/MyTeachers/MyTeacher';

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="App">
      <Router>
        <ScrollToTop></ScrollToTop>
        <Switch>
          <Route exact path="/more-subject">
            <SubjectList></SubjectList>
          </Route>
          <Route exact path="/registration-tutor">
            <TutorRegi />
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/blog">
            <Blog />
            <Footer></Footer>
          </Route>

          <Route exact path="/my-blogs">
            <MyBlogs />
            <Footer></Footer>
          </Route>

          <Route exact path="/blog/edit/:id">
            <EditBlog />
            <Footer></Footer>
          </Route>
          <Route exact path="/about">
            <About></About>
          </Route>
          <Route exact path="/blog/:id">
            <BlogDetails></BlogDetails>
            <Footer></Footer>
          </Route>
          <PrivateRoute exact path="/my-profile">
            <MyProfile />
          </PrivateRoute>
          <Route exact path="/tuition-job">
            <TuitionJob />
            <Footer></Footer>
          </Route>

          <Route exact path="/my-tuition-jobs">
            <ProtectedRoute>
              <MyTuitionJob />
              <Footer></Footer>
            </ProtectedRoute>
          </Route>


          <Route exact path="/my-tuition-jobs/edit/:id">
            <ProtectedRoute>
              <EditTuitionJob />
              <Footer></Footer>
            </ProtectedRoute>
          </Route>

          <Route exact path="/my-teachers">
            <ProtectedRoute>
              <MyTeacher />
              <Footer></Footer>
            </ProtectedRoute>
          </Route>


          <Route exact path="/subject/:id">
            <FindTutor />
          </Route>
          <Route exact path="/profile/:id">
            <ProtectedRoute>
              <ProfileTutor />
            </ProtectedRoute>
          </Route>

          <Route exact path="/reqTutor">
            <ProtectedRoute>
              <ReqForTutor />
              <Footer />
            </ProtectedRoute>
          </Route>

          <ProtectedRoute exact path="/admin/tuition-requests/:id">
            <TuitionRequests />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin/tutors/tuition-applicants/:id">
            <TutorApplicantsRequests />
          </ProtectedRoute>

          <AdminRoute exact path="/admin">
            <Admin></Admin>
          </AdminRoute>
          <Route exact path="/home">
            <Landing></Landing>
            <SearchFor></SearchFor>
            <Counter></Counter>
            <TopTutor></TopTutor>
            <Faq></Faq>
            <Contact></Contact>
            <Footer></Footer>
          </Route>
          <Route exact path="/">
            <Landing></Landing>
            <SearchFor></SearchFor>
            <Counter></Counter>
            <TopTutor></TopTutor>
            {/* <Faq></Faq> */}
            <Contact></Contact>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
