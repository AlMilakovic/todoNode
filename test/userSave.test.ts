import { assert, expect } from "chai";
import { saveUser } from "../src/repository/user.repository/userRepository";
import { v4 as uuidv4 } from "uuid";

const id = uuidv4();

const newUser = {
  firstName: "first name",
  lastName: "last name",
  email: `a@${id}`,
  password: "Test123!",
};

describe("USER", function () {
  it("DB save", function (done) {
    saveUser(newUser).then((result) => {
      assert.typeOf(result.user, "object");
      expect(result.user);

      done(result.error);
    });
  });
});
