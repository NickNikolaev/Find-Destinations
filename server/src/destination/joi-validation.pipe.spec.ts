import { JoiValidationPipe } from "./joi-validation.pipe";

describe("ValidateJoiSchemaPipe", () => {
  it("should be defined", () => {
    expect(new JoiValidationPipe()).toBeDefined();
  });
});
