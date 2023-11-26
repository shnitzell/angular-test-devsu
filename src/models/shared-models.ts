export type APIRequest = {
  method: string;
  headers?: { [header: string]: string | string[] };
  shouldLoad?: boolean;
  loadParameters?: any;
  shouldShowError?: boolean;
  cached?: boolean;
  body?: any;
  params?: any;
};

export type Response = {
  type?: number;
  success: boolean;
  data?: any;
  message: string;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
  logoIsImage?: boolean;
};
