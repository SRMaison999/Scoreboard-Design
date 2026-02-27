export interface ManualChapter {
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

export interface ManualSearchSnippet {
  readonly text: string;
  readonly matchIndex: number;
}

export interface ManualSearchResult {
  readonly chapterIndex: number;
  readonly chapterTitle: string;
  readonly matchCount: number;
  readonly snippets: readonly ManualSearchSnippet[];
}
