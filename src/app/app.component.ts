import { Component } from '@angular/core';
import { AnimatedBackgroundComponent } from './shared/animated-background/animated-background.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SupportComponent } from './components/support/support.component';
import { ToolsComponent } from './components/tools/tools.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { EngineeringComponent } from './components/engineering/engineering.component';
import { InternationalComponent } from './components/international/international.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

/**
 * Root component - assembles the page from the section components
 * below. ThemeService is `providedIn: 'root'`, so dark mode already
 * works app-wide without anything injected here.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AnimatedBackgroundComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SupportComponent,
    ToolsComponent,
    CapabilitiesComponent,
    WorkflowComponent,
    EngineeringComponent,
    InternationalComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
