import { Column, Entity } from 'typeorm';
import { HistoryEntityInterface } from '../../interfaces/historyEntityInterface';
import { RevisionActionType } from '../../constants/revisionActionType';
import { AuditTable } from '../../decorators/auditTable';
import { TestEntityUid } from './TestEntityUid';

@Entity()
@AuditTable({
  recordIdProperty: 'recordId',
  revisionTypeProperty: 'revisionType',
  revisionTimestampProperty: 'revisionTime',
})
export class TestHistoryEntityUid extends TestEntityUid implements HistoryEntityInterface {
  @Column({
    name: 'record_id',
  })
  recordId: string;

  @Column({
    name: 'revision_timestamp',
  })
  revisionTime: Date;

  @Column({
    name: 'revision_type',
  })
  revisionType: RevisionActionType;
}
