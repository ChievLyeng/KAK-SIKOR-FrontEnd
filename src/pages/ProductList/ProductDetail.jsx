import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, getReviewById } from "../../store";
import { useParams } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {
  Container,
  ImageList,
  ImageListItem,
  makeStyles,
  Card,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";
import Header from "../../common-component/Header";
import TopAppBar from "../../components/TopAppBar";
import "../../style/ProductDetail.css";

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
    <>
      <Container maxWidth="xl" className="MuiContainer-maxWidthMd">
        <TopAppBar />
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
              <ImageList sx={{ width: 500 }} cols={4} rowHeight={164}>
                {productData.photos.map((photo, index) => (
                  <ImageListItem
                    key={index}
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
            <p>
              <strong>Supplier</strong> ~ {productData.Supplier.firstName}{" "}
              {productData.Supplier.lastName}
            </p>
            <p>
              <strong>Name</strong> ~ {productData.name}
            </p>
            <p>
              <strong>Category</strong> ~ {productData.category.name}
            </p>
            <p>
              <strong>Price</strong> ~ {productData.price}$
            </p>
            <p>
              <strong>Origin</strong> ~ {productData.Origin}
            </p>
            <p>
              <strong>Nutrition Fact</strong> ~ {productData.Nutrition_Fact}
            </p>
            <p>
              <strong>Created At</strong> ~{" "}
              {new Date(productData.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Update At</strong> ~{" "}
              {new Date(productData.updatedAt).toLocaleString()}
            </p>
            <p>
              <strong>Review</strong> ~ {reviewData?.data?.data?.reviews.length}
            </p>
            <p>
              <strong>Description</strong> ~ {productData.description}
            </p>
          </div>
        </div>
        <div className="container-item">
          <h2>{reviewData?.data?.data?.averageRating}</h2>
        </div>
        <div>
          <h1>Customer Reviews</h1>
          {reviewData?.data?.data?.reviews.map((review, index) => (
            <Card key={index} className="review-card">
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  className="profile-user"
                >
                  <div>
                    <img
                      src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xMl9waG90b19vZl9nb2xkZW5fcmV0cmlldmVyX3B1cHB5X2p1bXBpbmdfaXNvbF83MTM2NGE2OS1kZTM0LTQzMWEtYWRkZS04ZTdmZWQ0ZGFiOTIucG5n.png"
                      alt=""
                      className="img-review"
                    />
                  </div>
                  <div className="star">
                    <p className="username">
                      {review.userId?.firstName} {review.userId?.lastName}
                    </p >
                    <p className="date">{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</p>
                  </div>
                </Typography>
                <Rating
                  name="read-only"
                  value={review.rating} // Use review.rating instead of reviewData?.data?.data?.reviews[0]?.rating
                  readOnly
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
    </>
  );
}

export default ProductDetail;