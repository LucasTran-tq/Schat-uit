import { Controller, UseGuards, Param, Res, Get } from '@nestjs/common';
import { join } from 'path';
import { AuthenticationGuard } from 'src/auth/guards/authen-jwt.guard';
import { StreamingFileService } from './streaming-file.service';
import { Observable, of } from 'rxjs';

//@UseGuards(AuthenticationGuard)
@Controller('streaming-file')
export class StreamingFileController {

    constructor(private fileService: StreamingFileService) {}

    @Get('get-file/:fileName')
    getFileWithName(@Param('fileName') _fileName, @Res() res): Observable<Object>{
        const path: string  = process.env.PATH_FILE + _fileName;
        return of(res.sendFile(join(process.cwd(), path)));
    }
}
