import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Field, FieldDocument } from '../schemas/field.schema';
@Injectable()
export class FieldRepository {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<FieldDocument>,
  ) {}

  public async create(field: Field): Promise<Field> {
    const newField = new this.fieldModel(field);
    return await newField.save();
  }

  public async getAll(): Promise<Field[]> {
    return await this.fieldModel.find();
  }

  public async find(fieldFilterQuery: FilterQuery<Field>): Promise<Field[]> {
    return await this.fieldModel.find(fieldFilterQuery);
  }

  public async getOne(fieldFilterQuery: FilterQuery<Field>): Promise<Field> {
    return await this.fieldModel.findOne(fieldFilterQuery);
  }

  public async getById(fieldID: string): Promise<Field> {
    return await this.fieldModel.findById(fieldID);
  }

  public async updateById(
    fieldID: string,
    fieldFilterQuery: Partial<Field>,
  ): Promise<Field> {
    return await this.fieldModel.findByIdAndUpdate(fieldID, fieldFilterQuery);
  }

  public async deleteById(fieldID: string): Promise<Field> {
    return await this.fieldModel.findByIdAndRemove(fieldID);
  }
}
