import { AdminEntity } from "./Model/AdminEntity";

interface AccountCreationResponse {
  success: boolean;
  account?: AdminEntity;
  error?: string;
}

export default AccountCreationResponse;
