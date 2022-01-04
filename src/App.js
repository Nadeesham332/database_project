import Home from './Pages/Home/Home.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './Pages/NotFound/NotFound';
import Cselect from './Pages/CourseSelection/Cselect';
import Adetails from './Pages/AssessmentDetails/Adetails';
import GSlogin from './Pages/LogIn/StudentGuardian/GSlogin';
import Vresult from './Pages/ViewResult/Vresult';
import ALogin from './Pages/LogIn/Assessor/ALogin';
import CRUDresults from './Pages/AssossorView/CRUDresults';
import CRUDassessments from './Pages/InstructorView/CRUDassessments';
import InsertResults from './Pages/InsertResults/InsertResults';
import ILogin from './Pages/LogIn/Instructor/ILogin';
import About from './Pages/About/About';
import Vassessment from './Pages/ViewAssessment/Vassessment';
import StudentDB from './Dashboard/Pages/Student';
import GuardianDB from './Dashboard/Pages/Guardian';
import EmployeeDB from './Dashboard/Pages/Employee';
import CourseDB from './Dashboard/Pages/Courses';
import AssessmentDB from './Dashboard/Pages/Assessment';
import ResultReportDB from './Dashboard/Pages/ResultReport'
import AdminLog from './Dashboard/Pages/admin'

function App() {

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/About">
              <About />
            </Route>
            <Route path="/CourseSelection">
              <Cselect />
            </Route>
            <Route path="/AssessmentDetails/:id" >
              <Adetails />
            </Route>
            <Route path="/AsseossorView/InsertResults/:id">
              <InsertResults />
            </Route>
            <Route path="/StudentGuardianLogIn">
              <GSlogin />
            </Route>
            <Route path="/ViewResult">
              <Vresult />
            </Route>
            <Route path="/AssessorLogin">
              <ALogin />
            </Route>
            <Route path="/InstructorLogin">
              <ILogin />
            </Route>
            <Route path="/ViewAssessment">
              <Vassessment />
            </Route>
            <Route path="/AssessorView">
              <CRUDresults />
            </Route>
            <Route path="/InstructorView">
              <CRUDassessments />
            </Route>
            <Route path="/admin/Student">
              <StudentDB />
            </Route>
            <Route path="/admin/Guardian">
              <GuardianDB />
            </Route>
            <Route path="/admin/Employee">
              <EmployeeDB />
            </Route>
            <Route path="/admin/Courses">
              <CourseDB />
            </Route>
            <Route path="/admin/Assessment">
              <AssessmentDB />
            </Route>
            <Route path="/admin/ResultReport">
              <ResultReportDB />
            </Route>
            <Route path="/admin">
              <AdminLog />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
