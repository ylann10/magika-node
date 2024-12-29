import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MagikaResultDto } from "./magika.dto";

enum MethodEnum {
    SHORT = 'short',
    LONG = 'long'
}

export class UploadOneBodyDto {
    @IsNotEmpty()
    @IsEnum(MethodEnum)
    method: MethodEnum;
}

export class UploadShortResponseDto {
    @IsNotEmpty()
    @IsString()
    mime_type: string;

    @IsNotEmpty()
    @IsString()
    group: string;

    @IsNotEmpty()
    @IsNumber()
    score: number;
}