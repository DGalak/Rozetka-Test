/**
 * test with page objects
 */
import ProductPage from "../pageobjects/product.page.js";

describe("Verify that search is working as expected", () => {
  it("should show correct list of items according to the search query", async () => {
    await ProductPage.open();
    expect(await ProductPage.getMessage()).toEqual(
      "Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні"
    );
    // search for random item by name
    await ProductPage.searchForItem("geforce");
    expect(await ProductPage.isProductsSearchedByQuery("geforce")).toBeTrue();
  });
});
