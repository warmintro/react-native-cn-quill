export type EditorEventType =
  | 'format-change'
  | 'selection-change'
  | 'text-change'
  | 'editor-change'
  | 'html-change'
  | 'dimensions-change'
  | 'mention-change'
  | 'blur'
  | 'focus'
  | 'mention-source';

export interface SelectionChangeData {
  range: { index: number; length: number } | null;
  oldRange: { index: number; length: number } | null;
  source: string;
}

export interface TextChangeData {
  delta: any;
  oldDelta: any;
  source: string;
  html: string;
}

export interface HtmlChangeData {
  html: string;
}

export interface EditorChangeData {
  eventName: string;
  args: Array<any>;
}

export interface FormatChangeData {
  formats: any;
}

export interface DimensionsChangeData {
  width: number;
  height: number;
}

export type EditorChangeHandler = (data: EditorChangeData) => void;
export type TextChangeHandler = (data: TextChangeData) => void;
export type SelectionChangeHandler = (data: SelectionChangeData) => void;
export type FormatChangeHandler = (data: FormatChangeData) => void;
export type HtmlChangeHandler = (data: HtmlChangeData) => void;
export type DimensionsChangeHandler = (data: DimensionsChangeData) => void;
export type MentionHandler = (data: any) => void;

export type EditorEventHandler =
  | EditorChangeHandler
  | TextChangeHandler
  | SelectionChangeHandler
  | FormatChangeHandler
  | HtmlChangeHandler
  | DimensionsChangeHandler
  | MentionHandler;
