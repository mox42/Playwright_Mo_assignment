import { APIRequestContext } from '@playwright/test';

/**
 * BooksApiClient
 * --------------
 * Thin wrapper around Playwright's native `APIRequestContext` for the
 * Simple Books API (https://simple-books-api.click). Centralizes endpoint
 * paths and payload shapes so tests read like business steps, not raw HTTP.
 */
export class BooksApiClient {
  private readonly request: APIRequestContext;
  readonly baseUrl = 'https://simple-books-api.click';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /** POST /api-clients/ - registers a client and returns a Bearer accessToken. */
  async createApiClient(email: string): Promise<{ accessToken: string }> {
    const response = await this.request.post(`${this.baseUrl}/api-clients/`, {
      data: {
        clientName: 'PlaywrightQAClient',
        clientEmail: email,
      },

    });
    const body = await response.json();
    console.log("======= Created API Client =======");
    console.log(body);
    console.log("==================================");
    return { accessToken: body.accessToken };
  }

  /** GET /status-codes/200 -> used to fetch a list of available, in-stock books. */
  async getAvailableBooks(): Promise<{ id: number; name: string }[]> {
    const response = await this.request.get(`${this.baseUrl}/books?type=fiction`);
    return response.json();
  }

  /** POST /orders - creates a new book order using the Bearer token. */
  async createOrder(accessToken: string, bookId: number, customerName: string) {
    return this.request.post(`${this.baseUrl}/orders`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        bookId,
        customerName,
      },
    });
  }

  /** GET /orders/:orderId - fetches a previously created order. */
  async getOrderById(accessToken: string, orderId: string) {
    return this.request.get(`${this.baseUrl}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}
