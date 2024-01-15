import { Column, Entity } from 'typeorm';
import { HistoryEntityInterface } from '../../interfaces/historyEntityInterface';
import { RevisionActionType } from '../../constants/revisionActionType';
import { TestEntity } from './TestEntity';
import { AuditTable } from '../../decorators/auditTable';

@Entity()
@AuditTable({
  recordIdProperty: 'recordId',
  revisionTypeProperty: 'revisionType',
  revisionTimestampProperty: 'revisionTime',
})
export class TestHistoryEntity extends TestEntity implements HistoryEntityInterface {
  @Column({
    name: 'record_id',
    type: 'int',
  })
  recordId: number;

  @Column({
    name: 'revision_timestamp',
  })
  revisionTime: Date;

  @Column({
    name: 'revision_type',
  })
  revisionType: RevisionActionType;
}
