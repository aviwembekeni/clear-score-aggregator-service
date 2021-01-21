import standardizeDifferentScales from './standardizeDifferentScales';

describe('Testing standardizing different scales function function', (): void => {
  it('should bring back standardized value from a scale of 0 to 10', (): void => {
    expect(standardizeDifferentScales(4, 0, 4, 10)).toEqual(10);
  });
});
