import { jest } from "@jest/globals";

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn(() => "mock-jwt-token"),
  },
}));

const { default: generateToken } = await import("../createToken.js");
const jwt = (await import("jsonwebtoken")).default;

describe("generateToken", () => {
  let res;

  beforeEach(() => {
    res = {
      cookie: jest.fn(),
    };
    process.env.JWT_SECRET = "test-secret";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate a JWT token with correct payload", () => {
    generateToken(res, "user123");

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: "user123" },
      "test-secret",
      { expiresIn: "30d" }
    );
  });

  it("should return the generated token", () => {
    const token = generateToken(res, "user123");
    expect(token).toBe("mock-jwt-token");
  });

  it("should set httpOnly cookie with correct options", () => {
    generateToken(res, "user123");

    expect(res.cookie).toHaveBeenCalledWith(
      "jwt",
      "mock-jwt-token",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
    );
  });

  it("should set secure to true when NODE_ENV is not development", () => {
    process.env.NODE_ENV = "production";
    generateToken(res, "user123");

    expect(res.cookie).toHaveBeenCalledWith(
      "jwt",
      "mock-jwt-token",
      expect.objectContaining({ secure: true })
    );
  });

  it("should set secure to false when NODE_ENV is development", () => {
    process.env.NODE_ENV = "development";
    generateToken(res, "user123");

    expect(res.cookie).toHaveBeenCalledWith(
      "jwt",
      "mock-jwt-token",
      expect.objectContaining({ secure: false })
    );
  });
});
