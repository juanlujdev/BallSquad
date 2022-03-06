export interface IApiResponse {
  id?: number;
  code?: number | null;
  type?: string | null;
  message?: string | null;
}

export class ApiResponse implements IApiResponse {
  constructor(public id?: number, public code?: number | null, public type?: string | null, public message?: string | null) {}
}

export function getApiResponseIdentifier(apiResponse: IApiResponse): number | undefined {
  return apiResponse.id;
}
