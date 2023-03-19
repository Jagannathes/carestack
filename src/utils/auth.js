import admin from "./admin";
import userSchema from "@/models/user";
// sample axios call in frontend:
// const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/<path>`, ,{
//   headers: {
//     "x-auth-token": authToken,
//   }
// });

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.headers["x-auth-token"];
      if (!token) {
        return res.status(401).end("No access token, access denied");
      }

       let user = await admin.auth().verifyIdToken(token);
      
      if (!user) {
        return res.status(401).end("Invalid token, access denied");
      }
      req.user = user;
      return handler(req, res);
    } catch (err) {
      return res.status(500).end(err.message);
    }
  };
}

export function withUser(handler) {
  return async (req, res) => {
    try {
      const token = req.headers["x-auth-token"];
      if (!token) {
        return handler(req, res);
      }
        console.log('hmm')
       const user = await admin.auth().verifyIdToken(token);
      
      if (!user) {
        return res.status(401).end("Invalid token, access denied");
      }
      req.user = user;
      return handler(req, res);
    } catch (err) {
      return res.status(500).end(err.message);
    }
  };
}
