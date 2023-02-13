import { User } from "../../repository/user.repository/types";

import { err, ok, Result } from "neverthrow";

import { saveUser } from "../../repository/user.repository/userRepository";

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<Result<User, string>> {
  const user: User = {
    firstName,
    lastName,
    email,
    password,
  };
  const resultSave = await saveUser(user);
  if (resultSave.error) {
    return err(resultSave.error);
  }

  return ok(resultSave.user as User);
}
