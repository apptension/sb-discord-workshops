import { useMutation } from '@apollo/client';
import { gql } from '@sb/webapp-api-client';
import { useApiForm } from '@sb/webapp-api-client/hooks';
import { Input } from '@sb/webapp-core/components/forms';
import { FC } from 'react';

import { WorkshopItemFields } from './workshopItemCreate.types';

export const workshopItemCreateMutation = gql(/* GraphQL */ `
  mutation WorkshopItemCreateMutation($input: WorkshopItemCreateMutationInput!) {
    createWorkshop(input: $input) {
      workshopItem {
        id
        name
      }
    }
  }
`);

export const WorkshopItemCreate: FC = () => {
  const { form, setApolloGraphQLResponseErrors } = useApiForm<WorkshopItemFields>({
    defaultValues: {
      name: '',
    },
  });

  const [commitWorkshopItemCreateMutation] = useMutation(workshopItemCreateMutation);

  const onSubmit = async (formData: WorkshopItemFields) => {
    const { data, errors } = await commitWorkshopItemCreateMutation({
      variables: {
        input: {
          name: formData.name,
        },
      },
      onError(error) {
        setApolloGraphQLResponseErrors(error.graphQLErrors);
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('name')} error={form.formState?.errors?.name?.message} />
    </form>
  );
};
