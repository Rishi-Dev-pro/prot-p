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
  private rotationSpeed = 0.55; // Radians per second for majestic, smooth orbit
  private agentCount: number;

  constructor(width: number, height: number, agentCount = 6) {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.agentCount = agentCount;
    // Responsive radius with ample clearance from central core
    this.baseRadius = Math.max(160, Math.min(width, height) * 0.32);
  }

  public updateViewport(width: number, height: number, agentCount?: number): void {
    this.centerX = width / 2;
    this.centerY = height / 2;
    if (agentCount !== undefined) {
      this.agentCount = agentCount;
    }
    this.baseRadius = Math.max(160, Math.min(width, height) * 0.32);
  }

  public getCenter(): { x: number; y: number; radius: number } {
    return { x: this.centerX, y: this.centerY, radius: this.baseRadius };
  }

  /**
   * Calculates orbital target for an agent during convergence and synchronous rotation
   * @param agentIndex Index 0..agentCount-1
   * @param elapsedSec Elapsed time in seconds
   * @param formationProgress 0 (entry) to 1 (locked in orbit)
   * @param startPos Initial entry point from viewport edge
   */
  public getAgentPosition(
    agentIndex: number,
    elapsedSec: number,
    formationProgress: number,
    startPos: { x: number; y: number }
  ): OrbitAgentTarget {
    // Symmetrical angular distribution starting at apex (-PI/2 is 12 o'clock)
    const baseAngle = -Math.PI / 2 + (agentIndex / this.agentCount) * (Math.PI * 2);
    // Smooth dynamic rotation
    const currentAngle = baseAngle + elapsedSec * this.rotationSpeed;

    // Organic breathing radius variation
    const radiusMod = Math.sin(elapsedSec * 2.5 + agentIndex * (Math.PI / 3.5)) * 5;
    const activeRadius = this.baseRadius + radiusMod;

    // Ideal orbit coordinate
    const orbitX = this.centerX + Math.cos(currentAngle) * activeRadius;
    const orbitY = this.centerY + Math.sin(currentAngle) * activeRadius;

    // Tangential direction for the cursor pointer arrow (pointing forward along orbit path)
    const tangentAngleRad = currentAngle + Math.PI / 2;
    const tangentAngleDeg = (tangentAngleRad * 180) / Math.PI;

    if (formationProgress < 1) {
      // Smooth cubic bezier easing between entry edge and orbit point
      const ease = this.easeInOutCubic(formationProgress);
      const curX = startPos.x + (orbitX - startPos.x) * ease;
      const curY = startPos.y + (orbitY - startPos.y) * ease;

      // Pointer smoothly faces its target point while flying inward
      const dx = orbitX - curX;
      const dy = orbitY - curY;
      const moveAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      // Interpolate between trajectory angle and tangent angle as it locks into orbit
      const blend = Math.max(0, (formationProgress - 0.7) / 0.3);
      const angle = blend > 0 ? this.lerpAngle(moveAngleDeg, tangentAngleDeg, blend) : moveAngleDeg;

      return {
        x: curX,
        y: curY,
        angle,
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

  private lerpAngle(a: number, b: number, t: number): number {
    const diff = ((b - a + 180) % 360) - 180;
    return a + diff * t;
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}
