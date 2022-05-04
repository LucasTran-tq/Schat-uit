/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import {
  Organization,
  OrganizationDocument,
} from '../schemas/organization.schema';
@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {}

  public async create(organization: Organization): Promise<Organization> {
    const newOrganization = new this.organizationModel(organization);
    return await newOrganization.save();
  }

  public async getAll(): Promise<Organization[]> {
    return await this.organizationModel.find();
  }

  public async find(
    organizationFilterQuery: FilterQuery<Organization>,
  ): Promise<Organization[]> {
    return await this.organizationModel.find(organizationFilterQuery);
  }

  public async getOne(
    organizationFilterQuery: FilterQuery<Organization>,
  ): Promise<Organization> {
    return await this.organizationModel.findOne(organizationFilterQuery);
  }

  public async getById(organizationID: string): Promise<Organization> {
    return await this.organizationModel.findById(organizationID);
  }

  public async updateById(
    organizationID: string,
    organizationFilterQuery: Partial<Organization>,
  ): Promise<Organization> {
    return await this.organizationModel.findByIdAndUpdate(
      organizationID,
      organizationFilterQuery,
    );
  }

  public async deleteById(organizationID: string): Promise<Organization> {
    return await this.organizationModel.findByIdAndRemove(organizationID);
  }

  public async findUserInOrganization(
    organizationFilterQuery: FilterQuery<Organization>,
  ): Promise<Organization> {
    return await this.organizationModel.findOne(organizationFilterQuery);
  }
}
