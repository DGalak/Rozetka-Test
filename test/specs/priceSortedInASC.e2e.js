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
    await browser.debug();
    await browser.pause(2000);
    await ProductPage.selectSubCategory(0);
    await ProductPage.sortButton.click();
    await browser.pause(2000);
    await ProductPage.sortedByCheapest.click();
    await browser.pause(2000);
    expect(await ProductPage.isPriceSortedASCOrder()).toBeTrue();
  });
});
