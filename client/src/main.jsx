import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import BrandExample from './components/navbar.jsx';
import Container from 'react-bootstrap/esm/Container.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrandExample/>
    <Container data-bs-theme="dark">
      <App />
    </Container>
  </>    

  
)
