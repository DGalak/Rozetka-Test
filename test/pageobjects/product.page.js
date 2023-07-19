import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage extends Page {
  /**
   * define selectors using getter methods
   */

  // start page elements
  get marketspaceTitle() {
    return $("title");
  }
  get headerLogo() {
    return $(".header__logo");
  }
  get suggestedProductsList() {
    return $$(".tile__title");
  }

  //search elements
  get searchInput() {
    return $("[name='search']");
  }
  get findBySearchButton() {
    return $(".search-form__submit");
  }
  get searchedProductsList() {
    return $$(".goods-tile__title");
  }
  // categories elements
  get categoriesList() {
    return $$(".sidebar .menu-categories__link");
  }
  get subcategoriesList() {
    return $$(".tile-cats__heading");
  }
  get filtersList() {
    return $$(".checkbox-filter__link");
  }
  get priceInputList() {
    return $$(".slider-filter__inner input");
  }
  get confirmPriceButton() {
    return $('[type="submit"]');
  }
  get priceList() {
    return $$(".goods-tile__price-value");
  }

  // product details elements
  get buyButton() {
    return $(".buy-button__label");
  }

  async getMessage() {
    return this.marketspaceTitle.getHTML(false);
  }

  async open() {
    await super.open();
    await browser.pause(1000);
  }
  async selectCategory(index) {
    const categories = await this.categoriesList;
    await categories[index].click();
  }
  async selectSubCategory(index) {
    const subCategories = await this.subcategoriesList;
    await subCategories[index].scrollIntoView();
    await subCategories[index].click();
  }
  async fillInPriceInputs(startPrice, endPrice) {
    await (await this.priceInputList)[0].clearValue();
    await (await this.priceInputList)[0].setValue(startPrice);
    await (await this.priceInputList)[1].clearValue();
    await (await this.priceInputList)[1].setValue(endPrice);
    await browser.pause(2000);
    await this.confirmPriceButton.click();
  }
  async isPriceWithinFilters(startPrice, endPrice) {
    const elements = await this.priceList;
    const texts = await Promise.all(
      elements.map(async (element) => {
        return await element.getText();
      })
    );
    const prices = texts.map((el) => +el.replace(/\D/g, ""));
    return prices.every((el) => +el >= startPrice && +el <= endPrice);
  }

  async searchForItem(query) {
    await this.searchInput.setValue(query);
    await this.findBySearchButton.click();
    await browser.pause(6000);
  }
  async isProductsSearchedByQuery(query) {
    const elements = await this.searchedProductsList;
    const texts = await Promise.all(
      elements.map(async (element) => {
        return await element.getText();
      })
    );
    return texts
      .map((el) => el.toLowerCase())
      .every((el) => el.includes(query));
  }
}

export default new ProductPage();
