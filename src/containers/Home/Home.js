import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import PaginationComponent from 'react-js-pagination';
import { fetchProducts, setProduct, searchByTag } from '../../store/actions/productsAction';
import api from '../../api/api';

import './Home.modules.scss';

function Home() {
  const [allProducts, setAllProducts] = useState();
  const [showingProducts, setShowingProducts] = useState();
  const [pageActive, setPageActive] = useState(1);
  const [openModalImage, setOpenModalImage] = useState(false);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products.products);
  const { firstProducts } = useSelector((state) => state.products.products);
  const { productsSearched } = useSelector((state) => state.products);

  const history = useHistory();

  const tags = [
    'Canadian',
    'CertClean',
    'Chemical Free',
    'Dairy Free',
    'EWG Verified',
    'EcoCert',
    'Fair Trade',
    'Gluten Free',
    'Hypoallergenic',
    'Natural',
    'No Talc',
    'Non-GMO',
    'Organic',
    'Peanut Free Product',
    'Sugar Free',
    'USDA Organic',
    'Vegan',
    'alcohol free',
    'cruelty free',
    'oil free',
    'purpicks',
    'silicone free',
    'water free'
  ]

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem('productFiltered'));
    const productFirstPage = JSON.parse(localStorage.getItem('productFilteredFirstPage'));
    if (product) {
      setShowingProducts(productFirstPage)
      setAllProducts(product)
    } else {
      dispatch(fetchProducts());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem('productFiltered'));
    if (product) {
      return
    } else {
      setShowingProducts(firstProducts)
      setAllProducts(products)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstProducts.length > 0]);

  // useEffect(() => {
  //   setAllProducts(productsSearched);
  //   setShowingProducts();
  //   const newArray = [];
  //   const lastProduct = 23;
  //   const firstProduct = 0;
  //   console.log(lastProduct, firstProduct);
  //   for (let i = firstProduct; i <= lastProduct; i++) {
  //     newArray.push(productsSearched[i]);
  //   }
  //   console.log(newArray);
  //   setShowingProducts(newArray)
  // }, [productsSearched.length > 0]);

  const handlePageChange = (page) => {
    console.log(page);
    const newArray = [];
    const lastProduct = (page * 24) - 1;
    const firstProduct = (page - 1) * 24;
    console.log(lastProduct, firstProduct);
    for (let i = firstProduct; i <= lastProduct; i++) {
      newArray.push(allProducts[i]);
    }
    setShowingProducts(newArray);
    setPageActive(page);
  }

  const renderPagination = (
    <div className="Pagination_Container">
      <PaginationComponent
        activePage={pageActive}
        totalItemsCount={products?.length}
        onChange={handlePageChange}
      />
    </div>
  )

  const handleShowDetails = (product) => {
    dispatch(setProduct(product))
    history.push(`/product/${product.id}`);
  }

  console.log(showingProducts);
  console.log(products);
  console.log(firstProducts);

  const handleClickOpenModal = (product) => {
    localStorage.setItem('product', JSON.stringify(product));
    setOpenModalImage(true);
  }

  const renderModal = () => {
    const product = JSON.parse(localStorage.getItem('product'));
    console.log(product);
    return (
      <div  className="modal-wrapper" style={{ display: "flex", justifyContent: 'flex-start' }}>
        <div className="modal-content" style={{ height: '60%', overflow: 'auto'}}>
          <div className="modal-close-button" onClick={() => setOpenModalImage(false)}>{"\u00D7"}
          </div>
          <div style={{ minWidth: '65%', maxHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={product.api_featured_image} alt={product.name} style={{ width: '100%', maxHeight: '80%' }} />
            <p style={{ marginTop: '1rem' }}>{product.name}</p>
          </div>
        </div>
      </div>
    )
  }
  const handleRatingChange = async(e) => {
    if (e.target.value === 'desc') {
      var descending = await products.sort((a,b) => a.rating < b.rating ? -1 : a.rating > b.rating ? 1 : 0).reverse();
      setAllProducts(descending);
      if (descending.length > 0) {
        
        const newArray = [];
        const lastProduct = 23;
        const firstProduct = 0;
        console.log(lastProduct, firstProduct);
        for (let i = firstProduct; i <= lastProduct; i++) {
          newArray.push(descending[i]);
        }
        console.log(newArray);
        setShowingProducts(newArray)
      }
    } else {
      var ascending = await products.sort((a,b) => a.rating < b.rating ? -1 : a.rating > b.rating ? 1 : 0);
      setAllProducts(ascending);
      if (ascending.length > 0) {
        
        const newArray = [];
        const lastProduct = 23;
        const firstProduct = 0;
        console.log(lastProduct, firstProduct);
        for (let i = firstProduct; i <= lastProduct; i++) {
          newArray.push(ascending[i]);
        }
        console.log(newArray);
        setShowingProducts(newArray)
      }
    }
  }

  const handleFilterChange = async(e) => {
    // dispatch(searchByTag(e.target.value));
    // dispatch(fetchProducts(e.target.value));
    // console.log(productsSearched);
    const response = await api.get(`product_tags=${e.target.value}`);
    const newArray = [];
    const lastProduct = 23;
    const firstProduct = 0;
    console.log(lastProduct, firstProduct);
    for (let i = firstProduct; i <= lastProduct; i++) {
      newArray.push(response.data[i]);
    }
    console.log(newArray);
    setShowingProducts(newArray);
    setAllProducts(response.data);
    localStorage.setItem('productFiltered', JSON.stringify(response.data));
    localStorage.setItem('productFilteredFirstPage', JSON.stringify(newArray));
  }

  console.log(showingProducts);
  // console.log(productsSearched);

  return (
    <Container>
      <h1 style={{ textAlign: 'center', padding: '1rem' }}>Makeup Products</h1>
      {showingProducts?.length === 0 ? <ModalDefault modalType="MODAL_LOADING"/> : null }

      <Row className="mb-3">
        <Col>
          <span>Filter by tags: </span>
          <select name="filter" id="filter" onChange={(e) => handleFilterChange(e)}>
            {tags.map(tag => (
              <option value={tag}>{tag}</option>
            ))}
          </select>
        </Col>
        <Col md={{ span: 5, offset: 10 }}>
          <span style={{ marginRight: '1rem' }}>Sort by rating: </span>
          <select name="rating" id="rating" onChange={(e) => handleRatingChange(e)}>
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
        </Col>
      </Row>

      <Row lg={4} md={3} sm={2} xs={1} className="g-4">
          {showingProducts?.length > 0 &&
          showingProducts?.map(product => (
            <Col key={product.id}>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'center', height: '60%' }}>
                  <Card.Img onClick={() => handleClickOpenModal(product)} variant="left" src={product.api_featured_image} className="card-img" style={{ maxHeight: '19rem', width: 'auto', cursor: 'pointer' }} />
                </div>
                {openModalImage && renderModal()}
                <Card.Body>
                  <Card.Title style={{ fontSize: '1rem' }}><b>{product.name}</b></Card.Title>
                  <Card.Text><b>{product.price_sign} {product.price}</b></Card.Text>
                  <Card.Text>Rating: {product.rating || 0}</Card.Text>
                  <Row className="mt-5">
                    <div>
                      <span>Colors: </span>
                      <select name="colors" id="colors" style={{ width: '5rem' }}>
                        {product?.product_colors.map((color, index) => (
                          <option value={color.hex_value} key={index} style={{ background: `${color.hex_value}` }}>
                            
                          </option>
                        ))}
                      </select>
                    </div>
                  </Row>
                  <Row className="mt-5">
                    <Button variant="secondary" onClick={() => handleShowDetails(product)}>Show Details</Button>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
          }
      </Row>
      {renderPagination}
    </Container>
  );
}

export default Home;
