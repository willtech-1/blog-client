import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { searchBlogs } from "../redux/features/blogSlice";
// import decode from "jwt-decode";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const token = user?.token;

  // if (token) {
  //   const decodedToken = decode(token);
  //   if (decodedToken.exp * 1000 < new Date().getTime()) {
  //     dispatch(setLogout());
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchBlogs(search));
      navigate(`/blogs/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };
  
  return (
    <MDBNavbar fixed="top" expand="lg" style={{ background: "#00061a" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{
            color: "#f2f2f2",
            fontWeight: "600",
            letterSpacing: "0.75px",
            fontSize: "1rem",
          }}
        >
          Learning
        </MDBNavbarBrand>
        <MDBNavbarToggler
          style={{ color: "#f2f2f2" }}
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5
                style={{
                  marginRight: "10px",
                  marginTop: "28px",
                  color: "#f2f2f2",
                  fontSize: "1rem",
                  letterSpacing: "0.5px"
                }}
              >
                {user?.result?.name}
              </h5>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Blogs</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addBlog">
                    <p className="header-text">Add Blog</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">My Blogs</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={handleLogout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Blog"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "6px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
