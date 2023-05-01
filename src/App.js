

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home';
import FavoriteList from './pages/FavoriteList/FavoriteList';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/favorite_list' element={<FavoriteList/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

