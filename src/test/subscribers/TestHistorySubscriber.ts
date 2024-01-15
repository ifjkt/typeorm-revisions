import { HistorySubscriber } from '../../historySubscriber';
import { TestEntity } from '../entities/TestEntity';
import { TestHistoryEntity } from '../entities/TestHistoryEntity';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class TestHistorySubscriber extends HistorySubscriber<TestEntity, TestHistoryEntity> {
  public entity = TestEntity;
  public historyEntity = TestHistoryEntity;
}
