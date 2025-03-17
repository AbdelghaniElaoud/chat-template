import { Route } from '@angular/router';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { content } from './shared/routes/content.routes';
import { AuthenticationLayoutComponent } from './shared/layouts/authentication-layout/authentication-layout.component';
import { authen } from './shared/routes/auth.routes';
import { landingRoutingModule } from './components/pages/landing.routes';
import { landing } from './shared/routes/landing.routes';
import { LandingLayoutComponent } from './shared/layouts/landing-layout/landing-layout.component';

export const App_Route: Route[] = [
      { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      {
        path: 'auth/login',
        loadComponent: () =>
          import('../app/authentication/login/login.component').then((m) => m.LoginComponent),
      },
      { path: '', component: ContentLayoutComponent, children: content },
      { path: '', component: AuthenticationLayoutComponent, children: authen },
      { path: '', component: LandingLayoutComponent, children: landing },

    ]