import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import ModalDefault from '../../components/ModalDefault/ModalDefault';

import './styles.modules.scss';

const ProductsDetail = () => {

  const { product } = useSelector((state) => state.products);
  const history = useHistory();

  return (
    <Container>
      {product ?
        <>
          <Row md={2} xs={1} className="product-row">
            <Col className="image-col">
              <i class="fas fa-angle-left" style={{ cursor: 'pointer' }} onClick={() => history.goBack()}> go back</i>
              <img 
                src={product.api_featured_image}
                alt={product.name}
              />
            </Col>
            <Col>
              <h2>{product.name}</h2>
              <Row>
                <div className="brand-category">
                  <small>BRAND: {product.brand}</small>
                  <small>CATEGORY: {product.category}</small>
                </div>
              </Row>
              <Row className="mt-5 price-row">
                <p >{product.price_sign} {product.price}</p>
              </Row>
              <Row className="mt-5">
                <p>{product.description}</p>
              </Row>
            </Col>
          </Row>
        </>
         :
        <ModalDefault 
          modalType="MODAL_LOADING"
        />
      }
    </Container>
  );
}

export default ProductsDetail;