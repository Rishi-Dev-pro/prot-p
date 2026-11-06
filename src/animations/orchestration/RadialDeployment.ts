export interface AgentDeploymentRole {
  agentIndex: number;
  agentId: string;
  roleTitle: string;
  targetSelector: string;
  taskLabel: string;
}

export const AGENT_DEPLOYMENT_ROLES: AgentDeploymentRole[] = [
  { agentIndex: 0, agentId: 'AGENT_01', roleTitle: 'NAVIGATION', targetSelector: '[data-build-target="nav-bar"]', taskLabel: 'CONSTRUCT: NAV_FRAMEWORK' },
  { agentIndex: 1, agentId: 'AGENT_02', roleTitle: 'IDENTITY', targetSelector: '[data-build-target="nav-logo"]', taskLabel: 'ASSEMBLE: BRAND_MONOGRAM' },
  { agentIndex: 2, agentId: 'AGENT_03', roleTitle: 'HERO TYPOGRAPHY', targetSelector: '[data-build-target="hero-heading-1"]', taskLabel: 'GLYPH_ASSEMBLY: "ENGINEERING"' },
  { agentIndex: 3, agentId: 'AGENT_04', roleTitle: 'HERO GRAPHICS', targetSelector: '[data-build-target="hero-orbital-graphic"]', taskLabel: 'RENDER: ORBITAL_CORE' },
  { agentIndex: 4, agentId: 'AGENT_05', roleTitle: 'INTERACTIONS', targetSelector: '[data-build-target="hero-cta-group"]', taskLabel: 'CALIBRATE: CTA_INTERFACE' },
  { agentIndex: 5, agentId: 'AGENT_06', roleTitle: 'ABOUT', targetSelector: '[data-build-target="about-section"]', taskLabel: 'LAYOUT: ABOUT_CONTAINER' },
  { agentIndex: 6, agentId: 'AGENT_07', roleTitle: 'CONTENT', targetSelector: '[data-build-target="hero-subheadline"]', taskLabel: 'TYPESET: SYSTEM_BIO' },
  { agentIndex: 7, agentId: 'AGENT_08', roleTitle: 'LAYOUT', targetSelector: '[data-build-target="hero-status-pill"]', taskLabel: 'GENERATE: STATUS_TELEMETRY' },
  { agentIndex: 8, agentId: 'AGENT_09', roleTitle: 'PROJECTS', targetSelector: '[data-build-target="projects-grid"]', taskLabel: 'SCAFFOLD: PROJECTS_MATRIX' },
  { agentIndex: 9, agentId: 'AGENT_10', roleTitle: 'COMPONENTS', targetSelector: '[data-build-target="hero-metadata-card"]', taskLabel: 'MEASURE: METADATA_BOUNDS' },
  { agentIndex: 10, agentId: 'AGENT_11', roleTitle: 'PRINCIPLES', targetSelector: '[data-build-target="principles-grid"]', taskLabel: 'INDEX: 4_CORE_PRINCIPLES' },
  { agentIndex: 11, agentId: 'AGENT_12', roleTitle: 'TECHNOLOGY', targetSelector: '[data-build-target="tech-stack-section"]', taskLabel: 'MAP: 28_CAPABILITIES' },
  { agentIndex: 12, agentId: 'AGENT_13', roleTitle: 'VISUAL SYSTEM', targetSelector: '[data-build-target="hero-heading-2"]', taskLabel: 'GLYPH_ASSEMBLY: "THE"' },
  { agentIndex: 13, agentId: 'AGENT_14', roleTitle: 'ARCHITECTURE', targetSelector: '[data-build-target="architecture-graph"]', taskLabel: 'TRACE: DISTRIBUTED_NODES' },
  { agentIndex: 14, agentId: 'AGENT_15', roleTitle: 'NETWORK GRAPH', targetSelector: '[data-build-target="arch-central-hub"]', taskLabel: 'CONNECT: VECTOR_EDGES' },
  { agentIndex: 15, agentId: 'AGENT_16', roleTitle: 'CONTACT', targetSelector: '[data-build-target="contact-section"]', taskLabel: 'BIND: COMMS_CHANNEL' },
  { agentIndex: 16, agentId: 'AGENT_17', roleTitle: 'EDGE AI', targetSelector: '[data-build-target="hero-heading-3"]', taskLabel: 'GLYPH_ASSEMBLY: "UNEXPECTED."' },
  { agentIndex: 17, agentId: 'AGENT_18', roleTitle: 'TYPOGRAPHY DETAILS', targetSelector: '[data-build-target="hero-stats-banner"]', taskLabel: 'ALIGN: HARDWARE_METRICS' },
  { agentIndex: 18, agentId: 'AGENT_19', roleTitle: 'MOTION SYSTEM', targetSelector: '[data-build-target="hero-scroll-cue"]', taskLabel: 'INIT: SCROLL_REACTOR' },
  { agentIndex: 19, agentId: 'AGENT_20', roleTitle: 'ORCHESTRATOR', targetSelector: '[data-build-target="nav-actions"]', taskLabel: 'SYNCHRONIZE: GLOBAL_HUD' },
];

export interface RadialParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

export class RadialDeploymentController {
  private centerX: number;
  private centerY: number;
  private particles: RadialParticle[] = [];

  constructor(centerX: number, centerY: number) {
    this.centerX = centerX;
    this.centerY = centerY;
  }

  public updateCenter(cx: number, cy: number): void {
    this.centerX = cx;
    this.centerY = cy;
  }

  /**
   * Generates luminous particle bursts upon radial expansion impulse
   */
  public triggerBurst(colors: string[], count = 40): void {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const speed = 3.5 + Math.random() * 6.5;
      const color = colors[i % colors.length];

      this.particles.push({
        id: i,
        x: this.centerX,
        y: this.centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 2 + Math.random() * 3,
        alpha: 1,
      });
    }
  }

  public updateParticles(): RadialParticle[] {
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.94; // friction
      p.vy *= 0.94;
      p.alpha = Math.max(0, p.alpha - 0.025);
    }
    this.particles = this.particles.filter((p) => p.alpha > 0.05);
    return this.particles;
  }

  public getAssignmentForAgent(agentIndex: number): AgentDeploymentRole {
    return AGENT_DEPLOYMENT_ROLES[agentIndex % AGENT_DEPLOYMENT_ROLES.length];
  }
}
