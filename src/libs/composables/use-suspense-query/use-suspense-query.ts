import { useQuery as useVueSuspenseQuery } from '@tanstack/vue-query'

import type { StandardizedApiError } from '@/api/utils/error-handler'

import { useIndexDB } from '@/libs/composables'

import { type UseQueryOptions } from './use-suspense-query.types'

export const useSuspenseQuery = <TQueryFnData = unknown, TError = StandardizedApiError>(
  params: UseQueryOptions<TQueryFnData, TError>,
) => {
  const { client } = useIndexDB()

  const { queryFn, ...options } = params

  const result = useVueSuspenseQuery({
    queryFn: queryFn && ((args) => queryFn(client.value!)(args)),
    ...options,
  })

  return {
    ...result,
    isLoadingAndEnabled: result.isPending.value && result.fetchStatus.value !== 'idle',
  }
}
