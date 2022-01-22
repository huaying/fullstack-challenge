import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Article = {
  __typename?: 'Article';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Timestamp']>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle?: Maybe<Article>;
  createLoginNonce?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['JWT']>;
};


export type MutationCreateArticleArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationCreateLoginNonceArgs = {
  userId: Scalars['ID'];
};


export type MutationLoginArgs = {
  signature: Scalars['String'];
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles?: Maybe<Array<Maybe<Article>>>;
};


export type QueryArticleArgs = {
  articleId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryArticlesArgs = {
  userId: Scalars['ID'];
};

export type CreateLoginNonceMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type CreateLoginNonceMutation = { __typename?: 'Mutation', createLoginNonce?: string | null | undefined };

export type LoginMutationVariables = Exact<{
  userId: Scalars['ID'];
  signature: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: any | null | undefined };


export const CreateLoginNonceDocument = gql`
    mutation CreateLoginNonce($userId: ID!) {
  createLoginNonce(userId: $userId)
}
    `;
export type CreateLoginNonceMutationFn = Apollo.MutationFunction<CreateLoginNonceMutation, CreateLoginNonceMutationVariables>;

/**
 * __useCreateLoginNonceMutation__
 *
 * To run a mutation, you first call `useCreateLoginNonceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLoginNonceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLoginNonceMutation, { data, loading, error }] = useCreateLoginNonceMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateLoginNonceMutation(baseOptions?: Apollo.MutationHookOptions<CreateLoginNonceMutation, CreateLoginNonceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLoginNonceMutation, CreateLoginNonceMutationVariables>(CreateLoginNonceDocument, options);
      }
export type CreateLoginNonceMutationHookResult = ReturnType<typeof useCreateLoginNonceMutation>;
export type CreateLoginNonceMutationResult = Apollo.MutationResult<CreateLoginNonceMutation>;
export type CreateLoginNonceMutationOptions = Apollo.BaseMutationOptions<CreateLoginNonceMutation, CreateLoginNonceMutationVariables>;
export const LoginDocument = gql`
    mutation Login($userId: ID!, $signature: String!) {
  login(userId: $userId, signature: $signature)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;