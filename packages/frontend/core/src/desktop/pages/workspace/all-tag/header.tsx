import { ExplorerNavigation } from '@blank/core/components/explorer/header/navigation';
import { Header } from '@blank/core/components/pure/header';

export const AllTagHeader = () => {
  return <Header left={<ExplorerNavigation active={'tags'} />} />;
};
