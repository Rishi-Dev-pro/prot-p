import { buildTypography, TypographyBuilderOptions } from './TypographyBuilder';
import { buildContainer, ContainerBuilderOptions } from './ContainerBuilder';
import { buildButton, ButtonBuilderOptions } from './ButtonBuilder';
import { buildCard, CardBuilderOptions } from './CardBuilder';
import { buildArchitectureSVG, SVGPathBuilderOptions } from './SVGPathBuilder';

export const ConstructionStrategies = {
  typography: (options: TypographyBuilderOptions) => buildTypography(options),
  container: (options: ContainerBuilderOptions) => buildContainer(options),
  button: (options: ButtonBuilderOptions) => buildButton(options),
  card: (options: CardBuilderOptions) => buildCard(options),
  architecture: (options: SVGPathBuilderOptions) => buildArchitectureSVG(options),
};
