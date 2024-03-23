import { RouterProvider } from 'react-router-dom';
import './App.css';
import appRouting from './appRouting';

function App() {
  return (
    <>
      <RouterProvider router={appRouting} />
    </>
  );
}

export default App;
