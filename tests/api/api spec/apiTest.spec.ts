import { test, expect, request, APIRequestContext } from '@playwright/test';
import { BooksApiClient } from '../../../src/api/BooksApiClient';
import { generateRandomEmail, generateRandomCustomerName } from '../../../src/utilities/randomDataGenerator';


test.describe.serial('Simple Books API - Orders', () => {
  let requestContext: APIRequestContext;
  let apiClient: BooksApiClient;
  let accessToken: string;
  let createdOrderId: string;
  let bookId: number;
  let customerName: string;

  test.beforeAll(async () => {
    requestContext = await request.newContext();
    apiClient = new BooksApiClient(requestContext);

    // Pick a real, currently available book instead of hardcoding an id,
    // so the suite doesn't break if the catalog / stock changes.
    const books = await apiClient.getAvailableBooks();
    expect(books.length).toBeGreaterThan(0);
    bookId = books[0].id;
    customerName = generateRandomCustomerName();
  });

  test.afterAll(async () => {
    await requestContext.dispose();
  });

  test('TC_API_001 - [POST] Create New Book Order', async () => {
    // Step 1: generate a Bearer token using a dynamic, unique email
    const dynamicEmail = generateRandomEmail();
    const { accessToken: token } = await apiClient.createApiClient(dynamicEmail);
    expect(token).toBeTruthy();
    accessToken = token;

    // Step 2: create the order using the token, a valid bookId and customerName
    const response = await apiClient.createOrder(accessToken, bookId, customerName);

    // Step 3: assert 201 Created
    expect(response.status()).toBe(201);

    // Step 4: extract and assert a valid orderId is returned
    const body = await response.json();
    expect(body.orderId).toBeTruthy();
    createdOrderId = body.orderId;
  });

  test('TC_API_002 - [GET] Fetch Created Order', async () => {
    test.skip(!createdOrderId, 'Order was not created in TC_API_001 - skipping dependent test.');

    // Step 1: fetch the order created above
    const response = await apiClient.getOrderById(accessToken, createdOrderId);

    // Step 2: assert 200 OK
    expect(response.status()).toBe(200);

    // Step 3: verify the payload reflects the bookId and customerName submitted
    const body = await response.json();
    expect(body.bookId).toBe(bookId);
    expect(body.customerName).toBe(customerName);
  });
});