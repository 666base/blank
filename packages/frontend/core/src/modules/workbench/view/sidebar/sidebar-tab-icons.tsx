import {
  ChartPanelIcon,
  CommentIcon,
  ExportIcon,
  FrameIcon,
  PropertyIcon,
  TodayIcon,
  TocIcon,
} from '@blocksuite/icons/rc';
import type { FC, SVGProps } from 'react';

export const sidebarTabIdToIcon: Record<
  string,
  FC<SVGProps<SVGSVGElement>>
> = {
  'all-docs-journal': TodayIcon,
  journal: TodayIcon,
  outline: TocIcon,
  properties: PropertyIcon,
  frame: FrameIcon,
  adapter: ExportIcon,
  comment: CommentIcon,
  analytics: ChartPanelIcon,
};
