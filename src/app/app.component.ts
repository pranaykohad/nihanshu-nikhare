import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  signal,
  Inject,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptimizedImgComponent } from './components/optimized-img.component';
import { ToWebPPipe } from './pipes/to-webp.pipe';

type Tab = 'home' | 'projects' | 'about' | 'contact';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  location: string;
  image: string;
  description: string;
  tag: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, OptimizedImgComponent, ToWebPPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  activeTab = signal<Tab>('home');
  menuOpen = signal(false);
  navScrolled = signal(false);
  activeFilter = signal('All');
  heroImageLoaded = signal(false);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Hero carousel
  heroImages: string[] = [
    'assets/tim-stief-dH6IjhWHNQQ-unsplash.jpg',
    'assets/sean-pollock-PhYq704ffdA-unsplash.jpg',
    'assets/adrian-cuj-o_9YmCY0bag-unsplash.jpg',
    'assets/dan-freeman-WHPsxhB4mWQ-unsplash.jpg',
    'assets/howard-bouchevereau-042Srn0-82o-unsplash.jpg',
    'assets/ricardo-gomez-angel-PzYiCWOHtfU-unsplash.jpg',
  ];
  activeHeroSlide = signal(0);
  private heroInterval: any = null;

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };
  formSubmitted = signal(false);

  navLinks: { label: string; tab: Tab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Projects', tab: 'projects' },
    { label: 'About', tab: 'about' },
    { label: 'Contact', tab: 'contact' },
  ];

  categories = ['All', 'Residential', 'Commercial', 'Interior', 'Landscape'];

  projects: Project[] = [
    {
      id: 1,
      title: 'Casa Serena',
      category: 'Residential',
      year: '2023',
      location: 'Nagpur, India',
      image: 'assets/sean-pollock-PhYq704ffdA-unsplash.jpg',
      description:
        'A minimalist luxury villa that merges indoor and outdoor living through expansive glass facades and natural stone.',
      tag: 'Featured',
    },
    {
      id: 2,
      title: 'Zenith Tower',
      category: 'Commercial',
      year: '2022',
      location: 'Nagpur, India',
      image: 'assets/adrian-cuj-o_9YmCY0bag-unsplash.jpg',
      description:
        'A 28-storey commercial tower redefining the city skyline with biophilic design and sustainable systems.',
      tag: 'Award Winner',
    },
    {
      id: 3,
      title: 'The Terrace Residence',
      category: 'Residential',
      year: '2023',
      location: 'Nagpur, India',
      image: 'assets/dan-freeman-WHPsxhB4mWQ-unsplash.jpg',
      description:
        'Clifftop residence inspired by the landscape, with terraced gardens cascading toward the sea.',
      tag: 'New',
    },
    {
      id: 4,
      title: 'Blueprint Studio',
      category: 'Interior',
      year: '2022',
      location: 'Nagpur, India',
      image: 'assets/construction-plans-drawing-tools-blueprints.jpg',
      description:
        'A creative studio workspace where raw concrete meets warm timber in a perfectly balanced composition.',
      tag: '',
    },
    {
      id: 5,
      title: 'Mist Pavilion',
      category: 'Landscape',
      year: '2021',
      location: 'Nagpur, India',
      image: 'assets/howard-bouchevereau-042Srn0-82o-unsplash.jpg',
      description:
        'An open-air pavilion nestled in the Western Ghats forest, designed to disappear into its surroundings.',
      tag: 'Featured',
    },
    {
      id: 6,
      title: 'Urban Loft',
      category: 'Interior',
      year: '2023',
      location: 'Nagpur, India',
      image: 'assets/klim-musalimov-pw-BkIYqnfo-unsplash.jpg',
      description:
        'Industrial loft conversion with bespoke steel joinery and a curated palette of earth tones.',
      tag: '',
    },
    {
      id: 7,
      title: 'Heritage Renewal',
      category: 'Commercial',
      year: '2021',
      location: 'Nagpur, India',
      image: 'assets/joakim-nadell-K67sBVqLLuw-unsplash.jpg',
      description:
        'Adaptive reuse of a colonial-era warehouse into a vibrant mixed-use cultural hub.',
      tag: 'Award Winner',
    },
    {
      id: 8,
      title: 'Sahara Villa',
      category: 'Residential',
      year: '2022',
      location: 'Nagpur, India',
      image: 'assets/paul-menz-jh_KHWamObU-unsplash.jpg',
      description:
        'Desert-inspired villa harnessing passive cooling and traditional Rajasthani craftsmanship.',
      tag: '',
    },
  ];

  stats = [
    { value: '120+', label: 'Projects Completed' },
    { value: '3+', label: 'Years of Practice' },
    { value: '8', label: 'Cities' },
    { value: '12', label: 'Awards Won' },
  ];

  services = [
    {
      icon: '◈',
      title: 'Architectural Design',
      description:
        'From concept sketches to detailed construction drawings, we craft spaces that are functional, beautiful, and deeply personal.',
    },
    {
      icon: '◉',
      title: 'Interior Architecture',
      description:
        'Harmonising materials, light, and form to create interiors that feel curated and alive, from single rooms to entire homes.',
    },
    {
      icon: '◇',
      title: 'Project Management',
      description:
        'End-to-end oversight of your project — timelines, contractors, budgets — so you can focus on the vision, not the logistics.',
    },
    {
      icon: '◈',
      title: 'Landscape & Masterplanning',
      description:
        'Designing the spaces between buildings as thoughtfully as the buildings themselves, with ecology at the core.',
    },
  ];

  ngOnInit() {
    this.startHeroCarousel();
  }

  ngOnDestroy() {
    this.stopHeroCarousel();
  }

  private startHeroCarousel() {
    this.heroInterval = setInterval(() => {
      this.activeHeroSlide.update((i) => (i + 1) % this.heroImages.length);
    }, 5000);
  }

  private stopHeroCarousel() {
    if (this.heroInterval) {
      clearInterval(this.heroInterval);
      this.heroInterval = null;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.navScrolled.set(window.scrollY > 30);
  }

  setTab(tab: Tab) {
    this.activeTab.set(tab);
    this.menuOpen.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  get filteredProjects(): Project[] {
    const f = this.activeFilter();
    return f === 'All'
      ? this.projects
      : this.projects.filter((p) => p.category === f);
  }

  submitForm() {
    if (
      this.contactForm.name &&
      this.contactForm.email &&
      this.contactForm.message
    ) {
      this.formSubmitted.set(true);
      this.contactForm = { name: '', email: '', subject: '', message: '' };
      setTimeout(() => this.formSubmitted.set(false), 5000);
    }
  }
}
