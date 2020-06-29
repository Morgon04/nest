import { LearningSchema } from './_model/learning';

describe('Learning', () => {
  it('should be defined', () => {
    expect(new LearningSchema()).toBeDefined();
  });
});
