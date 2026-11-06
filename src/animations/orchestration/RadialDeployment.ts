export interface AgentDeploymentRole {
  agentIndex: number;
  agentId: string;
  roleTitle: string;
  targetSelector: string;
  taskLabel: string;
}

export const AGENT_DEPLOYMENT_ROLES: AgentDeploymentRole[] = [
  {
    agentIndex: 0,
    agentId: 'AGENT_01',
    roleTitle: 'LAYOUT & STRUCTURE',
    targetSelector: '[data-build-target="nav-bar"]',
    taskLabel: 'CONSTRUCT: NAV_FRAMEWORK',
  },
  {
    agentIndex: 1,
    agentId: 'AGENT_02',
    roleTitle: 'HERO TYPOGRAPHY',
    targetSelector: '[data-build-target="hero-line-1"]',
    taskLabel: 'GLYPHS: "ENGINEERING"',
  },
  {
    agentIndex: 2,
    agentId: 'AGENT_03',
    roleTitle: 'HERO GRAPHICS',
    targetSelector: '[data-build-target="hero-avatar"]',
    taskLabel: 'RENDER: ORBITAL_CORE',
  },
  {
    agentIndex: 3,
    agentId: 'AGENT_04',
    roleTitle: 'CONTAINERS & CARDS',
    targetSelector: '[data-build-target="hero-meta"]',
    taskLabel: 'CALIBRATE: METADATA_BOUNDS',
  },
  {
    agentIndex: 4,
    agentId: 'AGENT_05',
    roleTitle: 'BRAND & INTERACTIONS',
    targetSelector: '[data-build-target="nav-logo"]',
    taskLabel: 'ASSEMBLE: BRAND_MONOGRAM',
  },
  {
    agentIndex: 5,
    agentId: 'AGENT_06',
    roleTitle: 'STATUS TELEMETRY',
    targetSelector: '[data-build-target="hero-tag"]',
    taskLabel: 'GENERATE: SYSTEM_TAG',
  },
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
  public triggerBurst(colors: string[], count = 24): void {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const speed = 3.5 + Math.random() * 5.5;
      const color = colors[i % colors.length];

      this.particles.push({
        id: i,
        x: this.centerX,
        y: this.centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 2 + Math.random() * 2.5,
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
