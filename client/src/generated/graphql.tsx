import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AddAvailabilityInput = {
  id: Scalars['String'],
  from: Scalars['String'],
  to: Scalars['String'],
  available: Scalars['Boolean'],
  uncertain: Scalars['Boolean'],
};

export type AddTemplateInput = {
  from: Scalars['String'],
  to: Scalars['String'],
  weekday: Scalars['Int'],
};

export type Availability = {
   __typename?: 'Availability',
  id: Scalars['ID'],
  from: Scalars['String'],
  to: Scalars['String'],
  available: Scalars['Boolean'],
  uncertain: Scalars['Boolean'],
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  addAvailability: Availability,
  changeAvailability: Availability,
  addTemplate: Template,
};


export type MutationAddAvailabilityArgs = {
  data: AddAvailabilityInput
};


export type MutationChangeAvailabilityArgs = {
  data: AddAvailabilityInput
};


export type MutationAddTemplateArgs = {
  data: AddTemplateInput
};

export type Organization = {
   __typename?: 'Organization',
  id: Scalars['ID'],
  name: Scalars['String'],
  locale?: Maybe<Scalars['String']>,
  weekStartsOn?: Maybe<Scalars['Int']>,
  admin: User,
  users: Array<User>,
  templates: Array<Template>,
};

export type Query = {
   __typename?: 'Query',
  mapped?: Maybe<Array<Availability>>,
  overview: Array<Availability>,
  organizations?: Maybe<Array<Organization>>,
  templates?: Maybe<Array<Template>>,
  me: User,
};


export type QueryMappedArgs = {
  startDate: Scalars['String']
};


export type QueryOverviewArgs = {
  startDate: Scalars['String']
};

export type Template = {
   __typename?: 'Template',
  id: Scalars['ID'],
  fromHours: Scalars['Int'],
  fromMinutes: Scalars['Int'],
  toHours: Scalars['Int'],
  toMinutes: Scalars['Int'],
  weekday: Scalars['Int'],
  organization: Organization,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  locale: Scalars['String'],
  organization?: Maybe<Organization>,
  availabilities: Array<Availability>,
};

export type MappedQueryVariables = {
  date: Scalars['String']
};


export type MappedQuery = { __typename?: 'Query', mapped: Maybe<Array<{ __typename?: 'Availability', id: string, from: string, to: string, available: boolean, uncertain: boolean }>> };

export type OverviewQueryVariables = {
  date: Scalars['String']
};


export type OverviewQuery = { __typename?: 'Query', overview: Array<{ __typename?: 'Availability', id: string, from: string, to: string, available: boolean, uncertain: boolean, user: { __typename?: 'User', id: string, name: string } }> };

export type TemplatesQueryVariables = {};


export type TemplatesQuery = { __typename?: 'Query', templates: Maybe<Array<{ __typename?: 'Template', id: string, fromHours: number, fromMinutes: number, toHours: number, toMinutes: number, weekday: number }>> };


export const MappedDocument = gql`
    query Mapped($date: String!) {
  mapped(startDate: $date) {
    id
    from
    to
    available
    uncertain
  }
}
    `;

/**
 * __useMappedQuery__
 *
 * To run a query within a React component, call `useMappedQuery` and pass it any options that fit your needs.
 * When your component renders, `useMappedQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMappedQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useMappedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MappedQuery, MappedQueryVariables>) {
        return ApolloReactHooks.useQuery<MappedQuery, MappedQueryVariables>(MappedDocument, baseOptions);
      }
export function useMappedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MappedQuery, MappedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MappedQuery, MappedQueryVariables>(MappedDocument, baseOptions);
        }
export type MappedQueryHookResult = ReturnType<typeof useMappedQuery>;
export type MappedLazyQueryHookResult = ReturnType<typeof useMappedLazyQuery>;
export type MappedQueryResult = ApolloReactCommon.QueryResult<MappedQuery, MappedQueryVariables>;
export const OverviewDocument = gql`
    query overview($date: String!) {
  overview(startDate: $date) {
    id
    from
    to
    available
    uncertain
    user {
      id
      name
    }
  }
}
    `;

/**
 * __useOverviewQuery__
 *
 * To run a query within a React component, call `useOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverviewQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useOverviewQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OverviewQuery, OverviewQueryVariables>) {
        return ApolloReactHooks.useQuery<OverviewQuery, OverviewQueryVariables>(OverviewDocument, baseOptions);
      }
export function useOverviewLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OverviewQuery, OverviewQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OverviewQuery, OverviewQueryVariables>(OverviewDocument, baseOptions);
        }
export type OverviewQueryHookResult = ReturnType<typeof useOverviewQuery>;
export type OverviewLazyQueryHookResult = ReturnType<typeof useOverviewLazyQuery>;
export type OverviewQueryResult = ApolloReactCommon.QueryResult<OverviewQuery, OverviewQueryVariables>;
export const TemplatesDocument = gql`
    query templates {
  templates {
    id
    fromHours
    fromMinutes
    toHours
    toMinutes
    weekday
  }
}
    `;

/**
 * __useTemplatesQuery__
 *
 * To run a query within a React component, call `useTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTemplatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TemplatesQuery, TemplatesQueryVariables>) {
        return ApolloReactHooks.useQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, baseOptions);
      }
export function useTemplatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TemplatesQuery, TemplatesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, baseOptions);
        }
export type TemplatesQueryHookResult = ReturnType<typeof useTemplatesQuery>;
export type TemplatesLazyQueryHookResult = ReturnType<typeof useTemplatesLazyQuery>;
export type TemplatesQueryResult = ApolloReactCommon.QueryResult<TemplatesQuery, TemplatesQueryVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    