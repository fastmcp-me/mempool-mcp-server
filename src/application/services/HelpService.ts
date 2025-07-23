export class HelpService {
  constructor(private baseUrl: string) {}

  async getBaseUrl(): Promise<string> {
    return `base URL: ${this.baseUrl}`;
  }
}
