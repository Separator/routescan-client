import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Transport {
  apiKey: string;

  get<T>(options: any): Promise<AxiosResponse<T>>;
}

export class AxiosTransport implements Transport {
  constructor(private readonly url: string, public readonly apiKey: string, private readonly options: AxiosRequestConfig = {}) {}

  async get<T>(options: any): Promise<AxiosResponse<T>> {
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
}
