import { BadRequestException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { writeFile } from 'fs';
import { MagikaResponseDto, MagikaResultDto } from 'src/dto/magika.dto';
import * as tmp from 'tmp';
import { UploadLongResponseDto, UploadShortResponseDto } from './dto/upload.dto';

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
                    resolve(new UploadShortResponseDto(response));
                } else if (method === 'long') {
                    resolve(new UploadLongResponseDto(response));
                }
            });
        });

    }
}
