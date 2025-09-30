import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  messages: ChatMessage[];
  session_id: string;
}

/**
 * PUBLIC_INTERFACE
 * Manages chat interactions with the backend multi-agent chatbot.
 */
@Injectable({ providedIn: 'root' })
export class ChatService {
  private api = inject(ApiService);

  /** PUBLIC_INTERFACE */
  sendMessage(sessionId: string | null, message: string, contextTags: string[] = []): Observable<ChatResponse> {
    return this.api.post<ChatResponse>('/chat', { session_id: sessionId, message, context: contextTags });
  }

  /** PUBLIC_INTERFACE */
  getSessionHistory(sessionId: string): Observable<ChatResponse> {
    return this.api.get<ChatResponse>(`/chat/${encodeURIComponent(sessionId)}`);
  }
}
