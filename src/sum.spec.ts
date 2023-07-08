import { sum } from './sum';

import { expect, describe, it } from 'vitest';

describe('sum', () => {
    it('should sum two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
