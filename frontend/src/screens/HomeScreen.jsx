import { Row, Col } from 'react-bootstrap';
import React from 'react'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
//import ProductCarousel from '../components/ProductCarousel'
import { useGetProductsQuery } from '../slices/productsApiSlice';


const HomeScreen = () => {
  const { pageNumber, keyword } = useParams()
  const { data, isLoading, isError } = useGetProductsQuery({ pageNumber, keyword })

  return (
    <>
      { isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
           {keyword ? (
                            <h5>Search results for "{keyword}"</h5>
                        ) : (
                          <>
                          
                          {/*//uncomment to access carousel
                          <ProductCarousel />*/}
                          <h3>Latest Products</h3>
                      </>
                        )}
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col className='my-2'>
            <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen