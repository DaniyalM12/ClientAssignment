import { fetchStocks } from "../../services";

import stocks from './data/stocks.json'

describe("Get-SKU-S-from-stocks", () => {
  test("200-stocks-from-file", async () => {
    const expectedResult = {
      sku: expect.any(String),
      stock: expect.any(Number),
    };
    const data = await fetchStocks("PGL751486/42/83",stocks);
    expect(data).toMatchObject(expectedResult);
  });

  test("200-stocks-for-sku-doesn't exist", async () => {
    const expectedResult = {
      sku: expect.any(String),
      stock: expect.any(Number),
    };
    const data = await fetchStocks("PGL751486/42/83123",stocks);
    expect(data).toMatchObject(expectedResult);
  });
});
