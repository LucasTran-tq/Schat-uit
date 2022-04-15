import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TaskParticipantDto {
    @ApiProperty()
    @IsString()
    user_id: string;

    @ApiProperty()
    @IsString()
    role: string;
}
export class ItemDto {
    @ApiProperty()
    @IsString()
    item_name: string;

    @ApiProperty()
    @IsString()
    files: string[];

    @ApiProperty({type: [TaskParticipantDto]})
    @IsArray()
    task_participants?: TaskParticipantDto[]; 
}
export class CheckListDto{
    @ApiProperty()
    @IsString()
    check_list_name: string;

    @ApiProperty({type: [ItemDto]})
    @IsArray()
    items: ItemDto[];

    @ApiProperty()
    @IsBoolean()
    check_important_task: boolean;
}

export class TaskDto{
    @IsEmpty()
    _id?: any;

    @ApiProperty()
    @IsString()
    task_category_id: string;

    @ApiProperty()
    @IsString()
    task_name:string;

    @ApiProperty({type: [CheckListDto]})
    @IsArray()
    check_lists: CheckListDto[];

    @ApiProperty()
    @IsArray()
    observers_id: string[];

    @ApiProperty()
    @IsArray()
    participants_id: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    owner_id: string;

    @ApiProperty()
    @IsString()
    status: string;


    @ApiProperty({ required: false})
    @IsString()
    description?:string;

    @ApiProperty()
    @IsArray()
    files:string[];

    @ApiProperty()
    @IsNumber()
    progress: number;

    @ApiProperty()
    @IsString()
    deadline:Date;
}