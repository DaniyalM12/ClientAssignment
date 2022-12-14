import { fetchSKUs } from "../../services";

describe("Get all SKU-S", () => {
  //Positive Case
  test("200-SKU", async () => {
    const expectedResponse = {
      sku: expect.any(String),
      qty: expect.any(Number),
    };

    const sku_s = await fetchSKUs("PGL751486/42/83");
    expect(sku_s).toMatchObject(expectedResponse);
  });

  //Negative Case
  test("No-Sku-Exist", async () => {
    const expectedError = "SKU does not exist .";
    try {
      await fetchSKUs("PGL751486/42/831");
    } catch (e: any) {
      expect(e).toBe(expectedError);
    }
  });
});
