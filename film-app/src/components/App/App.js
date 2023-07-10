import './App.css';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';

function App() {
    return (
        <>
            <Routes>
                <Route path="/sign-up" element={<Register />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/saved-movies" element={<SavedMovies />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/*" element={<Main />} />
            </Routes>

        </>


    );
}

export default App;