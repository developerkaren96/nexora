import { Body, Controller, Get, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";
import { PrismaService } from "../../common/prisma/prisma.service";
import { CurrentUser, JwtUser } from "../../common/auth/current-user.decorator";

class UpdateMeDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsUrl() avatarUrl?: string;
  @IsOptional() @IsString() locale?: string;
  @IsOptional() @IsString() timezone?: string;
}

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("me")
  async getMe(@CurrentUser() u: JwtUser) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: u.sub },
      select: {
        id: true, email: true, name: true, avatarUrl: true, locale: true, timezone: true,
        systemRole: true, twoFactorEnabled: true, createdAt: true,
        memberships: { include: { tenant: { select: { id: true, slug: true, name: true } } } },
      },
    });
    return user;
  }

  @Patch("me")
  async updateMe(@CurrentUser() u: JwtUser, @Body() dto: UpdateMeDto) {
    return this.prisma.user.update({ where: { id: u.sub }, data: dto, select: { id: true } });
  }
}
