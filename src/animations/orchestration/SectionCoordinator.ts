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
    completionBanner: 'HERO ENVIRONMENT: COMPLETE // NEXT DESTINATION: ABOUT',
    nextSection: 'about',
  },
  about: {
    id: 'about',
    title: 'SECTION 02: ABOUT & PRINCIPLES',
    completionBanner: 'ABOUT ARCHITECTURE: COMPLETE // NEXT DESTINATION: PROJECTS',
    nextSection: 'projects',
  },
  projects: {
    id: 'projects',
    title: 'SECTION 03: FLAGSHIP PROJECTS (6)',
    completionBanner: '6 FLAGSHIP PROJECTS CONSTRUCTED // NEXT DESTINATION: ARCHITECTURE',
    nextSection: 'architecture',
  },
  architecture: {
    id: 'architecture',
    title: 'SECTION 04: DISTRIBUTED TOPOLOGY',
    completionBanner: 'DISTRIBUTED MESH CONNECTED // NEXT DESTINATION: CAPABILITIES',
    nextSection: 'stack',
  },
  stack: {
    id: 'stack',
    title: 'SECTION 05: TECH CAPABILITIES & LABS',
    completionBanner: 'TECHNOLOGY MATRIX BUILT // NEXT DESTINATION: COMMS',
    nextSection: 'contact',
  },
  contact: {
    id: 'contact',
    title: 'SECTION 06: COMMS & SYSTEM APEX',
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

  public notifySectionCompletion(sectionId: ConstructionSectionId): void {
    const meta = SECTION_METAS[sectionId];
    if (meta && this.onBannerNotify) {
      this.onBannerNotify(meta.completionBanner);
    }
  }
}
