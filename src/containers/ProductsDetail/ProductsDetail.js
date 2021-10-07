import React from 'react';
import { useSelector } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import ModalDefault from '../../components/ModalDefault/ModalDefault';

const ProductsDetail = () => {

  const { product } = useSelector((state) => state.products);

  return (
    <Container>
      {product ?
        <Row md={2} xs={1} style={{ display: 'flex', margin: '5rem auto', width: '90vw'}}>
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={product.api_featured_image}
              alt={product.name} 
              style={{ width: '60%' }}
            />
          </Col>
          <Col>
            <h2>{product.name}</h2>
            <Row>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <small>BRAND: {product.brand}</small>
                <small>CATEGORY: {product.category}</small>
              </div>
            </Row>
            <Row className="mt-5" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              <p >{product.price_sign} {product.price}</p>
            </Row>
            <Row className="mt-5">
              <p>{product.description}</p>
            </Row>
          </Col>
        </Row> :
        <ModalDefault 
          modalType="MODAL_LOADING"
        />
      }
    </Container>
  );
}

export default ProductsDetail;