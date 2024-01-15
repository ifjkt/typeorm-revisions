import 'reflect-metadata';
import { AuditOptions } from '../interfaces/auditOptions';

export function AuditTable(auditOptions: AuditOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (constructor: Function) => {
    constructor.prototype.auditRecordIdProperty = auditOptions.recordIdProperty;
    constructor.prototype.auditRevisionTypeProperty = auditOptions.revisionTypeProperty;
    constructor.prototype.auditRevisionTimestampProperty = auditOptions.revisionTimestampProperty;
  };
}
