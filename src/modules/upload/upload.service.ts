import { BadRequestException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { writeFile } from 'fs';
import { MagikaResponseDto, MagikaResultDto } from 'src/dto/upload/magika.dto';
import { UploadShortResponseDto } from 'src/dto/upload/upload.dto';
import * as tmp from 'tmp';

@Injectable()
export class UploadService {
    constructor() {}

        async uploadFile(file: Express.Multer.File, method: string): Promise<MagikaResultDto | UploadShortResponseDto> {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        
        const tmpFile: any = tmp.fileSync();
        writeFile(tmpFile.name, file.buffer, (err) => {
            if (err) {
                throw new BadRequestException('Error writing file');
            }
        });

        return new Promise((resolve, reject) => {
            exec(`magika ${tmpFile.name} --json`, (error, stdout, stderr) => {
                tmpFile.removeCallback();  
                if (error) {
                    console.error(error);
                    return reject(new BadRequestException('Error processing file'));
                }
                if (stderr) {
                    console.error(stderr);
                    return reject(new BadRequestException('Error processing file'));
                }
                const response: MagikaResponseDto = JSON.parse(stdout)[0];
                if (method === 'short') {
                    const short: UploadShortResponseDto = new UploadShortResponseDto();
                    short.group = response.output.group;
                    short.mime_type = response.output.mime_type;
                    short.score = response.output.score;
                    resolve(short);
                } else if (method === 'long') {
                    resolve(response.output);
                }
            });
        });

    }
}
