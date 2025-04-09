import { useInfiniteQuery as useVueInfiniteQuery } from '@tanstack/vue-query'

import type { StandardizedApiError } from '@/api/utils/error-handler'
import type { UseInfiniteQueryOptions } from './use-infinite-query.types'

import { useIndexDB } from '@/libs/composables'

/**
 * Fetching data using this hook doesn't require specifying query function like it's required in vue-query
 * @see https://tanstack.com/query/latest/docs/framework/vue/reference/useInfiniteQuery
 * This hook uses proper querying strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */
export const useInfiniteQuery = <
  TQueryFnData = unknown,
  TError = StandardizedApiError,
  TPageParam = unknown,
>(
  params: UseInfiniteQueryOptions<TQueryFnData, TError, TPageParam>,
) => {
  const { client } = useIndexDB()
  const { queryFn, ...options } = params

  return useVueInfiniteQuery({
    ...options,
    queryFn: queryFn(client.value!),
  })
}
