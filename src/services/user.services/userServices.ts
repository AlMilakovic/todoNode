import { User } from "../../repository/todo.repository/types";

import { err, ok, Result } from "neverthrow";

import { saveUser } from "../../repository/user.repository/userRepository";

export async function createUser(
  fullName: string,
  email: string,
  password: string
): Promise<Result<User, string>> {
  const user: User = {
    fullName,
    email,
    password,
  };
  const resultSave = await saveUser(user);
  if (resultSave.error) {
    return err(resultSave.error);
  }

  return ok(resultSave.user as User);
}
