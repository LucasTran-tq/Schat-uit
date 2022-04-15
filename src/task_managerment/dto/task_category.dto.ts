import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class CreateTaskCategoryDto {
    @IsEmpty()
    _id: any;

    @ApiProperty()
    @IsString()
    task_category_name: string;

    @ApiProperty()
    @IsString()
    field_id: string;
}

export class UpdateTaskCategoryDto{
    
}