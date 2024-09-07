/* Importa os componentes de navegação da aplicação*/
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* Importa o CSS*/
import './App.css'

/* Importa o componente de container*/
import Container from './components/layout/Container'

/*Importa o componente de menu*/
import NavBar from './components/layout/NavBar'

import Home from './components/pages/Home'
import ListarRoupas from './components/pages/ListarRoupas'
import CadastroRoupas from './components/pages/CadastroRoupas'


function App() {

  return (
    <>

      <BrowserRouter>

        <Container>

          <Routes>

            <Route path='/' element={<NavBar />}>
              <Route path='/' element={<Home />} />
              <Route path='/ListarLivros' element={<ListarRoupas />} />
              <Route path='/CadastrarRoupas' element={<CadastroRoupas />} />

            </Route>

          </Routes>


        </Container>


      </BrowserRouter>
    </>
  )
}

export default App
