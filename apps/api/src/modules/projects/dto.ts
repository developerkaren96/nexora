import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsHexColor, IsOptional, IsString, IsUUID, IsUrl, Matches, MaxLength, MinLength } from "class-validator";
import { BusinessType } from "@nexora/database";

export class CreateProjectDto {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(80) name!: string;
  @ApiProperty({ enum: BusinessType }) @IsEnum(BusinessType) businessType!: BusinessType;
  @ApiProperty({ example: "acme-cafe" })
  @IsString() @Matches(/^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])?$/)
  slug!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsHexColor() brandColor?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsUrl() logoUrl?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsUUID() templateId?: string;
}

export class UpdateProjectDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsHexColor() brandColor?: string;
  @IsOptional() @IsUrl() logoUrl?: string;
}
