import { ConstructionSectionId } from './TaskQueue';

export interface SectionMeta {
  id: ConstructionSectionId;
  title: string;
  completionBanner: string;
  nextSection?: ConstructionSectionId;
}

export const SECTION_METAS: Record<ConstructionSectionId, SectionMeta> = {
  hero: {
    id: 'hero',
    title: 'SECTION 01: HERO & IDENTITY',
    completionBanner: 'HERO ENVIRONMENT: COMPLETE // ADVANCING TO ABOUT',
    nextSection: 'about',
  },
  about: {
    id: 'about',
    title: 'SECTION 02: ABOUT & PRINCIPLES',
    completionBanner: 'ABOUT ARCHITECTURE: COMPLETE // ADVANCING TO TIMELINE',
    nextSection: 'timeline',
  },
  timeline: {
    id: 'timeline',
    title: 'SECTION 03: ENGINEERING TIMELINE',
    completionBanner: 'TIMELINE MATRIX BUILT // ADVANCING TO PROJECTS',
    nextSection: 'projects',
  },
  projects: {
    id: 'projects',
    title: 'SECTION 04: FLAGSHIP PROJECTS (6)',
    completionBanner: '6 FLAGSHIP PROJECTS CONSTRUCTED // ADVANCING TO ARCHITECTURE',
    nextSection: 'architecture',
  },
  architecture: {
    id: 'architecture',
    title: 'SECTION 05: DISTRIBUTED TOPOLOGY',
    completionBanner: 'DISTRIBUTED MESH CONNECTED // ADVANCING TO STACK',
    nextSection: 'stack',
  },
  stack: {
    id: 'stack',
    title: 'SECTION 06: TECH CAPABILITIES',
    completionBanner: 'TECHNOLOGY MATRIX BUILT // ADVANCING TO EXPERIMENTS',
    nextSection: 'experiments',
  },
  experiments: {
    id: 'experiments',
    title: 'SECTION 07: INTERACTIVE LABS',
    completionBanner: 'ACTIVE LABS INITIALIZED // ADVANCING TO COMMS',
    nextSection: 'contact',
  },
  contact: {
    id: 'contact',
    title: 'SECTION 08: COMMS & SYSTEM APEX',
    completionBanner: 'COMMS UPLINK SECURED // RETURNING TO APEX',
    nextSection: undefined,
  },
};

export class SectionCoordinator {
  private currentSectionId: ConstructionSectionId = 'hero';
  private onBannerNotify?: (banner: string) => void;

  constructor(onBannerNotify?: (banner: string) => void) {
    this.onBannerNotify = onBannerNotify;
  }

  public getCurrentSection(): SectionMeta {
    return SECTION_METAS[this.currentSectionId];
  }

  public advanceToSection(sectionId: ConstructionSectionId): void {
    this.currentSectionId = sectionId;
  }

  public getNextSection(sectionId: ConstructionSectionId): ConstructionSectionId | undefined {
    return SECTION_METAS[sectionId]?.nextSection;
  }

  public notifySectionCompletion(sectionId: ConstructionSectionId): void {
    const meta = SECTION_METAS[sectionId];
    if (meta && this.onBannerNotify) {
      this.onBannerNotify(meta.completionBanner);
    }
  }
}
