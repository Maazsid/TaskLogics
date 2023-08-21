import { VerificationTypeEnum } from 'enums/verification-type.enum';

export interface VerifyOtpReq {
  otp: string;
  verificationType: VerificationTypeEnum;
}
