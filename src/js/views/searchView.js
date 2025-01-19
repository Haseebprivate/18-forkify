class SearchView {
  _parentElement = document.querySelector(".search");
  _input = this._parentElement.querySelector(".search__field");

  getQuery() {
    return this._input.value;
  }

  addHandleSearch(handler) {
    this._parentElement.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();

      this._input.value = "";
    });
  }
}

export default new SearchView();
