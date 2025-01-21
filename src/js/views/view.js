import icons from "../../img/icons.svg";
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.handlerError();
      return;
    }
    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0)) {
    //   this.handlerError();
    //   return;
    // }
    this._data = data;
    const newHtml = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newHtml);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];

      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() !== ""
      ) {
        currentElement.textContent = newElement.textContent;
      }

      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach((attribute) => {
          currentElement.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }

  renderSpinner() {
    const html = `
          <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  handlerError(message = this._errorMesaage) {
    const html = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  handlerMessage(message = this._successMesaage) {
    const html = `<div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}
