import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "dit205_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(user) {
  return new SignJWT({ email: user.email, fullname: user.fullname })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub || typeof payload.email !== "string" || typeof payload.fullname !== "string") {
      return null;
    }
    return { id: payload.sub, email: payload.email, fullname: payload.fullname };
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("JWT_SECRET")) throw error;
    return null;
  }
}
