import { SurfaceBlockSchema } from '@blocksuite/blank/blocks/surface';
import { ConnectorElementRendererExtension } from '@blocksuite/blank/gfx/connector';
import {
  MindmapElementRendererExtension,
  MindMapView,
} from '@blocksuite/blank/gfx/mindmap';
import { ShapeElementRendererExtension } from '@blocksuite/blank/gfx/shape';
import { TextElementRendererExtension } from '@blocksuite/blank/gfx/text';
import { RootBlockSchema } from '@blocksuite/blank/model';
import {
  DocModeService,
  ThemeService,
} from '@blocksuite/blank/shared/services';
import { BlockViewExtension, FlavourExtension } from '@blocksuite/blank/std';
import { ToolController } from '@blocksuite/blank/std/gfx';
import type { BlockSchema, ExtensionType } from '@blocksuite/blank/store';
import { literal } from 'lit/static-html.js';
import type { z } from 'zod';

import { MindmapService } from './mindmap-service.js';
import { MindmapSurfaceBlockService } from './surface-service.js';

export const MiniMindmapSpecs: ExtensionType[] = [
  DocModeService,
  ThemeService,
  FlavourExtension('blank:page'),
  MindmapService,
  ToolController,
  BlockViewExtension('blank:page', literal`mini-mindmap-root-block`),
  FlavourExtension('blank:surface'),
  MindMapView,
  MindmapSurfaceBlockService,
  BlockViewExtension('blank:surface', literal`mini-mindmap-surface-block`),
  TextElementRendererExtension,
  MindmapElementRendererExtension,
  ShapeElementRendererExtension,
  ConnectorElementRendererExtension,
];

export const MiniMindmapSchema: z.infer<typeof BlockSchema>[] = [
  RootBlockSchema,
  SurfaceBlockSchema,
];
