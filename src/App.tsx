import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import { PokeInfo } from './pages/PokeInfo/PokeInfo';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/test-pokemons" element={<Home />} />
        <Route path="/test-pokemons/:pokemon" element={<PokeInfo />} />
      </Routes>
    </div>
  );
}

export default App;
