import { jest } from "@jest/globals";

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: jest.fn(),
  },
}));

jest.unstable_mockModule("../../models/userModel.js", () => ({
  default: {
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule("../asyncHandler.js", () => ({
  default: (fn) => fn,
}));

const jwt = (await import("jsonwebtoken")).default;
const User = (await import("../../models/userModel.js")).default;
const { authenticate, authorizeAdmin } = await import("../authMiddleware.js");

describe("authenticate", () => {
  let req, res, next;

  beforeEach(() => {
    req = { cookies: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    process.env.JWT_SECRET = "test-secret";
    jest.clearAllMocks();
  });

  it("should return 401 if no token is provided", async () => {
    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token verification fails", async () => {
    req.cookies.jwt = "invalid-token";
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should attach user to req and call next for valid token", async () => {
    req.cookies.jwt = "valid-token";
    jwt.verify.mockReturnValue({ userId: "user123" });
    const mockUser = { _id: "user123", username: "testuser", isAdmin: false };
    User.findById.mockReturnValue({ select: jest.fn().mockReturnValue(mockUser) });

    await authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(mockUser);
  });
});

describe("authorizeAdmin", () => {
  let req, res, next;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should call next if user is admin", () => {
    req = { user: { isAdmin: true } };

    authorizeAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if user is not admin", () => {
    req = { user: { isAdmin: false } };

    authorizeAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Not authorized as an admin.");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if user is not set", () => {
    req = {};

    authorizeAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
