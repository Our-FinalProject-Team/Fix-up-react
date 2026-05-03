
import RegisterRole from './pages/RegisterRole.tsx';
import ClientRegister from './pages/Registration/ClientRegister.tsx';
import Home from './pages/Home.tsx';
import Services from './pages/Services.tsx';
import BookService from './pages/BookService.tsx';
import Profile from './pages/Profile.tsx';
import HowItWorks from './pages/HowItWorks.tsx';
import __Layout from './Layout.tsx';
import Registration from './pages/Registration/ProRegister.tsx';
import  LogIn   from './pages/LogIn/LogIn.tsx';
import ReviewForm from './pages/ReviewForm.tsx';
import FullScreenChat from './pages/FullScreenChat.tsx'
import payment from './pages/payment.tsx';
import ProDashboard from './pages/ProDashBoard.tsx';
import HowItWorksPro from './pages/howitWorksPro.tsx';
export const PAGES = {
   
    "Home": Home,
    "Services": Services,
    "BookService": BookService,
    "Profile": Profile,
    "HowItWorks": HowItWorks,
    "Registration": Registration, 
    "LogIn": LogIn,
    "RegisterRole": RegisterRole, 
    "ClientRegister": ClientRegister,
    "ReviewForm":ReviewForm,
    "FullScreenChat":FullScreenChat,
    "payment":payment,
    "ProDashboard":ProDashboard,
    "HowItWorksPro":HowItWorksPro,
};


export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};