import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {
  /**
   * define selectors using getter methods
   */
  get submitOrderButton() {
    return $('[data-testid="cart-receipt-submit-order"]');
  }
  get continueShoppingButton() {
    return $('[data-testid="continue-shopping-link"]');
  }
  get moreActionsButtons() {
    return $$("[id = cartProductActions0]");
  }
  get deleteButton() {
    return $("rz-trash-icon button");
  }
  get productsPriceList() {
    return $$(".cart-product__price--red");
  }
  get sumPrice() {
    return $(".cart-receipt__sum-price");
  }
  async getProductsInCartPrices() {
    const elements = await this.productsPriceList;
    const texts = await Promise.all(
      elements.map(async (element) => {
        return await element.getText();
      })
    );
    const prices = texts.map((el) => +el.replace(/\D/g, ""));
    return prices;
  }
  async getSumPrice() {
    const sumPriceElement = await this.sumPrice;
    const sumPriceNumber = (await sumPriceElement.getText()).replace(/\D/g, "");
    return +sumPriceNumber;
  }
  async deleteItemInCart(productIndex) {
    const moreActions = await this.moreActionsButtons;
    await moreActions[productIndex].click();
    await this.deleteButton.click();
  }
}

export default new CartPage();
