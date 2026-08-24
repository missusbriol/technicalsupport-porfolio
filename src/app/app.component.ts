import { Component, signal } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { ContactComponent } from './components/contact/contact.component';
import { EngineeringComponent } from './components/engineering/engineering.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { InternationalComponent } from './components/international/international.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SupportComponent } from './components/support/support.component';
import { ToolsComponent } from './components/tools/tools.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { AnimatedBackgroundComponent } from './shared/animated-background/animated-background.component';
import { IntroComponent } from './shared/intro/intro.component';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './components/resume/resume.component';

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
    AnimatedBackgroundComponent,
    IntroComponent,
    CommonModule,
    ResumeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  introDone = signal(false);
}
