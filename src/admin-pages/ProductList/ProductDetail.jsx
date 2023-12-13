import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, getReviewById } from "../../store";
import { useParams } from "react-router-dom";
import { Modal, Box, Avatar, LinearProgress } from "@mui/material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import {
  Container,
  ImageList,
  ImageListItem,
  Card,
  CardContent,
  Typography,
  Rating,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  Category,
  MonetizationOn,
  Room,
  AccessTime,
  Description,
  Update,
  RateReview,
} from "@mui/icons-material";
import Header from "../../components/common/Header";
<<<<<<< HEAD
import TopAppBar from "../../components/TopAppBar";
=======
>>>>>>> develop
import "../../style/ProductDetail.css";
import Layout from "../../components/common/Layout";

function ProductDetail() {
  const initialProduct = {
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    Nutrition_Fact: "",
    Origin: "",
    Supplier: "",
    photos: [],
  };

  const dispatch = useDispatch();
  const params = useParams();
  const [productData, setProductData] = useState(initialProduct);
  const [reviewData, setReviewData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const product = useSelector((state) => state.products.singleProduct);
  const review = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getSingleProduct(params.id));
    dispatch(getReviewById(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product) {
      setProductData({
        ...product.product,
        photos: product.product.photos || [],
      });
    }
  }, [product]);

  useEffect(() => {
    if (review.data && review.data.data) {
      // Assuming your reviews are an array, adjust accordingly if needed
      setReviewData(review);
    }
  }, [review]);

  const handleImageClick = (photo) => {
    setSelectedImage(photo.url);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Layout>
      <Container maxWidth="xl" className="product-detail-container">
        <Header title="Product Detail" />
      </Container>
      <Container maxWidth="xl">
        <div className="container-details">
          <div>
            <div>
              {/* Show the primary image */}
              {productData.photos.length > 0 && (
                <img
                  src={productData.photos[0].url}
                  alt=""
                  style={{ width: 500, height: 450 }}
                />
              )}
            </div>
            <div>
              {/* Show the image gallery */}
              <ImageList
                sx={{ width: 500, height: 250 }}
                cols={4}
                rowHeight={164}
              >
                {productData.photos.map((photo, index) => (
                  <ImageListItem
                    key={index}
                    className="img-gallery"
                    onClick={() => handleImageClick(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title || `Image ${index}`}
                      loading="skeleton"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
          <div className="container-item">
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
              >
                <AccountCircle sx={{ fontSize: 24, marginRight: 1 }} />
                Name: {productData?.name}
              </Typography>
              <Divider />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
              >
                <AccountCircle sx={{ fontSize: 24, marginRight: 1 }} />
                Supplier: {productData.Supplier?.firstName}{" "}
                {productData.Supplier?.lastName}
              </Typography>
              <Divider />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
              >
                <Category sx={{ fontSize: 24, marginRight: 1 }} />
                Category: {productData.category.name}
              </Typography>
              <Divider />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
              >
                <MonetizationOn sx={{ fontSize: 24, marginRight: 1 }} />
                Price: {productData.price}$
              </Typography>
              <Divider />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
              >
                <Room sx={{ fontSize: 24, marginRight: 1 }} />
                Origin: {productData.Origin}
              </Typography>
              <Divider />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="flex-start"
              >
                <Description sx={{ fontSize: 24, marginRight: 1 }} />
                Description: {productData.description}
              </Typography>
              <Divider />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
              >
                <AccessTime sx={{ fontSize: 24, marginRight: 1 }} />
                Created At: {new Date(productData.createdAt).toLocaleString()}
              </Typography>
              <Divider />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
              >
                <Update sx={{ fontSize: 24, marginRight: 1 }} />
                Updated At: {new Date(productData.updatedAt).toLocaleString()}
              </Typography>
              <Divider />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
              >
                <RateReview sx={{ fontSize: 24, marginRight: 1 }} />
                Reviews: {reviewData?.data?.data?.reviews?.length}
              </Typography>
            </Box>
          </div>
        </div>
        <div className="container-item">
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            className="title-rating"
          >
            Average Rating
          </Typography>
          <Card className="review-card">
            <CardContent>
              <div className="average-rating">
                <div className="left-average">
                  <Typography variant="h5" fontWeight={100}>
                    Supposed to be a progress chart
                  </Typography>
                  <div>
                    <p>5&nbsp;stars</p>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={reviewData?.data?.data?.averageRating * 20}
                      />
                    </Box>
                    <p>(2)</p>
                  </div>
                  <div>
                    <p>4&nbsp;stars</p>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={reviewData?.data?.data?.averageRating * 20}
                      />
                    </Box>
                    <p>(2)</p>
                  </div>
                  <div>
                    <p>3&nbsp;stars</p>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={reviewData?.data?.data?.averageRating * 20}
                      />
                    </Box>
                    <p>(2)</p>
                  </div>

                  <div>
                    <p>2&nbsp;stars</p>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={reviewData?.data?.data?.averageRating * 20}
                      />
                    </Box>
                    <p>(2)</p>
                  </div>
                  <div>
                    <p>1&nbsp;stars</p>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={reviewData?.data?.data?.averageRating * 20}
                      />
                    </Box>
                    <p>(10)</p>
                  </div>
                </div>
                <div className="total-review">
                  <Typography variant="h4" color="primary" align="center">
                    Total Reviews ({reviewData?.data?.data?.reviews?.length})
                  </Typography>
                  <Typography
                    variant="h2"
                    color="primary"
                    align="center"
                    fontWeight={500}
                  >
                    {reviewData?.data?.data?.averageRating}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={parseFloat(reviewData?.data?.data?.averageRating)}
                    align="center"
                    readOnly
                    precision={0.1}
                  />
                  <Typography variant="h5" color="primary" align="center">
                    Product Average Rating Star
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Typography variant="h5" gutterBottom className="title-rating-2">
            Customer Reviews
          </Typography>
          {reviewData.data &&
            reviewData.data.data.reviews &&
            reviewData.data.data.reviews.map((review, index) => (
              <Card key={index} className="review-card">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    className="profile-user"
                  >
                    <div>
                      <Avatar
                        alt="profile"
                        sx={{ width: 56, height: 56 }}
                        src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xMl9waG90b19vZl9nb2xkZW5fcmV0cmlldmVyX3B1cHB5X2p1bXBpbmdfaXNvbF83MTM2NGE2OS1kZTM0LTQzMWEtYWRkZS04ZTdmZWQ0ZGFiOTIucG5n.png"
                      />
                    </div>
                    <div className="star">
                      <p className="username">
                        {review.userId?.firstName} {review.userId?.lastName}
                      </p>
                      <p className="date">
                        {formatDistanceToNow(new Date(review.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </Typography>
                  <Rating
                    name="read-only"
                    value={review.rating}
                    readOnly
                    precision={0.5}
                  />

                  <Typography variant="body1" color="textSecondary">
                    Description: {review.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
      </Container>
      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        aria-labelledby="selected-image"
        aria-describedby="image-modal"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          onClick={handleCloseModal}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxHeight: "80vh", maxWidth: "80vw" }}
            />
          )}
        </Box>
      </Modal>
    </Layout>
  );
}

export default ProductDetail;
