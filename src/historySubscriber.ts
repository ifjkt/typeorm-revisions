import {
  BaseEntity,
  EntityManager,
  EntityMetadata,
  EntitySubscriberInterface,
  InsertEvent,
  InsertResult,
  ObjectLiteral,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import 'reflect-metadata';
import { RevisionActionType } from './constants/revisionActionType';

export abstract class HistorySubscriber<Entity extends BaseEntity, HistoryEntity extends Entity>
  implements EntitySubscriberInterface<Entity>
{
  public abstract get entity(): any;
  public abstract get historyEntity(): any;

  public listenTo() {
    return this.entity;
  }

  async afterInsert(event: InsertEvent<Entity>): Promise<InsertResult | void> {
    const historyRepo = event.manager.getRepository(this.historyEntity);
    const history: any = historyRepo.create(event.entity);
    history[history['auditRevisionTypeProperty']] = RevisionActionType.CREATED;
    history[history['auditRevisionTimestampProperty']] = new Date();
    history[history['auditRecordIdProperty']] = event.entityId;

    if (history[history['auditRecordIdProperty']]) {
      await historyRepo.insert(history);
    }
  }

  async afterUpdate(event: UpdateEvent<Entity>): Promise<InsertResult | void> {
    if (event.entity) {
      let history = this.createAuditEntity(event.manager, event.entity);
      history = this.setAuditFields(event.metadata, history, event.databaseEntity, RevisionActionType.UPDATED);

      if (history[history['auditRecordIdProperty']]) {
        return event.manager.insert(this.historyEntity, history);
      }
    }
  }

  async afterRemove(event: RemoveEvent<Entity>): Promise<any> {
    if (event.entity) {
      let history = this.createAuditEntity(event.manager, event.entity);
      history = this.setAuditFields(event.metadata, history, event.databaseEntity, RevisionActionType.DELETED);

      if (history[history['auditRecordIdProperty']]) {
        return event.manager.insert(this.historyEntity, history);
      }
    }
  }

  async afterSoftRemove(event: RemoveEvent<Entity>): Promise<any> {
    if (event.entity) {
      let history = this.createAuditEntity(event.manager, event.entity);
      history = this.setAuditFields(event.metadata, history, event.databaseEntity, RevisionActionType.DELETED);

      if (history[history['auditRecordIdProperty']]) {
        return event.manager.insert(this.historyEntity, history);
      }
    }
  }

  private createAuditEntity(entityManager: EntityManager, data: ObjectLiteral | Entity): ObjectLiteral {
    return entityManager.create(this.historyEntity, {
      ...data,
    });
  }

  private setAuditFields(
    metadata: EntityMetadata,
    history: HistoryEntity | any,
    entity: Entity,
    revisionActionType: RevisionActionType,
  ) {
    history[history['auditRevisionTypeProperty']] = revisionActionType;
    history[history['auditRevisionTimestampProperty']] = new Date();

    metadata.primaryColumns.forEach((column) => {
      const dbEntity: any = entity;
      history[history['auditRecordIdProperty']] = dbEntity ? dbEntity[column.propertyName] : 0;
      history[column.propertyName] = null;
    });

    return history;
  }
}
