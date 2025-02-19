import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import NewPatientLogin from './pages/PatientLogin.tsx';
import DrLogin from './pages/Drlogin.tsx'
import PatientSignup from './pages/PatientSignup.tsx';
import DrSignUp from './pages/DrSignup.tsx';
import PatientProfile from './pages/PatientProfile.tsx';
import DoctorProfile from './pages/DrProfile.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/Drlogin',
        element: <DrLogin />
      },
      {
        path: '/PatientLogin',
        element: <NewPatientLogin />
      },
      {
        path: '/DrSignup',
        element: <DrSignUp/>
      },
      {
        path: '/PatientSignup',
        element: <PatientSignup />

      },
      {
        path: '/PatientProfile',
        element: <PatientProfile patient={{ patient_id: 0, patient_name: '', email: '', height: 0, weight: 0, age: 0, dr_id: 0 }} />
      },
      {
        path: '/DrProfile',
        element: <DoctorProfile />
      } ,
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
