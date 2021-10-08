import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import ModalDefault from '../../components/ModalDefault/ModalDefault';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import PaginationComponent from 'react-js-pagination';
import { fetchProducts, setProduct } from '../../store/actions/productsAction';
import api from '../../api/api';

import './Home.modules.scss';

function Home() {
  const [allProducts, setAllProducts] = useState();
  const [showingProducts, setShowingProducts] = useState();
  const [pageActive, setPageActive] = useState(1);
  const [openModalImage, setOpenModalImage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products.products);
  const { firstProducts } = useSelector((state) => state.products.products);

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
        totalItemsCount={allProducts?.length > 0 ? allProducts?.length : 0}
        onChange={handlePageChange}
        itemsCountPerPage={24}
      />
    </div>
  )

  const handleShowDetails = (product) => {
    dispatch(setProduct(product))
    history.push(`/product/${product.id}`);
  }

  const handleClickOpenModal = (product) => {
    localStorage.setItem('product', JSON.stringify(product));
    setOpenModalImage(true);
  }

  const renderModal = () => {
    const product = JSON.parse(localStorage.getItem('product'));
    return (
      <ModalDefault 
        modalType="MODAL_IMAGE"
        closeModal={() => setOpenModalImage(false)}
        isModalOpen={openModalImage}
      >
        <img src={product.api_featured_image} alt={product.name} style={{ width: '100%', maxHeight: '80%' }} />
        <p style={{ marginTop: '1rem' }}>{product.name}</p>
      </ModalDefault>
    )
  }
  const handleRatingChange = async(e) => {
    var page = 1;
    var lastProduct = 0;
    var firstProduct = 0;
    if (e.target.value === 'desc') {
      var descending = await allProducts.sort((a,b) => a.rating < b.rating ? -1 : a.rating > b.rating ? 1 : 0).reverse();
      setAllProducts(descending);
      if (descending.length > 0) {
        
        const newArray = [];
        if (descending.length < 24) {
          lastProduct = (page * descending.length) - 1;
          firstProduct = (page - 1) * descending.length;
        } else {
          lastProduct = (page * 24) - 1;
          firstProduct = (page - 1) * 24;
        }
        for (let i = firstProduct; i <= lastProduct; i++) {
          newArray.push(descending[i]);
        }
        setShowingProducts(newArray)
      }
    } else {
      var ascending = await allProducts.sort((a,b) => a.rating < b.rating ? -1 : a.rating > b.rating ? 1 : 0);
      setAllProducts(ascending);
      if (ascending.length > 0) {
        
        const newArray = [];
        if (ascending.length < 24) {
          lastProduct = (page * ascending.length) - 1;
          firstProduct = (page - 1) * ascending.length;
        } else {
          lastProduct = (page * 24) - 1;
          firstProduct = (page - 1) * 24;
        }
        for (let i = firstProduct; i <= lastProduct; i++) {
          newArray.push(ascending[i]);
        }
        setShowingProducts(newArray)
      }
    }
  }

  const handleFilterChange = async(e) => {
    setShowModal(true);
    const response = await api.get(`products.json?product_tags=${e.target.value}`);
    const newArray = [];
    const page = 1
    var lastProduct = 0;
    var firstProduct = 0;
    if (response.data.length < 24) {
      lastProduct = (page * response.data.length) - 1;
      firstProduct = (page - 1) * response.data.length;
    } else {
      lastProduct = (page * 24) - 1;
      firstProduct = (page - 1) * 24;
    }
    for (let i = firstProduct; i <= lastProduct; i++) {
      newArray.push(response.data[i]);
    }
    setShowingProducts(newArray);
    setAllProducts(response.data);
    localStorage.setItem('productFiltered', JSON.stringify(response.data));
    localStorage.setItem('productFilteredFirstPage', JSON.stringify(newArray));
    setShowModal(false);
  }

  return (
    <Container>
      <h1 className="title">Makeup Products</h1>
      {showingProducts?.length === 0 ? <ModalDefault modalType="MODAL_LOADING"/> : null }
      {showModal ? <ModalDefault modalType="MODAL_LOADING"/> : null }

      <Row className="mb-3">
        <Col>
          <span>Filter by tags: </span>
          <select name="filter" id="filter" onChange={(e) => handleFilterChange(e)}>
            <option value="">Select a tag ...</option>
            {tags.map((tag, index)=> (
              <option value={tag} key={index}>{tag}</option>
            ))}
          </select>
        </Col>
        <Col className="col-sort-by">
          <span>Sort by rating: </span>
          <select name="rating" id="rating" onChange={(e) => handleRatingChange(e)}>
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
          </select>
        </Col>
      </Row>

      <Row lg={4} md={3} sm={2} xs={1} className="g-4">
          {showingProducts?.length > 0 &&
          showingProducts?.map(product => (
            <Col key={product?.id}>
              <Card className="card-container">
                <div className="div-image">
                  <Card.Img onClick={() => handleClickOpenModal(product)} variant="left" src={product?.api_featured_image} className="card-img" style={{ maxHeight: '19rem', width: 'auto', cursor: 'pointer' }}/>
                </div>
                {openModalImage && renderModal()}
                <Card.Body>
                  <Card.Title className="card-text-title"><b>{product?.name}</b></Card.Title>
                  <Row>
                    <Card.Text><b>{product?.price_sign} {product?.price}</b></Card.Text>
                  </Row>
                  <Row>
                    <Card.Text>Rating: {(product?.rating * 100) / 5 || 0}</Card.Text>
                  </Row>
                  <Row className="mt-5">
                    <div>
                      <span>Colors: </span>
                      <select name="colors" id="colors" className="select-colors">
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
