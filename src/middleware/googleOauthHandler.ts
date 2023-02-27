import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
} from "../services/user.services/userServices";
import express from "express";

//get the code from qs
// get the id and access token with the code
// get user with tokens
// upsert the user
//create a session
// redirect back to client
export async function googleOauthHandler(
  req: express.Request,
  res: express.Response
) {
  try {
    const code = req.query.code as string;
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    const googleUser = await getGoogleUser({ id_token, access_token });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }
    console.log("googleUser", googleUser);
    await findAndUpdateUser(
      { email: googleUser.email },
      {
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
      },
      {
        upsert: true,
        new: true,
      }
    );
    const session = req.session ?? { userId: null };
    session.userId = googleUser.email as string;
    res.redirect(`${process.env.FRONTEND_HOST}`);
  } catch (error) {
    return res.redirect(`${process.env.FRONTEND_HOST}/oauth/error` as string);
  }
}
