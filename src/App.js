import { useRoutes } from 'react-router-dom';

import Feed from './pages/home/Feed';
import Home from './pages/home/Home';
import Profile from './pages/home/Profile';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import PrivateAuth from './services/utils/privateAuth';
import PublicAuth from './services/utils/publicAuth';

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: (
        <PublicAuth>
          <SignIn />
        </PublicAuth>
      ),
    },
    {
      path: '/sign-up',
      element: (
        <PublicAuth>
          <SignUp />
        </PublicAuth>
      ),
    },
    {
      path: '*',
      element: (
        <PublicAuth>
          <SignIn />
        </PublicAuth>
      ),
    },
    {
      path: '/home',
      element: (
        <PrivateAuth>
          <Home />
        </PrivateAuth>
      ),
      children: [
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'feed',
          element: <Feed />,
        },
      ],
    },
  ]);
  return element;
}

export default App;
