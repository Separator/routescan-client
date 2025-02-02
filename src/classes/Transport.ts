import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Transport {
  getApiKey(): string;
  getUrl(): string;
  get<T>(options: any): Promise<AxiosResponse<T>>;
  post<T>(options: any): Promise<AxiosResponse<T>>;
}

export class AxiosTransport implements Transport {
  constructor(
    protected readonly url: string,
    protected readonly apiKey: string,
    protected readonly options: AxiosRequestConfig = {}
  ) {}

  public async get<T>(options: any): Promise<AxiosResponse<T>> {
    const { apiKey } = this;

    const response = await axios.get<T>(this.url, {
      ...this.options,
      headers: {
        'User-Agent': ''
      },
      params: {
        apikey: apiKey,
        ...options
      }
    });

    return response;
  }

  public async post<T>(options: any): Promise<AxiosResponse<T>> {
    const { apiKey } = this;

    const response = await axios.post<T>(
      this.url,
      {
        apikey: apiKey,
        ...options
      },
      {
        ...this.options,
        headers: {
          'User-Agent': ''
        }
      }
    );

    return response;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public getUrl(): string {
    return this.url;
  }
}
