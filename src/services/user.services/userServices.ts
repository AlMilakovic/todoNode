import { User } from "../../repository/user.repository/types";

import { err, ok, Result } from "neverthrow";

import { saveUser } from "../../repository/user.repository/userRepository";
import axios from "axios";
import qs from "qs";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import { user } from "../../database/models/users";

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

export async function getGoogleOAuthTokens({ code }: { code: string }) {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer  ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
}

export async function findAndUpdateUser(
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions = {}
) {
  return user.findOneAndUpdate(query, update, options);
}
