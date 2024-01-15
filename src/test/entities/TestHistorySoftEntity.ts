import { Column, Entity } from 'typeorm';
import { AuditTable } from '../../decorators/auditTable';
import { HistoryEntityInterface } from '../../interfaces/historyEntityInterface';
import { RevisionActionType } from '../../constants/revisionActionType';
import { TestEntitySoft } from './TestEntitySoft';

@Entity()
@AuditTable({
  recordIdProperty: 'recordId',
  revisionTypeProperty: 'revisionType',
  revisionTimestampProperty: 'revisionTime',
})
export class TestHistorySoftEntity extends TestEntitySoft implements HistoryEntityInterface {
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
