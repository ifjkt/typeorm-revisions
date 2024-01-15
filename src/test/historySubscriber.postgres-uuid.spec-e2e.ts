import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { RevisionActionType } from '../constants/revisionActionType';
import { TestHistoryEntityUid } from './entities/TestHistoryEntityUid';
import { TestEntityUid } from './entities/TestEntityUid';

const testDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
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
    const testEntity = await TestEntityUid.create({ test: 'test' }).save();

    const histories = await TestHistoryEntityUid.find();
    expect(histories).toHaveLength(1);
    expect(histories[0].recordId).toBe(testEntity.id);
    expect(histories[0].revisionType).toBe(RevisionActionType.CREATED);
    expect(histories[0].test).toBe('test');
  });

  it('update history', async () => {
    const testEntity = await TestEntityUid.create({ test: 'test' }).save();
    testEntity.test = 'updated';
    await testEntity.save();

    const histories = await TestHistoryEntityUid.find();
    expect(histories).toHaveLength(2);
    expect(histories[0].recordId).toBe(testEntity.id);
    expect(histories[0].revisionType).toBe(RevisionActionType.CREATED);
    expect(histories[0].test).toBe('test');

    expect(histories[1].recordId).toBe(testEntity.id);
    expect(histories[1].revisionType).toBe(RevisionActionType.UPDATED);
    expect(histories[1].test).toBe('updated');
  });

  it('delete history', async () => {
    const testEntity = await TestEntityUid.create({ test: 'test' }).save();
    await testEntity.remove();

    const histories = await TestHistoryEntityUid.find();
    expect(histories).toHaveLength(2);
    expect(histories[0].revisionType).toBe(RevisionActionType.CREATED);
    expect(histories[1].revisionType).toBe(RevisionActionType.DELETED);
  });

  afterEach(async () => {
    await testDataSource.destroy();
  });
});
