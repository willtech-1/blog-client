import React from 'react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getBlogs, setCurrentPage } from '../redux/features/blogSlice';
import CardBlog from '../components/CardBlog';
import Pagination from "../components/Pagination";
import Spinner from '../components/Spinner';
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { blogs, loading, currentPage, numberOfPages } = useSelector((state) => ({...state.blog }))
  const displatch = useDispatch();

  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    dispatch(getBlogs(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    displatch(getBlogs())
  }, []);

  if(loading){
    return <Spinner />
  }

  return (
    <div style={{ margin: "auto", padding: "15px", maxWidth: "1000px", alignContent: "center" }}>
      <MDBRow className='mt-5'>
        {blogs.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Posts...
          </MDBTypography>
        )}
      </MDBRow>
      <MDBCol>
        <MDBContainer>
          <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
            {blogs && blogs.map((item, index) => (
              <CardBlog key={index} {...item} />
            ))}
          </MDBRow>
          {blogs.length > 0 && !searchQuery && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}
        </MDBContainer>
      </MDBCol>
    </div>
  )
}

export default Home