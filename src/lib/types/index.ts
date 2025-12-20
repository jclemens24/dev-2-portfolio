export type FileItem = {
	name?: string;
	size?: number;
	type: string;
	url?: string;
};

export type Message = {
	id: string;
	role: 'user' | 'assistant' | 'system';
	content: string;
	timestamp: number; // epoch time in seconds
	files?: FileItem[];
	error?: string;
	done?: boolean; // Indicates if the message is complete (for streaming)
};

export type Colors =
	| 'purple'
	| 'blue'
	| 'cyan'
	| 'green'
	| 'pink'
	| 'emerald'
	| 'violet'
	| 'gray'
	| 'orange'
	| 'red';
