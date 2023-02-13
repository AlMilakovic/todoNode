import { user as userModel } from "../../database/models/users";
import { User } from "../user.repository/types";

export async function saveUser(user: User) {
  return await new userModel(user)
    .save()
    .then((data) => {
      return { user: data, error: null };
    })
    .catch((err) => {
      return { user: null, error: err };
    });
}
