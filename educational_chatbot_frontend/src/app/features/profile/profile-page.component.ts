import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * PUBLIC_INTERFACE
 * Displays and allows editing basic profile preferences.
 */
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="panel" style="max-width: 760px;">
      <div class="panel-header">
        <div style="font-weight:700;">Profile</div>
        <button class="btn secondary" (click)="save()" [disabled]="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
      </div>
      <div style="padding:16px; display:grid; gap:12px;">
        <div class="kv-pair">
          <label style="display:block; font-weight:600; margin-bottom:6px;">Display Name</label>
          <input [(ngModel)]="form.name" class="input-control" style="border-radius:10px; padding:10px 12px;" />
        </div>
        <div class="kv-pair">
          <label style="display:block; font-weight:600; margin-bottom:6px;">Email</label>
          <input [(ngModel)]="form.email" class="input-control" style="border-radius:10px; padding:10px 12px;" />
        </div>
        <div class="kv-pair">
          <label style="display:block; font-weight:600; margin-bottom:6px;">Preferred Subjects</label>
          <input [(ngModel)]="form.subjects" placeholder="e.g., Math, Physics" class="input-control" style="border-radius:10px; padding:10px 12px;" />
        </div>
        <small style="color:#6b7280;">Note: Saving is local-only for demo; integrate with backend profile endpoint when available.</small>
      </div>
    </section>
  `
})
export class ProfilePageComponent {
  form = {
    name: 'Student',
    email: 'student@example.com',
    subjects: 'Math, Physics'
  };
  saving = false;

  // PUBLIC_INTERFACE
  save(): void {
    /** Simulates save and provides user feedback. */
    this.saving = true;
    (globalThis as any).setTimeout(() => { this.saving = false; }, 600);
  }
}
