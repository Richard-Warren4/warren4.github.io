/**
 * Calculate reading time from markdown content
 * Uses 200 words per minute as average reading speed
 */

const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(content: string): {
	wordCount: number;
	readingTime: number;
	readingTimeText: string;
} {
	// Split on whitespace to get word count
	const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

	// Calculate reading time with minimum of 1 minute
	const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

	// Format display text
	const readingTimeText = `${readingTime} min read`;

	return {
		wordCount,
		readingTime,
		readingTimeText
	};
}
