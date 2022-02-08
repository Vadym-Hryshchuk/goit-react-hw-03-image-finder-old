import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
import apiGetImages from "./services/PixabayApi";
import Searchbar from "./components/searchbar/Searchbar";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Modal from "./components/modal/Modal";
import Loader from "./components/loader/Loader";

class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    images: [],
    chooseImage: null,
    showModal: false,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ images: [] });
    }
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchSearchQuery();
      return;
    }
    if (prevState.page !== this.state.page) {
      console.log(prevState.page !== this.state.page);
      this.fetchSearchQuery();
    }
    if (prevState.chooseImage !== this.state.chooseImage) {
      this.toggleShowModal();
    }
  }

  searchQuery = (query) => {
    this.setState({ searchQuery: query });
  };

  chooseImage = (image) => {
    this.setState({ chooseImage: image });
  };

  fetchSearchQuery = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    try {
      const { hits } = await apiGetImages(searchQuery, page);

      if (hits.length === 0) {
        toast.error("Nothing was found for your query");
        return;
      }
      this.setState(({ images }) => ({ images: [...images, ...hits] }));
    } catch {
      toast.error("An error has occurred, please try again");
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  toggleShowModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, loading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.searchQuery} />
        <ScrollToTop smooth />
        <ImageGallery
          images={this.state.images}
          onClick={this.chooseImage}
          loadMore={this.loadMore}
        />
        {loading && <Loader />}
        {showModal && (
          <Modal
            chooseImage={this.state.chooseImage}
            onClose={this.toggleShowModal}
          />
        )}
        <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              fontSize: "20px",
              color: "#713200",
            },
          }}
        />
      </div>
    );
  }
}

export default App;
