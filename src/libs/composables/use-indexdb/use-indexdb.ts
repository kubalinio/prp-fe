import { ref } from 'vue'

import type { IndexDBClient } from '@/api/indexdb'
import { getDB } from '@/api/indexdb'

function useIndexDB() {
  const client = ref<IndexDBClient | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const initializeDB = async () => {
    isLoading.value = true
    error.value = null

    try {
      const db = await getDB()
      client.value = db
    } catch (err) {
      console.error('Failed to initialize IndexDB:', err)
      error.value = err instanceof Error ? err : new Error('Failed to initialize IndexDB')
    } finally {
      isLoading.value = false
    }
  }

  // Initialize DB on composable creation
  initializeDB()

  return {
    client,
    isLoading,
    error,
    initializeDB, // Expose this to allow retrying
  }
}

export { useIndexDB }
