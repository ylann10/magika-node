import { Body, Controller, HttpCode, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadLongResponseDto, UploadBodyDto, UploadShortResponseDto } from './dto/upload.dto';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    @HttpCode(200)
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: UploadBodyDto) {
        const responses: UploadLongResponseDto | UploadShortResponseDto[] = [];
        for (const file of files) {
            await this.uploadService.uploadFile(file, body.method).then((res) => {
                responses.push(res);
            }, (err) => {
                console.error(err);
            });
        }
        return responses;
    }
}
