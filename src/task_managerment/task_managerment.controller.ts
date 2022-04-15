import { Controller, Get } from '@nestjs/common';

@Controller('/task-managerment')
export class TaskManagermentController {
    constructor(){}

    @Get()
    public async helloTask(): Promise<string>{
        return 'Hello controller';
    }
}