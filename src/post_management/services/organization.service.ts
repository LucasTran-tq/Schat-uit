/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { User } from 'src/auth/schemas/user.schema';
import {
  CreateOrganizationDto,
  ParticipantsDto,
  UpdateOrganizationDto,
} from '../dto/organization.dto';
import { OrgRole } from '../enums/organization_role.enum';
import { OrganizationRepository } from '../repositories/organization.repository';
import {
  Organization,
  ParticipantOrganization,
} from '../schemas/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async createOrganization(
    owner: User,
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<any> {
    try {
      const { participants, ...rest1 } = createOrganizationDto;

      let participantsArray: ParticipantOrganization[] = [];

      // TODO: check user list who has already exist in another organization.
      const existingUsers = await this.checkExistingUserInOrg(participants);

      const existingOwner = await this.checkOwnerInOrg(owner._id.toString());
      if (existingOwner) {
        return `can not create organization || owner have been on another organization`;
      }

      // TODO: CREATE ORGANIZATION SUCCESSFULLY
      const participantPromise = participants.map(
        async (
          participantsDto: ParticipantsDto,
        ): Promise<ParticipantOrganization> => {
          const { user_id, ...rest2 } = participantsDto;

          // send suitable user to create Org
          if (!existingUsers.includes(user_id)) {
            const userObj = await this.userRepository.getUser({
              _id: user_id,
            });

            return { user: userObj, ...rest2 };
          }
        },
      );

      // adding Participants
      const ownerObj = { user: owner, role: 'admin' };
      participantsArray.push(ownerObj);

      for (let i = 0; i < participantPromise.length; i++) {
        const parti = await participantPromise[i];
        if (parti) {
          participantsArray.push(parti);
        }
      }

      const organization = { ...rest1, participants: participantsArray };

      if (organization.participants.length === 0) {
        return `can not create organization || all participants have been on another organization`;
      } else {
        return this.organizationRepository.create(organization);
      }
    } catch (error) {
      return error;
    }
  }

  public async getOrganizationByUser(user_id: string): Promise<Organization> {
    const objId = new mongoose.Types.ObjectId(user_id);

    const org = await this.organizationRepository.findUserInOrganization({
      'participants.user._id': objId,
    });
    return org;
  }

  public async getAllOrganization(): Promise<Organization[]> {
    return await this.organizationRepository.getAll();
  }

  public async getOrganization(name: string): Promise<Organization[]> {
    return await this.organizationRepository.find({ name });
  }

  public async getOrganizationById(id: string): Promise<Organization> {
    return await this.organizationRepository.getById(id);
  }

  public async updateOrganizationById(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    try {
      // user list
      // const user = await this.userRepository.getUser({_id: })
      // return await this.organizationRepository.updateById(id);
    } catch (error) {
      return error;
    }
  }

  public async addUserToOrganization(
    orgId: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    try {
      // user list from dto
      // -> list participant
      // update to db

      const org = await this.organizationRepository.getById(orgId);

      const { participants } = updateOrganizationDto;

      // check user have been another Org or not
      const existingUsers = await this.checkExistingUserInOrg(participants);

      if (existingUsers.length === 0) {
        const participantsPromise = participants.map(async (item) => {
          const user = await this.userRepository.findByID(item.user_id);

          const parObj: ParticipantOrganization = {
            user: user,
            role: item.role,
          };

          org.participants.push(parObj);

          return parObj;
        });

        // handle asynchronous
        for (let i = 0; i < participantsPromise.length; i++) {
          await participantsPromise[i];
        }

        return await this.organizationRepository.updateById(orgId, org);
      }
    } catch (error) {
      return error;
    }
  }

  public async removeUserFromOrganization(
    orgId: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    try {
      // user list from dto
      // -> list participant
      // update to db

      const org = await this.organizationRepository.getById(orgId);

      const { participants } = updateOrganizationDto;

      // check user have been another Org or not
      const existingUsers = await this.checkExistingUserInOrg(participants);

      // existingUsers.length == participants.length
      if (existingUsers.length === participants.length) {
        const participantsPromise = participants.map(async (item) => {
          org.participants.forEach((value, index) => {
            if (value.user._id.toString() === item.user_id) {
              org.participants.splice(index, 1);
            }
          });
        });

        // handle asynchronous
        for (let i = 0; i < participantsPromise.length; i++) {
          await participantsPromise[i];
        }

        return await this.organizationRepository.updateById(orgId, org);
      }
    } catch (error) {
      return error;
    }
  }

  // TODO: Condition to update
  public async updateUserRoleInOrg(
    orgId: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<any> {
    try {
      // user list from dto
      // -> list participant
      // update to db

      const org = await this.organizationRepository.getById(orgId);

      const { participants } = updateOrganizationDto;

      // check user have been another Org or not
      const existingUsers = await this.checkExistingUserInOrg(participants);

      // * In the org has at least 2 admin
      const checkOrgHasOver2Admin = this.checkAfterUpdate_OrgHasOver_2Admins(
        org,
        participants,
      );

      // existingUsers.length == participants.length
      if (
        existingUsers.length === participants.length &&
        checkOrgHasOver2Admin
      ) {
        const participantsPromise = participants.map(async (item) => {
          org.participants.forEach((value, index) => {
            if (value.user._id.toString() === item.user_id) {
              org.participants[index].role = item.role;
            }
          });
        });

        // handle asynchronous
        for (let i = 0; i < participantsPromise.length; i++) {
          await participantsPromise[i];
        }

        return await this.organizationRepository.updateById(orgId, org);
      }
    } catch (error) {
      return error;
    }
  }

  public async deleteOrganizationById(id: string): Promise<Organization> {
    return await this.organizationRepository.deleteById(id);
  }

  // check user list who has already exist in another organization.
  async checkExistingUserInOrg(participants: any) {
    let existingUsers = [];

    // ? way 2: find to db in one time
    // ? way 1: find to db in many time.
    const participantPromise = participants.map(
      async (participantsDto: ParticipantsDto): Promise<any> => {
        const { user_id, ...rest2 } = participantsDto;

        const objId = new mongoose.Types.ObjectId(user_id);

        const orgsHaveExistingUser =
          await this.organizationRepository.findUserInOrganization({
            'participants.user._id': objId,
          });

        if (orgsHaveExistingUser) {
          orgsHaveExistingUser.participants.map((item) => {
            if (item.user._id.toString() === user_id) {
              existingUsers.push(user_id);
            }
          });
        }
        return orgsHaveExistingUser;
      },
    );

    // handle asynchronous
    for (let i = 0; i < participantPromise.length; i++) {
      await participantPromise[i];
    }

    return existingUsers;
  }

  async checkOwnerInOrg(owner: string) {
    const orgsHaveExistingUser =
      await this.organizationRepository.findUserInOrganization({
        'participants.user._id': owner,
      });

    if (orgsHaveExistingUser) {
      return true;
    } else {
      return false;
    }
  }

  checkAfterUpdate_OrgHasOver_2Admins(
    org: Organization,
    participants: ParticipantsDto[],
  ) {
    // who is admin in org
    // the admin is changed to member or not -> Yes, check the rest of admin in org -> >=2 admins -> true
    // return true or false.

    let amountOfAdminChangedToMember = 0;
    let amountOfAdmin = 0;
    org.participants.map((item) => {
      // count amount of admin
      if (item.role === OrgRole.Admin) {
        amountOfAdmin++;
      }

      // count amount of admin changed to member
      participants.forEach((value, index) => {
        if (
          item.role === OrgRole.Admin &&
          item.user._id.toString() === value.user_id.toString() &&
          value.role === OrgRole.Member
        ) {
          amountOfAdminChangedToMember++;
        }
      });
    });

    if (amountOfAdmin - amountOfAdminChangedToMember >= 2) return true;
    else return false;
  }
}
