import { DataSource } from 'typeorm';
import { TestEntity } from './entities/TestEntity';
import 'reflect-metadata';
import { TestHistoryEntity } from './entities/TestHistoryEntity';
import { RevisionActionType } from '../constants/revisionActionType';
import { TestEntitySoft } from './entities/TestEntitySoft';
import { TestHistorySoftEntity } from './entities/TestHistorySoftEntity';

const testDataSource = new DataSource({
  type: 'mariadb',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '12345678',
  database: 'typeorm_revisions_test',
  dropSchema: true,
  synchronize: true,
  subscribers: ['src/test/subscribers/*{.ts,.js}'],
  entities: ['src/test/entities/*.ts'],
});

describe('e2e test', () => {
  beforeEach(async () => {
    const ds = await testDataSource.initialize();
    expect(ds).toBeDefined();
    expect(ds.isInitialized).toBeTruthy();
  });

  it('create history', async () => {
    const testEntity = await TestEntity.create({ test: 'test' }).save();

    const histories = await TestHistoryEntity.find();
    expect(histories).toHaveLength(1);
    expect(histories[0].recordId).toBe(testEntity.id);
    expect(histories[0].revisionType).toBe(RevisionActionType.CREATED);
    expect(histories[0].test).toBe('test');
  });

  it('update history', async () => {
    const testEntity = await TestEntity.create({ test: 'test' }).save();
    testEntity.test = 'updated';
    await testEntity.save();

    const histories = await TestHistoryEntity.find();
    expect(histories).toHaveLength(2);
    expect(histories[0].recordId).toBe(testEntity.id);
    expect(histories[0].revisionType).toBe(RevisionActionType.CREATED);
    expect(histories[0].test).toBe('test');

    expect(histories[1].recordId).toBe(testEntity.id);
    expect(histories[1].revisionType).toBe(RevisionActionType.UPDATED);
    expect(histories[1].test).toBe('updated');
  });

  it('delete history', async () => {
    const testEntity = await TestEntity.create({ test: 'test' }).save();
    await testEntity.remove();

    const histories = await TestHistoryEntity.find();
    expect(histories).toHaveLength(2);
    expect(histories[0].revisionType).toBe(RevisionActionType.CREATED);
    expect(histories[1].revisionType).toBe(RevisionActionType.DELETED);
  });

  it('soft delete history', async () => {
    const testEntity = await TestEntitySoft.create({ test: 'test-soft' }).save();
    await testEntity.softRemove();

    const histories = await TestHistorySoftEntity.find({ withDeleted: true });
    expect(histories).toHaveLength(2);
    expect(histories[0].revisionType).toBe(RevisionActionType.CREATED);
    expect(histories[1].revisionType).toBe(RevisionActionType.DELETED);
  });

  afterEach(async () => {
    await testDataSource.destroy();
  });
});
