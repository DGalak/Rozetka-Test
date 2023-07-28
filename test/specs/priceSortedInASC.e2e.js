/**
 * test with page objects
 */
import ProductPage from "../pageobjects/product.page.js";

describe("Verify that user can see products sorted from the cheapest to the most expensive", () => {
  it("should show prices sorted in ASC order", async () => {
    await ProductPage.open();
    expect(await ProductPage.getMessage()).toEqual(
      "Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні"
    );
    // select first category and subcategory
    await ProductPage.selectCategory(0);
    await ProductPage.selectSubCategory(0);
    await ProductPage.sortButton.click();
    await ProductPage.sortedByCheapest.click();
    expect(await ProductPage.isPriceSortedASCOrder()).toBeTrue();
  });
});
