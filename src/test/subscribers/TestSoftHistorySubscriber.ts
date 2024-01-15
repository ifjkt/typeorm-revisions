import { EventSubscriber } from 'typeorm';
import { HistorySubscriber } from '../../historySubscriber';
import { TestEntitySoft } from '../entities/TestEntitySoft';
import { TestHistorySoftEntity } from '../entities/TestHistorySoftEntity';

@EventSubscriber()
export class TestHistorySubscriber extends HistorySubscriber<TestEntitySoft, TestHistorySoftEntity> {
  public entity = TestEntitySoft;
  public historyEntity = TestHistorySoftEntity;
}
