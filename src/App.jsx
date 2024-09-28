import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import DefaultList from './components/DefaultList'
import Movie from './components/Movie'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultList />}/>
        <Route path="/movie/:id" element={<Movie />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
