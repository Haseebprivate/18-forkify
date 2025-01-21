import View from "./view.js";
import icons from "../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMesaage = "No recipe found for your query! Please try again 😉";
  _successMesaage = "succuess";

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map((li) => {
        const id = window.location.hash.slice(1);
        return `
      <li class="preview">
            <a class="preview__link ${
              li.id === id ? "preview__link--active" : ""
            }" href="#${li.id}">
              <figure class="preview__fig">
                <img src="${li.image}" alt="${li.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${li.title}</h4>
                <p class="preview__publisher">${li.publisher}</p>
                
              </div>
            </a>
          </li>
    `;
      })
      .join("");
  }
}

export default new ResultsView();
