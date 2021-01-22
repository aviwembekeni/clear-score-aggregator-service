import standardizeDifferentScales from './standardizeDifferentScales';

describe('Testing standardizing different scales function function', (): void => {
  it('should bring back standardized value (100) from a scale of 0 to 100', (): void => {
    expect(standardizeDifferentScales(4, 0, 4, 100)).toEqual(100);
  });

  it('should bring back standardized value (0) from a scale of 0 to 100', (): void => {
    expect(standardizeDifferentScales(0, 0, 4, 100)).toEqual(0);
  });

  it('should bring back standardized value (50) from a scale of 0 to 100', (): void => {
    expect(standardizeDifferentScales(2, 0, 4, 100)).toEqual(50);
  });
});
