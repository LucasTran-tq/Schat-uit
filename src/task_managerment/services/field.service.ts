import { Injectable } from '@nestjs/common';
import { CreateFieldDto } from '../dto/create_field.dto';
import { FieldRepository } from '../repositories/field.repository';
import { Field } from '../schemas/field.schema';

@Injectable()
export class FieldService {
  constructor(private readonly fieldRepository: FieldRepository) {}

  public async createField(createFieldDto: CreateFieldDto): Promise<Field> {
    try {
      return await this.fieldRepository.create(createFieldDto);
    } catch (err) {
      return err;
    }
  }

  public async getAllField(): Promise<Field[]> {
    return await this.fieldRepository.getAll();
  }

  public async getField(field_name: string): Promise<Field[]> {
    return await this.fieldRepository.find({ field_name });
  }

  public async getFieldById(fieldId: string): Promise<Field> {
    return await this.fieldRepository.getById(fieldId);
  }

  public async updateFieldById(
    fieldId: string,
    createFieldDto: CreateFieldDto,
  ): Promise<Field> {
    return await this.fieldRepository.updateById(fieldId, createFieldDto);
  }

  public async deleteFieldById(fieldId: string): Promise<Field> {
    return await this.fieldRepository.deleteById(fieldId);
  }
}
