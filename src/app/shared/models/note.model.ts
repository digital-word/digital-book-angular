import { Pagination } from './pagination.model';

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

export interface NoteListParam {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  includeDeleted?: boolean;
}

export interface NoteCreateParam {
  title: string;
  isFavorite: boolean;
  status: NoteStatus;
  permissions: NotePermission;
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

export interface NoteRes {
  success: boolean;
  data: NoteItem[];
  message: string;
  timestamp: string;
  pagination: Pagination;
}

export interface NoteCreateRes {
  success: boolean;
  data: NoteItem;
  message: string;
  timestamp: string;
}
