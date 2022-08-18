import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { injectable } from "inversify";

type RequestCongig = Omit<AxiosRequestConfig, "method" | "baseURL">;
type RestResponse<T = any> = AxiosResponse<T>;

@injectable()
class RestClient {
  private _baseUrl: string | null = null;
  private _params: Record<string, unknown> | URLSearchParams | null = null;

  private getParams(config: RequestCongig) {
    return {
      params: new URLSearchParams({ ...config.params, ...this.params }),
    };
  }

  private getBaseUrlConfig() {
    return this.baseUrl ? { baseURL: this.baseUrl } : {};
  }

  get baseUrl(): string {
    if (!this._baseUrl) return "";

    return this._baseUrl;
  }

  set baseUrl(url: string) {
    this._baseUrl = url;
  }

  get params() {
    if (!this._params) return {};

    return this._params;
  }

  set params(queryParams: Record<string, unknown> | URLSearchParams) {
    this._params = queryParams;
  }

  async get<T = any>(config: RequestCongig): Promise<RestResponse<T>> {
    const baseUrlConfig = this.getBaseUrlConfig();
    const paramsConfig = this.getParams(config);

    return axios({
      method: "GET",
      ...config,
      ...paramsConfig,
      ...baseUrlConfig,
    });
  }

  async post<T = any>(config: RequestCongig): Promise<RestResponse<T>> {
    const baseUrlConfig = this.getBaseUrlConfig();
    const paramsConfig = this.getParams(config);

    return axios({
      method: "POST",
      ...config,
      ...paramsConfig,
      ...baseUrlConfig,
    });
  }
}

export default RestClient;
