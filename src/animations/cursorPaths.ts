export interface Waypoint {
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  duration: number; // seconds
  actionText: string;
  isClicking?: boolean;
}

export interface AgentPathDefinition {
  agentId: string;
  waypoints: Waypoint[];
}

export const AGENT_CHOREOGRAPHY: Record<string, Waypoint[]> = {
  AGENT_01: [
    { x: 10, y: 15, duration: 1.2, actionText: 'ALLOCATING_CANVAS' },
    { x: 50, y: 35, duration: 1.5, actionText: 'CENTERING_VIEWPORT', isClicking: true },
    { x: 20, y: 45, duration: 1.4, actionText: 'INJECTING_ROOT_TOKENS' },
    { x: 48, y: 48, duration: 1.2, actionText: 'FINALIZING_CANVAS_SCAFFOLD' },
  ],
  AGENT_02: [
    { x: 80, y: 10, duration: 1.1, actionText: 'MOUNTING_NAVBAR_FRAME' },
    { x: 50, y: 6, duration: 1.4, actionText: 'ANCHORING_ROUTES', isClicking: true },
    { x: 15, y: 8, duration: 1.3, actionText: 'VERIFYING_IDENTITY_BRAND' },
    { x: 88, y: 7, duration: 1.2, actionText: 'NAVBAR_LOCK_ENGAGED' },
  ],
  AGENT_03: [
    { x: 25, y: 30, duration: 1.0, actionText: 'SAMPLING_VECTOR_SPLINES' },
    { x: 35, y: 25, duration: 1.3, actionText: 'STITCHING_HERO_TYPOGRAPHY', isClicking: true },
    { x: 65, y: 32, duration: 1.6, actionText: 'INTERPOLATING_SPRING_CURVES' },
    { x: 50, y: 38, duration: 1.1, actionText: 'SYNCHRONIZING_REFRESH_RATES' },
  ],
  AGENT_04: [
    { x: 30, y: 22, duration: 1.2, actionText: 'KERNING_SPACE_GROTESK' },
    { x: 45, y: 25, duration: 1.1, actionText: 'CONSTRUCTING_OUTLINE_STROKES', isClicking: true },
    { x: 55, y: 27, duration: 1.5, actionText: 'APPLYING_GLYPH_SHADOWS' },
    { x: 40, y: 24, duration: 1.2, actionText: 'TYPOGRAPHIC_LOCK' },
  ],
  AGENT_05: [
    { x: 70, y: 40, duration: 1.3, actionText: 'ISOLATING_COMPONENT_NODES' },
    { x: 75, y: 55, duration: 1.5, actionText: 'COMPOSING_PRINCIPLE_CARDS', isClicking: true },
    { x: 60, y: 58, duration: 1.2, actionText: 'HYDRATING_ABOUT_BLOCKS' },
    { x: 72, y: 62, duration: 1.4, actionText: 'VALIDATING_CHILD_TREE' },
  ],
  AGENT_06: [
    { x: 40, y: 60, duration: 1.4, actionText: 'ALIGNING_ISOMETRIC_GRID' },
    { x: 50, y: 65, duration: 1.3, actionText: 'BALANCING_FLEX_CONTAINERS', isClicking: true },
    { x: 30, y: 70, duration: 1.5, actionText: 'INSPECTING_FLOW_VECTORS' },
    { x: 45, y: 68, duration: 1.1, actionText: 'LAYOUT_COMPUTED' },
  ],
  AGENT_07: [
    { x: 85, y: 50, duration: 1.2, actionText: 'BLENDING_ACCENT_GRADIENTS' },
    { x: 80, y: 68, duration: 1.4, actionText: 'ATTACHING_GLOW_EFFECTS', isClicking: true },
    { x: 90, y: 72, duration: 1.3, actionText: 'RENDERING_CHROMATIC_EDGES' },
    { x: 82, y: 64, duration: 1.2, actionText: 'VISUAL_BUFFERS_RESOLVED' },
  ],
  AGENT_08: [
    { x: 45, y: 8, duration: 1.1, actionText: 'GENERATING_NAV_MATRIX' },
    { x: 65, y: 6, duration: 1.3, actionText: 'CONFIGURING_SMOOTH_SCROLL', isClicking: true },
    { x: 85, y: 8, duration: 1.4, actionText: 'WIRING_CONTACT_TRIGGER' },
    { x: 30, y: 7, duration: 1.2, actionText: 'ROUTING_INDEX_PINS' },
  ],
  AGENT_09: [
    { x: 20, y: 70, duration: 1.5, actionText: 'COMPILING_FLAGSHIP_AHI' },
    { x: 35, y: 75, duration: 1.3, actionText: 'INDEXING_AETHER_SPECS', isClicking: true },
    { x: 25, y: 82, duration: 1.4, actionText: 'VERIFYING_695_TEST_PASSES' },
    { x: 40, y: 78, duration: 1.2, actionText: 'PROJECT_MATRIX_MOUNTED' },
  ],
  AGENT_10: [
    { x: 60, y: 45, duration: 1.2, actionText: 'REGISTERING_CLICK_LISTENERS' },
    { x: 52, y: 48, duration: 1.4, actionText: 'CALIBRATING_TACTILE_FEEDBACK', isClicking: true },
    { x: 68, y: 42, duration: 1.3, actionText: 'DISPATCHING_FOCUS_EVENTS' },
    { x: 58, y: 46, duration: 1.1, actionText: 'INTERACTION_ONLINE' },
  ],
  AGENT_11: [
    { x: 30, y: 85, duration: 1.3, actionText: 'ESTABLISHING_STATE_STREAM' },
    { x: 42, y: 88, duration: 1.4, actionText: 'SYNCING_TECH_STACK_TOKENS', isClicking: true },
    { x: 50, y: 86, duration: 1.2, actionText: 'BUFFERING_METRIC_TELEMETRY' },
    { x: 36, y: 89, duration: 1.1, actionText: 'DATA_STREAM_SYNCHRONIZED' },
  ],
  AGENT_12: [
    { x: 65, y: 72, duration: 1.2, actionText: 'PROBING_DEVICE_PIXEL_RATIO' },
    { x: 72, y: 78, duration: 1.4, actionText: 'CALIBRATING_BREAKPOINTS', isClicking: true },
    { x: 60, y: 76, duration: 1.3, actionText: 'ENFORCING_CONTAINER_QUERIES' },
    { x: 68, y: 74, duration: 1.1, actionText: 'VIEWPORT_NORMALIZED' },
  ],
  AGENT_13: [
    { x: 80, y: 80, duration: 1.4, actionText: 'SCANNING_TYPE_DEFINITIONS' },
    { x: 88, y: 84, duration: 1.2, actionText: 'CHECKING_STRICT_NULLS', isClicking: true },
    { x: 78, y: 86, duration: 1.5, actionText: 'VERIFYING_SCHEMA_CONTRACTS' },
    { x: 84, y: 82, duration: 1.1, actionText: 'ZERO_TYPE_ERRORS' },
  ],
  AGENT_14: [
    { x: 18, y: 52, duration: 1.2, actionText: 'INITIALIZING_NEURAL_NODES' },
    { x: 28, y: 56, duration: 1.4, actionText: 'CONNECTING_COGNITIVE_GRAPH', isClicking: true },
    { x: 22, y: 62, duration: 1.3, actionText: 'WEIGHTING_ARCHITECTURE_LINKS' },
    { x: 25, y: 54, duration: 1.1, actionText: 'NEURAL_TOPOLOGY_READY' },
  ],
  AGENT_15: [
    { x: 52, y: 80, duration: 1.3, actionText: 'ANALYZING_PAINT_LAYERS' },
    { x: 58, y: 84, duration: 1.2, actionText: 'OPTIMIZING_WILL_CHANGE', isClicking: true },
    { x: 48, y: 82, duration: 1.5, actionText: 'ELIMINATING_COMPOSITING_JANK' },
    { x: 55, y: 81, duration: 1.1, actionText: 'GPU_ACCELERATION_ACTIVE' },
  ],
  AGENT_16: [
    { x: 76, y: 20, duration: 1.1, actionText: 'VERIFYING_SECURE_SOCKET' },
    { x: 82, y: 26, duration: 1.4, actionText: 'HANDSHAKING_TERMINAL_BUS', isClicking: true },
    { x: 74, y: 28, duration: 1.3, actionText: 'ENCRYPTING_CONTACT_CHANNEL' },
    { x: 80, y: 22, duration: 1.2, actionText: 'PROTOCOL_ACK' },
  ],
  AGENT_17: [
    { x: 26, y: 18, duration: 1.3, actionText: 'PROBING_ARDUINO_SERIAL' },
    { x: 34, y: 22, duration: 1.2, actionText: 'PARSING_YOLOV8_WEIGHTS', isClicking: true },
    { x: 22, y: 24, duration: 1.4, actionText: 'BENCHMARKING_EDGE_INFERENCE' },
    { x: 30, y: 20, duration: 1.1, actionText: 'EDGE_TELEMETRY_STREAMING' },
  ],
  AGENT_18: [
    { x: 42, y: 90, duration: 1.4, actionText: 'AUDITING_COLOR_CONTRAST' },
    { x: 48, y: 94, duration: 1.2, actionText: 'VALIDATING_ARIA_SEMANTICS', isClicking: true },
    { x: 38, y: 92, duration: 1.3, actionText: 'CHECKING_KEYBOARD_NAV_FLOW' },
    { x: 44, y: 91, duration: 1.1, actionText: 'A11Y_AUDIT_PASSED' },
  ],
  AGENT_19: [
    { x: 90, y: 38, duration: 1.2, actionText: 'PRE-CACHING_VECTOR_ICONS' },
    { x: 94, y: 44, duration: 1.4, actionText: 'HYDRATING_TEXTURE_NOISE', isClicking: true },
    { x: 86, y: 46, duration: 1.3, actionText: 'OPTIMIZING_GEOMETRIC_SVGS' },
    { x: 91, y: 41, duration: 1.1, actionText: 'ASSETS_HYDRATED' },
  ],
  AGENT_20: [
    { x: 50, y: 48, duration: 1.1, actionText: 'ORCHESTRATING_AGENT_TIMELINE' },
    { x: 48, y: 52, duration: 1.3, actionText: 'BROADCASTING_PHASE_ADVANCE', isClicking: true },
    { x: 54, y: 46, duration: 1.4, actionText: 'HARMONIZING_SIMULATION_STATE' },
    { x: 50, y: 50, duration: 1.2, actionText: 'ASSEMBLY_SEQUENCE_COMPLETE' },
  ],
};

