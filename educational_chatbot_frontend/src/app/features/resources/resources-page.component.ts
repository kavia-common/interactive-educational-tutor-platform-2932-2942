import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { ResourcesService, ResourceItem } from '../../core/services/resources.service';

/**
 * PUBLIC_INTERFACE
 * Displays educational resources and allows simple search.
 */
@Component({
  selector: 'app-resources-page',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, DatePipe],
  template: `
    <section class="panel">
      <div class="panel-header">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-weight:600;">Resources</span>
          <span class="badge">{{ items.length }}</span>
        </div>
        <div class="input-control" style="border-radius: 10px;">
          <input [(ngModel)]="q" placeholder="Search resources..." (keyup.enter)="search()"/>
          <button class="btn secondary" (click)="search()">Search</button>
        </div>
      </div>

      <div style="padding:12px; display:grid; gap:12px;">
        <div *ngFor="let r of items" class="panel" style="box-shadow:none; border-radius:10px;">
          <div style="padding:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:700;">{{ r.title }}</div>
                <small style="color:#6b7280;">Subject: {{ r.subject }} • Updated {{ r.updated_at | date:'mediumDate' }}</small>
              </div>
              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                <span class="badge" *ngFor="let t of r.tags">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="items.length===0" style="text-align:center; color:#6b7280; padding:20px;">
          No resources found.
        </div>
      </div>
    </section>
  `
})
export class ResourcesPageComponent {
  private resources = inject(ResourcesService);

  items: ResourceItem[] = [];
  q = '';

  ngOnInit() {
    this.search();
  }

  // PUBLIC_INTERFACE
  search(): void {
    /** Loads resources filtered by search query. */
    this.resources.listResources(this.q).subscribe({
      next: (data) => this.items = data,
      error: () => this.items = []
    });
  }
}
