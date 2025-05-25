const API_BASE_URL = "http://backend-service";

export interface SendMessageRequest {
  message: string;
  user: string;
}

export interface SendMessageResponse {
  ok: boolean;
  ts: string;
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Send a message to the backend ping endpoint
 */
export const sendMessageToBackend = async (
  message: string,
  userId: string
): Promise<SendMessageResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message.trim(),
        user: userId,
      }),
    });

    if (!response.ok) {
      await response.json().catch(() => ({}));
      throw new ApiError(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: SendMessageResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError(
      `Network error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Test backend connectivity
 */
export const testBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ping`, {
      method: "GET",
    });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Generate a mock user ID (24-character hex string to simulate MongoDB ObjectId)
 */
export const generateMockUserId = (): string => {
  return Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
};
