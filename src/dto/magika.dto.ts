import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MagikaResultDto {
    @IsString()
    @IsNotEmpty()
    ct_label: string;

    @IsNumber()
    @IsNotEmpty()
    score: number;

    @IsString()
    @IsNotEmpty()
    group: string;

    @IsString()
    @IsNotEmpty()
    mime_type: string;

    @IsString()
    @IsNotEmpty()
    magic: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class MagikaResponseDto {
    @IsString()
    @IsNotEmpty()
    path: string;

    @IsNotEmpty()
    dl: MagikaResultDto;

    @IsNotEmpty()
    output: MagikaResultDto;
}