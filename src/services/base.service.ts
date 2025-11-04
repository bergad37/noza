import pkg from 'lodash';
import {
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository
} from 'typeorm';
import { AppDataSource } from '../data-source.ts';

const { isEqual } = pkg;

export function getEntityRepository<T extends ObjectLiteral>(
  entity: EntityTarget<T>
): Repository<T> {
  return AppDataSource.getRepository<T>(entity);
}

/**
 *
 * @param ctx Context object containing key information of the user
 * @param entity Typeorm entity mapping a table in database
 * @param data Necessary data to create a new data record
 */
export async function createInstance<T extends Repository<T>>(
  ctx: IContext,
  entity: EntityTarget<T>,
  data: DeepPartial<T>
) {
  return (async () => {
    try {
      const repository: Repository<T> = getEntityRepository(entity);
      const record = repository.create(data) as DeepPartial<T>;
      return await repository.save(record);
    } catch (error: any) {
      throw new Error(error.message);
    }
  })();
}

/**
 *
 * @param ctx Context object containing key information of the user
 * @param entity Typeorm entity mapping a table in database
 * @param condition Find options
 */
export async function findOneInstance<T extends Repository<T>>(
  ctx: IContext,
  entity: EntityTarget<T>,
  condition: FindOneOptions
) {
  return (async () => {
    try {
      const repository = getEntityRepository(entity);
      return await repository.findOne(condition as FindOneOptions<T>);
    } catch (error: any) {
      throw new Error(error.message);
    }
  })();
}

/**
 *
 * @param ctx Context object containing key information of the user
 * @param entity Typeorm entity mapping a table in database
 * @param condition Find options
 */
export async function findManyInstances<T extends Repository<T>>(
  ctx: IContext,
  entity: EntityTarget<T>,
  condition?: FindManyOptions
) {
  return (async () => {
    try {
      const repository = getEntityRepository(entity);
      return await repository.find(condition);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  })();
}

/**
 *
 * @param ctx Context object containing key information of the user
 * @param entity Typeorm entity mapping a table in database
 * @param condition Find options
 * @param data Necessary data to update record in database
 */
export async function updateOneInstance<T extends Repository<T>>(
  ctx: IContext,
  entity: EntityTarget<T>,
  condition: FindOneOptions,
  data: DeepPartial<T>
) {
  return (async () => {
    try {
      const repository = getEntityRepository(entity);
      const savedRecord = await findOneInstance(ctx, entity, condition);
      if (!savedRecord) {
        throw new Error('Record not found');
      }
      const record = repository.merge(savedRecord, data) as DeepPartial<T>;
      return await repository.save(record);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  })();
}

/**
 *
 * @param ctx Context object containing key information of the user
 * @param entity Typeorm entity mapping a table in database
 * @param id Record id to delete
 */
export async function deleteInstance<T extends Repository<T>>(
  ctx: IContext,
  entity: EntityTarget<T>,
  id: string | string[]
): Promise<boolean> {
  return (async () => {
    try {
      const repository = getEntityRepository(entity);
      const result = await repository.delete(id);
      return !!isEqual(result.affected, 1);
    } catch (error: any) {
      throw new Error(error.message);
    }
  })();
}

/**
 * Initialise the Query Builder
 *
 * @param ctx Context object containing key information about the current session
 * @param entity TypeORM entity mapping a table in the database
 * @param alias Optional alias for the entity
 * @returns QueryBuilder for the entity
 */
export function loadQueryBuilder<T extends Repository<T>>(
  ctx: IContext,
  entity: EntityTarget<T>,
  alias?: string
) {
  try {
    const repository = getEntityRepository(entity);
    return repository.createQueryBuilder(alias);
  } catch (error: any) {
    throw new ErrorEvent(error?.message);
  }
}

export async function bulkCreateInstance<T extends Repository<T>>(
  ctx: IContext,
  entity: EntityTarget<T>,
  data: DeepPartial<T>[]
) {
  return (async () => {
    try {
      const repository = getEntityRepository(entity);
      const record = <DeepPartial<T>[]>repository.create(data);
      return repository.save(record);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  })();
}

export async function deleteAllInstance<T extends Repository<T>>(
  ctx: IContext,
  entity: EntityTarget<T>
): Promise<boolean> {
  return (async () => {
    try {
      const repository = getEntityRepository(entity);
      const result = await repository.delete({});
      return !!isEqual(result.affected, 1);
    } catch (error: any) {
      throw new Error(error.message);
    }
  })();
}
