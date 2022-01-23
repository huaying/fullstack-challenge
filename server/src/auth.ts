import { recoverPersonalSignature } from "eth-sig-util";
import jwt from "jsonwebtoken";
import jwtDecode, { JwtPayload } from "jwt-decode";

declare module "jwt-decode" {
  export interface JwtPayload {
    userId: string;
  }
}

class Auth {
  nonceStore = {};

  private verifyUser(userId, signature) {
    const nonce = this.nonceStore[userId];
    if (nonce === undefined) {
      return false;
    }

    // check with prefix `authentication code:`
    const msg = `authentication code: ${nonce}`;
    const address = recoverPersonalSignature({
      data: msg,
      sig: signature,
    });
    return address.toLowerCase() === userId.toLowerCase();
  }

  private generateAccessToken(userId) {
    // hardcode secret for demo purpose. Should not do it in the real world
    const secret = "secret";
    const accessToken = jwt.sign({ userId }, secret);

    return accessToken;
  }

  loginUser(userId, signature) {
    if (this.verifyUser(userId, signature)) {
      this.generateNonce(userId);
      return this.generateAccessToken(userId);
    }
    return null;
  }

  generateNonce(userId) {
    const nonce = Math.floor(Math.random() * 1000000).toString();
    this.nonceStore[userId] = nonce;
    return nonce;
  }

  verifyAccessToken(token) {
    try {
      const accessToken = token.split(" ")[1];
      const decoded = jwtDecode<JwtPayload>(accessToken);

      return decoded.userId;
    } catch (err) {
      return null;
    }
  }
}

const auth = new Auth();

export default auth;
