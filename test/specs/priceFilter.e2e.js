/**
 * test with page objects
 */
import ProductPage from "../pageobjects/product.page.js";

describe("Verify if the price filter working correctly for the following marketplaces", () => {
  it("should show products within price filters", async () => {
    await ProductPage.open();
    expect(await ProductPage.getMessage()).toEqual(
      "Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні"
    );
    // select first category and subcategory
    await ProductPage.selectCategory(0);
    await browser.pause(2000);
    await ProductPage.selectSubCategory(0);

    await ProductPage.fillInPriceInputs("20000", "30000");
    await browser.pause(5000);
    expect(await ProductPage.isPriceWithinFilters("20000", "30000")).toBeTrue();
  });
});
