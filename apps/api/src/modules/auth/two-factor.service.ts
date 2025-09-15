import { Injectable, BadRequestException } from "@nestjs/common";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";
import { randomBytes, createHash } from "crypto";
import { PrismaService } from "../../common/prisma/prisma.service";

@Injectable()
export class TwoFactorService {
  constructor(private readonly prisma: PrismaService) {}

  async beginEnrollment(userId: string, email: string) {
    const secret = authenticator.generateSecret();
    await this.prisma.user.update({ where: { id: userId }, data: { twoFactorSecret: secret } });
    const otpauth = authenticator.keyuri(email, "Nexora", secret);
    const qrDataUrl = await toDataURL(otpauth);
    return { secret, qrDataUrl };
  }

  async confirmEnrollment(userId: string, code: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (!user.twoFactorSecret) throw new BadRequestException("Enrollment not started");
    if (!authenticator.verify({ token: code, secret: user.twoFactorSecret })) {
      throw new BadRequestException("Invalid TOTP code");
    }
    const codes = Array.from({ length: 8 }, () => randomBytes(5).toString("hex"));
    const hashes = codes.map((c) => createHash("sha256").update(c).digest("hex"));
    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true, recoveryCodes: hashes },
    });
    return { recoveryCodes: codes };
  }

  verify(secret: string, code: string) {
    return authenticator.verify({ token: code, secret });
  }

  async consumeRecoveryCode(userId: string, code: string): Promise<boolean> {
    const hash = createHash("sha256").update(code).digest("hex");
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (!user.recoveryCodes.includes(hash)) return false;
    await this.prisma.user.update({
      where: { id: userId },
      data: { recoveryCodes: user.recoveryCodes.filter((h) => h !== hash) },
    });
    return true;
  }

  async disable(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: false, twoFactorSecret: null, recoveryCodes: [] },
    });
  }
}
