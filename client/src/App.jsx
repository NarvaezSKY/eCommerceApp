import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3000/api/products';
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error de red - ${response.status}`);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error de fetch:', error);
      }
    };

    fetchData();
  }, [App]); 

  return (
    <Container
    data-bs-theme="dark">
      <h3 className="mt-4 mb-4" style={{color:"white"}} >Our latest products:</h3>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {data.map((item, index) => (
          <Col key={index}>
            <Card>
              <Card.Img variant="top" src={item.productImage} />
              <Card.Body>
                <Card.Title>{item.productName}</Card.Title>
                <Card.Text>{item.productDetails}</Card.Text>
                <Card.Text>{item.productPrice}</Card.Text>
                <Button
                  variant="primary"
                  target='_blank'
                  href={`https://api.whatsapp.com/send?phone=+573202966323&text=Hola,%20me%20interesa%20este%20producto:%20${encodeURIComponent(item.productName)}`}
                >
                  Buy it!
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;