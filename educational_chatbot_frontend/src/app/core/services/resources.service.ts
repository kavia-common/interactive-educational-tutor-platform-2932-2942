import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  tags: string[];
  updated_at: string;
}

/**
 * PUBLIC_INTERFACE
 * Provides methods to fetch educational resources and RAG context.
 */
@Injectable({ providedIn: 'root' })
export class ResourcesService {
  private api = inject(ApiService);

  /** PUBLIC_INTERFACE */
  listResources(query?: string): Observable<ResourceItem[]> {
    const q = query ? `?q=${encodeURIComponent(query)}` : '';
    return this.api.get<ResourceItem[]>(`/resources${q}`);
  }

  /** PUBLIC_INTERFACE */
  getResource(id: string): Observable<ResourceItem> {
    return this.api.get<ResourceItem>(`/resources/${encodeURIComponent(id)}`);
  }
}
