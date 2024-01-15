import { HistorySubscriber } from '../../historySubscriber';
import { EventSubscriber } from 'typeorm';
import { TestEntityUid } from '../entities/TestEntityUid';
import { TestHistoryEntityUid } from '../entities/TestHistoryEntityUid';

@EventSubscriber()
export class TestHistoryUidSubscriber extends HistorySubscriber<TestEntityUid, TestHistoryEntityUid> {
  public entity = TestEntityUid;
  public historyEntity = TestHistoryEntityUid;
}
