import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Home from './components/pages/Home'
import ListarRoupas from './components/pages/ListarRoupas'
import CadastroRoupas from './components/pages/CadastroRoupas'
import DetailRoupa from './components/pages/DetailRoupa'


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
              <Route path= '/DetailRoupa/:cod_pedido' element={<DetailRoupa/>}/>


            </Route>

          </Routes>


        </Container>


      </BrowserRouter>
    </>
  )
}

export default App
