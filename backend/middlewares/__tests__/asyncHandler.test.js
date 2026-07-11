import asyncHandler from "../asyncHandler.js";

describe("asyncHandler", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should call the wrapped function with req, res, next", async () => {
    const handler = jest.fn();
    const wrapped = asyncHandler(handler);

    await wrapped(req, res, next);

    expect(handler).toHaveBeenCalledWith(req, res, next);
  });

  it("should call next if the handler succeeds", async () => {
    const handler = async () => {};
    const wrapped = asyncHandler(handler);

    await wrapped(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 500 with error message if handler throws", async () => {
    const handler = async () => {
      throw new Error("Something went wrong");
    };
    const wrapped = asyncHandler(handler);

    await wrapped(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });
  });

  it("should handle rejected promises", async () => {
    const handler = async () => {
      throw new Error("Async failure");
    };
    const wrapped = asyncHandler(handler);

    await wrapped(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Async failure" });
  });
});
