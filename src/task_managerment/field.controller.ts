import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/guards/authen-jwt.guard';
import { CreateFieldDto } from './dto/create_field.dto';
import { Field } from './schemas/field.schema';
import { FieldService } from './services/field.service';

// @UseGuards(AuthenticationGuard)
@Controller('/field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post('/create')
  public async createField(
    @Body() createFieldDto: CreateFieldDto,
  ): Promise<Field> {
    return await this.fieldService.createField(createFieldDto);
  }

  @Get('/get-all-field')
  public async getAllField(): Promise<Field[]> {
    return await this.fieldService.getAllField();
  }

  // TODO: BUG -> RESPONSE LIKE GET ALL
  @Get('/get-field-by-name/:fieldName')
  public async getField(
    @Param('fieldName') fieldName: string,
  ): Promise<Field[]> {
    return await this.fieldService.getField(fieldName);
  }

  @Get('/get-field-by-id/:fieldId')
  public async getFieldById(@Param('fieldId') fieldId: string): Promise<Field> {
    return await this.fieldService.getFieldById(fieldId);
  }

  @Patch('/update-field-by-id/:fieldId')
  public async updateFieldById(
    @Param('fieldId') fieldId: string,
    @Body() createFieldDto: CreateFieldDto,
  ): Promise<Field> {
    return await this.fieldService.updateFieldById(fieldId, createFieldDto);
  }

  @Delete('/delete-field-by-id/:fieldId')
  public async deleteFieldById(
    @Param('fieldId') fieldId: string,
  ): Promise<Field> {
    return await this.fieldService.deleteFieldById(fieldId);
  }
}
