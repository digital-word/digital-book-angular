export enum NoteStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum NotePermission {
  PRIVATE = 'private',
  SHARED = 'shared',
  PUBLIC = 'public',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortBy {
  TITLE = 'title',
  UPDATED_AT = 'updatedAt',
  CREATED_AT = 'createdAt',
}
export interface NoteListParam {
  page: number;
  limit: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
  includeDeleted?: boolean;
}

export interface NoteCreateParam {
  title: string;
  isFavorite: boolean;
  status: NoteStatus;
  permission: NotePermission;
}

export interface NoteCategory {
  name: string;
}

export interface NoteTag {
  name: string;
}

export interface NoteItem {
  id: string;
  title: string;
  isFavorite: boolean;
  status: NoteStatus;
  permissions: NotePermission;
  version: number;
  createdAt: string;
  updatedAt: string;
  tags: NoteTag[];
  categories: NoteCategory[];
}
