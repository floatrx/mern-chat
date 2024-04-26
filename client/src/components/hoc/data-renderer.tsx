import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { ReactNode } from 'react';

import type { SerializedError } from '@reduxjs/toolkit';

import { Spinner } from '@/components/ui/spinner';

export type DataBoundaryProps<Item> = {
  data?: Item[] | undefined;
  render?: (item: Item, idx: number) => ReactNode; // pass a render function to render the items
  name?: string; // name of the items (e.g. "Tags")
  isLoading: boolean; // if the query is 1st loading
  error?: FetchBaseQueryError | SerializedError | undefined;
  isFetching?: boolean; // if the query is fetching or re-fetching data
  children?: ReactNode; // extra children to render
  className?: string; // extra class name
};

/**
 * Handle data loading, error and rendering
 * @param isLoading - boolean
 * @param data - array of items
 * @param render - render function
 * @param children - extra children
 * @param name - name of the items (e.g. "Tags")
 * @param error - error object
 * @param className - extra class name
 * @constructor
 * @example
 *      export const UserList = () => (
 *        <DataRenderer
 *          className="grid-auto"
 *          render={(user) => <UserCardItem key={user.id} user={user} />}
 *          {...useSearchUsersQuery()} // <- fully compatible with RTKQ hooks
 *        />
 *      );
 */
export const DataRenderer = <Item,>({ isLoading, data, render, children, name, error, className }: DataBoundaryProps<Item>) => {
  // Wait for the data to load
  if (isLoading) return <Spinner spinning />;

  // If there is an error, display it
  if (error) return <div className="p-2">An error has occurred: {JSON.stringify(error)}</div>;

  return !data?.length ? (
    <p>{name || 'Items'} not found or not added yet.</p>
  ) : (
    <div className={className}>
      {isLoading && <p>Loading...</p>}
      {render && data?.map(render)}
      {children}
    </div>
  );
};
