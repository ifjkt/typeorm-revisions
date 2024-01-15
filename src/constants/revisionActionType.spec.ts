import { RevisionActionType } from './revisionActionType';

describe('RevisionActionType', () => {
  it('should get revision types', () => {
    expect(Object.values(RevisionActionType)).toStrictEqual([
      RevisionActionType.CREATED,
      RevisionActionType.UPDATED,
      RevisionActionType.DELETED,
    ]);
  });
});
