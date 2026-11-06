export interface OrbitAgentTarget {
  x: number;
  y: number;
  angle: number; // pointer orientation in degrees
  progress: number;
  inFormation: boolean;
}

export class CircularFormationEngine {
  private centerX: number;
  private centerY: number;
  private baseRadius: number;
  private rotationAngle = 0;
  private rotationSpeed = 0.8; // radians per second
  private agentCount: number;

  constructor(width: number, height: number, agentCount = 20) {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.agentCount = agentCount;
    // Desktop radius ~220px, responsive on smaller viewports
    this.baseRadius = Math.max(130, Math.min(width, height) * 0.24);
  }

  public updateViewport(width: number, height: number): void {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.baseRadius = Math.max(130, Math.min(width, height) * 0.24);
  }

  public getCenter(): { x: number; y: number; radius: number } {
    return { x: this.centerX, y: this.centerY, radius: this.baseRadius };
  }

  /**
   * Calculates orbital target for an agent during convergence and synchronous rotation
   * @param agentIndex Index 0..agentCount-1
   * @param elapsedSec Elapsed time in seconds
   * @param formationProgress 0 (just starting entry) to 1 (fully locked in orbit)
   * @param startPos Initial entry point from viewport edge
   */
  public getAgentPosition(
    agentIndex: number,
    elapsedSec: number,
    formationProgress: number,
    startPos: { x: number; y: number }
  ): OrbitAgentTarget {
    // Angular distribution evenly spaced across 360 degrees
    const baseAngle = (agentIndex / this.agentCount) * (Math.PI * 2);
    // Smooth dynamic rotation with subtle acceleration
    const currentAngle = baseAngle + elapsedSec * this.rotationSpeed;

    // Organic breathing radius variation per agent
    const radiusMod = Math.sin(elapsedSec * 3 + agentIndex * 0.6) * 7;
    const activeRadius = this.baseRadius + radiusMod;

    // Ideal orbit position
    const orbitX = this.centerX + Math.cos(currentAngle) * activeRadius;
    const orbitY = this.centerY + Math.sin(currentAngle) * activeRadius;

    // Tangential direction for the cursor pointer arrow
    const tangentAngleRad = currentAngle + Math.PI / 2;
    const tangentAngleDeg = (tangentAngleRad * 180) / Math.PI;

    if (formationProgress < 1) {
      // Smooth cubic bezier-like ease between entry point and orbit point
      const ease = this.easeInOutCubic(formationProgress);
      const curX = startPos.x + (orbitX - startPos.x) * ease;
      const curY = startPos.y + (orbitY - startPos.y) * ease;

      // Pointer faces the orbit destination during convergence
      const dx = orbitX - curX;
      const dy = orbitY - curY;
      const moveAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      return {
        x: curX,
        y: curY,
        angle: Math.abs(dx) + Math.abs(dy) > 2 ? moveAngleDeg : tangentAngleDeg,
        progress: formationProgress,
        inFormation: formationProgress > 0.85,
      };
    }

    return {
      x: orbitX,
      y: orbitY,
      angle: tangentAngleDeg,
      progress: 1,
      inFormation: true,
    };
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}

