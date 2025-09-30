import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChatService, ChatMessage } from '../../core/services/chat.service';

/**
 * PUBLIC_INTERFACE
 * Central chat interface for interacting with the educational multi-agent chatbot.
 */
@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, DatePipe],
  template: `
    <section class="panel" style="display:grid; grid-template-rows: auto 1fr auto; min-height: 60vh;">
      <div class="panel-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="badge">Active Session</div>
          <span style="color:#6b7280; font-size:13px;">{{ sessionId || 'new' }}</span>
        </div>
        <div>
          <button class="btn ghost" (click)="newSession()">New Session</button>
        </div>
      </div>

      <div class="chat-scroll">
        <div *ngFor="let m of messages" class="message" [class.user]="m.role === 'user'" [class.assistant]="m.role === 'assistant'">
          <div class="bubble">
            <div style="white-space:pre-wrap">{{ m.content }}</div>
            <small style="display:block; opacity:.7; margin-top:6px;" *ngIf="m.timestamp">{{ m.timestamp | date:'short' }}</small>
          </div>
        </div>

        <div *ngIf="messages.length===0" style="text-align:center; color:#6b7280;">
          Start by asking a question, e.g., "Explain the Pythagorean theorem with an example."
        </div>
      </div>

      <div class="input-area">
        <div class="input-control">
          <textarea [(ngModel)]="draft" rows="1" placeholder="Type your question..." (keydown.enter)="onEnter($event)"></textarea>
        </div>
        <button class="btn" (click)="send()" [disabled]="sending || !draft.trim()">
          {{ sending ? 'Sending...' : 'Send' }}
        </button>
      </div>
    </section>
  `
})
export class ChatPageComponent {
  private chat = inject(ChatService);

  sessionId: string | null = null;
  messages: ChatMessage[] = [];
  draft = '';
  sending = false;

  // PUBLIC_INTERFACE
  newSession(): void {
    /** Clears current session state to start a new conversation. */
    this.sessionId = null;
    this.messages = [];
  }

  onEnter(e: any) {
    const shift = !!(e && e.shiftKey);
    if (!shift) {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      this.send();
    }
  }

  // PUBLIC_INTERFACE
  send(): void {
    /** Sends the user's message to the backend and appends assistant response. */
    const text = this.draft.trim();
    if (!text) return;
    this.messages.push({ role: 'user', content: text, timestamp: new Date().toISOString() });
    this.draft = '';
    this.sending = true;
    this.chat.sendMessage(this.sessionId, text).subscribe({
      next: (res) => {
        this.sessionId = res.session_id;
        // In case backend returns full messages, prefer response; else mock assistant echo
        if (res?.messages?.length) {
          // Append only new assistant messages (simple approach)
          const newMsgs = res.messages.filter(m => m.role !== 'system');
          this.messages.push(...newMsgs.map(m => ({ ...m, timestamp: m.timestamp || new Date().toISOString() })));
        } else {
          this.messages.push({ role: 'assistant', content: 'Received. Let’s explore this step-by-step!', timestamp: new Date().toISOString() });
        }
      },
      error: () => {
        this.messages.push({ role: 'assistant', content: 'There was an error contacting the tutor. Please try again.', timestamp: new Date().toISOString() });
      },
      complete: () => this.sending = false
    });
  }
}
