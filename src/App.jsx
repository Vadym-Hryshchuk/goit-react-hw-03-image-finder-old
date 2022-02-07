import React, { Component } from "react";
import apiGetImages from "./services/PixabayApi";
import Searchbar from "./components/searchbar/Searchbar";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Modal from "./components/modal/Modal";

import { ReactComponent as Pixabay } from "./pixabay.svg";

class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    images: [],
    chooseImage: null,
    showModal: false,
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
    try {
      const { hits } = await apiGetImages(searchQuery, page);
      if (hits.length === 0) {
        console.log("Нічого не знайдено");
        return;
      }
      this.setState(({ images }) => ({ images: [...images, ...hits] }));
    } catch {
      console.log("Щось пішло не так");
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
    const { showModal } = this.state;

    return (
      <div>
        <Pixabay width="250" />
        <Searchbar onSubmit={this.searchQuery} />
        <ImageGallery
          images={this.state.images}
          onClick={this.chooseImage}
          loadMore={this.loadMore}
        />
        {showModal && (
          <Modal
            chooseImage={this.state.chooseImage}
            onClose={this.toggleShowModal}
          />
        )}
      </div>
    );
  }
}

export default App;
