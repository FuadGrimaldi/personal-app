// src/utils/jwtHelper.ts
interface JWTPayload {
  id?: number;
  email?: string;
  username?: string;
  role?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export function decodeJWT(token: string): JWTPayload {
  try {
    // Split token menjadi header, payload, signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    // Decode payload (bagian kedua)
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString()
    ) as JWTPayload;

    // Validasi apakah token expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new Error("Token has expired");
    }

    return payload;
  } catch (error) {
    throw new Error(
      `Failed to decode JWT: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export function getUserIdFromToken(token: string): number {
  const payload = decodeJWT(token);

  if (!payload.id) {
    throw new Error("User ID not found in token payload");
  }

  return payload.id;
}

export function getUserInfoFromToken(token: string): {
  id: number;
  email?: string;
  username?: string;
  role?: string;
} {
  const payload = decodeJWT(token);

  if (!payload.id) {
    throw new Error("User ID not found in token payload");
  }

  return {
    id: payload.id,
    email: payload.email,
    username: payload.username,
    role: payload.role,
  };
}
