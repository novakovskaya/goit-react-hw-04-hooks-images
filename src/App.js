import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { animateScroll as scroll } from "react-scroll";

import fetchImagesApi from "./services/pixabay";
import Container from "./components/Container";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import LoaderSpinner from "./components/Loader";
import Modal from "./components/Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [imagesArray, setImagesArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imagesModal, setImagesModal] = useState({});
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    setStatus(Status.PENDING);

    fetchImagesApi(searchQuery, page)
      .then((images) => {
        if (images.hits.length === 0) {
          toast.error("Requested images not found!");
          resetPage();
        } else if (images.hits.length < 12) {
          setImagesArray(images.hits);
          setStatus(Status.RESOLVED);
        } else if (images.hits.length >= 12 && page >= 1) {
          setImagesArray((prevState) => [...prevState, ...images.hits]);
          setStatus(Status.RESOLVED);
          scroll.scrollMore(100);
        }
      })
      .catch((error) => {
        toast.error("Requested images not found!");
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, page]);

  const handleFormSubmit = (searchQuery) => {
    resetPage();
    setSearchQuery(searchQuery);
  };

  const resetPage = () => {
    setPage(1);
    setImagesArray([]);
  };

  const handleLoadMoreBtn = () => {
    setPage((prevState) => prevState + 1);
  };

  const toggleModal = (imagesArray) => {
    setShowModal(!showModal);
    setImagesModal(imagesArray);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery images={imagesArray} onOpenModal={toggleModal} />

      {status === Status.PENDING && <LoaderSpinner />}

      {imagesArray.length >= 12 && (
        <Button onClickLoadMore={handleLoadMoreBtn} />
      )}

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <img src={imagesModal.largeImageURL} alt={imagesModal.tags} />
        </Modal>
      )}

      <ToastContainer autoClose={1500} />
    </Container>
  );
};

export default App;
