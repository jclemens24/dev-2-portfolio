import { describe, expect, it } from 'vitest';

import { formatTimestamp } from './index';

describe('formatTimestamp', () => {
	it('should format epoch seconds to a readable date string', () => {
		// January 1, 2024, 12:00 PM UTC
		const epochSeconds = 1704110400;
		const result = formatTimestamp(epochSeconds);

		// Result should contain the date parts
		expect(result).toContain('2024');
		expect(result).toContain('Jan');
		expect(result).toContain('1');
	});

	it('should handle zero timestamp', () => {
		const result = formatTimestamp(0);

		// Should be January 1, 1970 (Unix epoch start) or Dec 31, 1969 depending on timezone
		expect(result).toMatch(/(1970|1969)/);
		expect(result).toMatch(/(Jan|Dec)/);
	});

	it('should include time information', () => {
		// June 15, 2024, 3:30 PM UTC
		const epochSeconds = 1718466600;
		const result = formatTimestamp(epochSeconds);

		// Should include hour and minute
		expect(result).toMatch(/\d{1,2}:\d{2}/);
	});

	it('should handle negative timestamps', () => {
		// December 31, 1969
		const epochSeconds = -86400;
		const result = formatTimestamp(epochSeconds);

		expect(result).toContain('1969');
		expect(result).toContain('Dec');
	});
});
