import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCardImage,
  MDBCardGroup,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";

const CardBlog = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  likes,
  name,
}) => {
  const except = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 1000) + " ...";
    }
    return str;
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWith: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{name}</div>
        <span className="text-start tag-card">
          {tags.map((tag) => (
            <Link to={`/blogs/tag/${tag}`}> #{tag}</Link>
          ))}
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {except(description)}
            <Link to={`/blog/${_id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardBlog;
