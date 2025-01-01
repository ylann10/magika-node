import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MagikaResponseDto } from "src/dto/magika.dto";

enum MethodEnum {
    SHORT = 'short',
    LONG = 'long'
}

export class UploadBodyDto {
    @IsNotEmpty()
    @IsEnum(MethodEnum)
    method: MethodEnum;
}

export class UploadShortResponseDto {

    constructor(response: MagikaResponseDto, filename: string) {
        this.filename = filename;
        this.mime_type = response.output.mime_type;
        this.ct_label = response.output.ct_label;
    }

    @IsNotEmpty()
    @IsString()
    filename: string;

    @IsNotEmpty()
    @IsString()
    mime_type: string;

    @IsNotEmpty()
    @IsString()
    ct_label: string;

}

export class UploadLongResponseDto {

    constructor(response: MagikaResponseDto, filename: string) {
        this.filename = filename;
        this.ct_label = response.output.ct_label;
        this.score = response.output.score;
        this.group = response.output.group;
        this.mime_type = response.output.mime_type;
        this.magic = response.output.magic;
        this.description = response.output.description;
    }

    @IsNotEmpty()
    @IsString()
    filename: string;

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