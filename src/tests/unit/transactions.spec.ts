import {
  calculateTransactions,
  fetchTransactions,
} from "../../services";
import { fetchStocks } from "../../services";
import { TransactionEntity } from "../../entities";
import transactions from './data/transactions.json'
import stocksMock from './data/stocks.json'
describe("Get all SKU-S from transactions", () => {
  test("200-transactions", async () => {
    const data = await fetchTransactions("KSS894454/75/76",transactions);
    expect(data).toBeInstanceOf(Array);
  });

  test("200-load-transactions-from-file", async () => {
    const expectedResult = {
      sku: expect.any(String),
      type: expect.any(String),
      qty: expect.any(Number),
    };
    const data = await fetchTransactions("KSS894454/75/76",transactions);
    data.forEach((transaction: TransactionEntity) => {
      expect(transaction).toMatchObject(expectedResult);
    });
  });

  test("NO-SKU-Found", async () => {
    const expectedResult = "SKU does not exist .";

    try {
      await fetchTransactions("PGL751486/42/831",transactions);
    } catch (e: any) {
      expect(e.message).toBe(expectedResult);
    }
  });
  test("transactional-calculation-error", async () => {
    const expectedResult = "SKU does not exist .";
    const data = await fetchTransactions("KSS894454/75/76",transactions);
    try {
      await calculateTransactions(data, 2);
    } catch (e: any) {
      expect(e.message).toBe(expectedResult);
    }
  });
  test("200-do-transactional-calculation", async () => {
    const data = await fetchTransactions("KSS894454/75/76",transactions);
    const stocks = await fetchStocks("KSS894454/75/76",stocksMock);
    const total = await calculateTransactions(data, stocks.stock);
    expect(total).toBeGreaterThan(0);
  });

  test("200-do-transactional-calculation-for-refunding", async () => {
    const data = await fetchTransactions("KSS894454/75/76",transactions);
    const stocks = await fetchStocks("KSS894454/75/76",stocksMock);
    const total = await calculateTransactions(data, stocks.stock, 25);
    expect(total).toBeGreaterThan(0);
  });
});
