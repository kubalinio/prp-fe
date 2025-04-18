import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions as UseVueQueryOptions,
} from '@tanstack/vue-query'
import type { IndexDBClient } from '@/api/indexdb'
import type { ExtendedQueryMeta } from '@/api/types/types'
import type { StandardizedApiError } from '@/api/utils/error-handler'

export type UseQueryOptions<TQueryFnData, TError = StandardizedApiError> = Omit<
  UseVueQueryOptions<TQueryFnData, TError>,
  'queryFn'
> & {
  meta?: Partial<ExtendedQueryMeta>
  queryFn: (client: IndexDBClient) => QueryFunction<TQueryFnData>
  queryKey: QueryKey
}

export type GenericQueryOptions<TQueryFnData, TError = StandardizedApiError> = Omit<
  UseQueryOptions<TQueryFnData, TError>,
  'queryKey' | 'queryFn'
>
