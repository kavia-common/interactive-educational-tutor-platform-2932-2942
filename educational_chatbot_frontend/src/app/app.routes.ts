import { Routes } from '@angular/router';
import { ChatPageComponent } from './features/chat/chat-page.component';
import { ResourcesPageComponent } from './features/resources/resources-page.component';
import { ProfilePageComponent } from './features/profile/profile-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  { path: 'chat', component: ChatPageComponent, title: 'Chat - EduAssist' },
  { path: 'resources', component: ResourcesPageComponent, title: 'Resources - EduAssist' },
  { path: 'profile', component: ProfilePageComponent, title: 'Profile - EduAssist' },
  { path: '**', redirectTo: 'chat' }
];
