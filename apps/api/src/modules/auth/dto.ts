import { IsEmail, IsOptional, IsString, MinLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty() @IsEmail() email!: string;
  @ApiProperty() @IsString() @MinLength(10) password!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() name?: string;
  @ApiProperty({ required: false, description: "Tenant slug to create alongside the user" })
  @IsOptional() @IsString() @Matches(/^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])?$/)
  tenantSlug?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() tenantName?: string;
}

export class LoginDto {
  @ApiProperty() @IsEmail() email!: string;
  @ApiProperty() @IsString() password!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() totp?: string;
}

export class ConfirmTotpDto {
  @ApiProperty() @IsString() @MinLength(6) code!: string;
}

export class RequestResetDto {
  @ApiProperty() @IsEmail() email!: string;
}

export class ConfirmResetDto {
  @ApiProperty() @IsString() token!: string;
  @ApiProperty() @IsString() @MinLength(10) password!: string;
}
