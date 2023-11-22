import { useQuery } from '@apollo/client';
import { gql } from '@sb/webapp-api-client';
import { FC } from 'react';

export const workshopItemsListQuery = gql(/* GraphQL */ `
  query WorkshopItemsList {
    allWorkshopItems {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);

export const WorkshopItemsList: FC = () => {
  const { data, loading } = useQuery(workshopItemsListQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {data?.allWorkshopItems?.edges?.map((edge) => {
        return <li key={edge?.node?.id}>{edge?.node?.name}</li>;
      })}
    </ul>
  );
};
