# @ifjkt/typeorm-revisions

![npm](https://img.shields.io/npm/v/@ifjkt/typeorm-revisions.svg)
![NPM](https://img.shields.io/npm/l/@ifjkt/typeorm-revisions.svg)

## Description

Provides a Revision History Subscriber for [TypeORM](http://typeorm.io) Entities

Tested: MySQL 8, MariaDB and Postgres

## Installation

```bash
$ npm i --save typeorm typeorm-revisions
```

## Quick Start

### 1. Create your own Entity

```ts
@Entity()
class MyModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
  
  @Column()
  public name!: string;
  
  @Column()
  public email!: string;
}
```

### 2. Create an Entity for your Audit table

```ts
@Entity()
class MyModelHistory extends MyModel implements HistoryEntityInterface {
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
```

### 3. Annotate your Audit table with the @AuditTable decorator and specify your audit fields

```ts
@Entity()
@AuditTable({
  recordIdProperty: 'recordId',
  revisionTypeProperty: 'revisionType',
  revisionTimestampProperty: 'revisionTime',
})
class MyModelHistory extends MyModel implements HistoryEntityInterface {
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
```

### 4. Create an Entity Subscriber for your entity to process Audit events

```ts
@EventSubscriber()
class MyModelHistorySubscriber extends HistorySubscriber<MyModel, MyModelHistory> {
  public entity = MyModel;
  public historyEntity = MyModelHistory;
}
```

## License

[MIT](LICENSE)


Forked from https://github.com/ephillipe/typeorm-revisions
