export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const errorHandler = (error: any) => {
  console.error('Error:', error);

  if (error instanceof APIError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  }

  return {
    statusCode: 500,
    message: 'Internal Server Error',
  };
};

export const successResponse = <T>(data: T, message?: string) => {
  return {
    success: true,
    data,
    message,
  };
};

export const errorResponse = (statusCode: number, message: string) => {
  return {
    success: false,
    statusCode,
    message,
  };
};
