import { FindOptions } from 'typeorm';
import { User } from '../entities/User.entity.ts';
import {
  createInstance,
  deleteInstance,
  findManyInstances,
  findOneInstance,
  updateOneInstance
} from './base.service.ts';

export async function createUser(
  ctx: IContext,
  data: NZ.IUser
): Promise<NZ.IUser> {
  return <NZ.IUser>await createInstance(ctx, User, data as any);
}

export async function readUserById(
  ctx: IContext,
  id: string
): Promise<NZ.IUser> {
  return <NZ.IUser>await findOneInstance(ctx, User, {
    where: {
      id
    }
  });
}

export async function readUserByEmail(
  ctx: IContext,
  email: string
): Promise<NZ.IUser> {
  return <NZ.IUser>await findOneInstance(ctx, User, {
    where: { email }
  });
}

export async function readAllUsers(ctx: IContext): Promise<NZ.IUser[]> {
  return <NZ.IUser[]>await findManyInstances(ctx, User, {
    // relations: ['UserOwner'],
    select: {
      UserOwner: {
        firstName: true,
        lastName: true,
        profileImage: true
      }
    }
  });
}

export async function updateUser(
  ctx: IContext,
  id: string,
  data: Partial<NZ.IUser>
): Promise<NZ.IUser> {
  return <NZ.IUser>await updateOneInstance(
    ctx,
    User,
    {
      where: { id }
    },
    data
  );
}

export async function deleteUserById(
  ctx: IContext,
  id: string
): Promise<boolean> {
  return <boolean>await deleteInstance(ctx, User, id);
}

export async function readUsersByConditions(
  ctx: IContext,
  condition: NZ.IUser
): Promise<NZ.IUser> {
  return <NZ.IUser>await findOneInstance(ctx, User, {
    where: condition
  });
}
