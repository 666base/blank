import { PageNotFound } from '@blank/core/desktop/pages/404';
import { CollectionService } from '@blank/core/modules/collection';
import { GlobalContextService } from '@blank/core/modules/global-context';
import { useLiveData, useServices } from '@toeverything/infra';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CollectionDetail } from '../../../views';

export const Component = () => {
  const { collectionService, globalContextService } = useServices({
    CollectionService,
    GlobalContextService,
  });

  const globalContext = globalContextService.globalContext;
  const params = useParams();
  const collection = useLiveData(
    params.collectionId
      ? collectionService.collection$(params.collectionId)
      : null
  );

  useEffect(() => {
    if (collection) {
      globalContext.collectionId.set(collection.id);
      globalContext.isCollection.set(true);

      return () => {
        globalContext.collectionId.set(null);
        globalContext.isCollection.set(false);
      };
    }
    return;
  }, [collection, globalContext]);

  if (!collection) {
    return <PageNotFound />;
  }

  return <CollectionDetail collection={collection} />;
};
