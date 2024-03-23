import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExpensePage from './pages/AddExpensePage';
import Expenses from './pages/Expenses';

export const DefaultPage = () => {
  return <h1>No Page Found</h1>;
};

const appRouting = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/add-expense',
    element: <AddExpensePage />,
  },
  {
    path: '/expenses',
    element: <Expenses />,
  },
  {
    path: '*',
    element: <DefaultPage />,
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
export default appRouting;
