import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../store";
import { useParams } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import { Container, ImageList, ImageListItem } from "@mui/material";
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
  const [selectedImage, setSelectedImage] = useState(null);

  const product = useSelector((state) => state.products.singleProduct);

  useEffect(() => {
    dispatch(getSingleProduct(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product) {
      setProductData({
        ...product.product,
        photos: product.product.photos || [],
      });
    }
  }, [product]);

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
              <strong>Review</strong> ~ 3
            </p>
            <p>
              <strong>Description</strong> ~ {productData.description}
            </p>
          </div>
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
