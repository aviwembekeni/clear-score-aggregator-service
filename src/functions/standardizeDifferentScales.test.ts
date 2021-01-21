import standardizeDifferentScales from './standardizeDifferentScales';

describe('Testing standardizing different scales function function', (): void => {
  it('should bring back standardized value (10) from a scale of 0 to 10', (): void => {
    expect(standardizeDifferentScales(4, 0, 4, 10)).toEqual(10);
  });

  it('should bring back standardized value (0) from a scale of 0 to 10', (): void => {
    expect(standardizeDifferentScales(0, 0, 4, 10)).toEqual(0);
  });

  it('should bring back standardized value (5) from a scale of 0 to 10', (): void => {
    expect(standardizeDifferentScales(2, 0, 4, 10)).toEqual(5);
  });
});
