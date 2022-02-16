import { UserPayloadInterface } from "@/services/AuthService";

declare global {
  namespace Express {
    interface Request {
      userPayload?: UserPayloadInterface;
    }
  }
}
