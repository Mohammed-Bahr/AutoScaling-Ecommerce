import { jest } from "@jest/globals";

jest.unstable_mockModule("mongoose", () => ({
  default: {
    isValidObjectId: jest.fn(),
  },
}));

const { default: checkId } = await import("../checkId.js");
const mongoose = (await import("mongoose")).default;

describe("checkId", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should call next() for a valid ObjectId", () => {
    req.params.id = "507f1f77bcf86cd799439011";
    mongoose.isValidObjectId.mockReturnValue(true);

    checkId(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 404 for an invalid ObjectId", () => {
    req.params.id = "invalid-id";
    mongoose.isValidObjectId.mockReturnValue(false);

    expect(() => checkId(req, res, next)).toThrow("Invalid Object of: invalid-id");
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
