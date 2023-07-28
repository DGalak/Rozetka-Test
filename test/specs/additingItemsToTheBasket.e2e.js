/**
 * test with page objects
 */
import ProductPage from "../pageobjects/product.page.js";
import CartPage from "../pageobjects/cart.page.js";

describe("Verify that products are correctly added to the basket", () => {
  it("should add products to the basket and correctly calculate price", async () => {
    await ProductPage.open();
    expect(await ProductPage.getMessage()).toEqual(
      "Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні"
    );
    // add random item to the cart
    await ProductPage.suggestedProductsList[0].click();
    await ProductPage.buyButton.click();
    await CartPage.continueShoppingButton.click();
    // return back to the main page
    await ProductPage.headerLogo.click();
    // add another random item to the cart
    await ProductPage.suggestedProductsList[1].click();
    await ProductPage.buyButton.click();
    // verify that added items are correct
    expect(
      (await CartPage.getProductsInCartPrices()).reduce((a, b) => a + b, 0)
    ).toEqual(await CartPage.getSumPrice());
    // delete one item
    await CartPage.deleteItemInCart(0);
    expect(+(await CartPage.getProductsInCartPrices())[0]).toEqual(
      await CartPage.getSumPrice()
    );
  });
});
