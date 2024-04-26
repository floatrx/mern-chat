import { useEffect } from 'react';
import { useParams } from 'react-router';

import { SITE_NAME } from '@/config/const';
import { upperFirst } from '@/lib/utils';

export const useDocumentTitle = (title: string | undefined, path?: string): void => {
  const { id } = useParams();

  useEffect(() => {
    if (!title) return;
    const docTitle = path?.match(/:id$/g) ? `${id} • ${title}` : title;
    document.title = `${docTitle === '/' ? 'Home' : upperFirst(docTitle)} • ${SITE_NAME}`;
  }, [title, path, id]);
};
