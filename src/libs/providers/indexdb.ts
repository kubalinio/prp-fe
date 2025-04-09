import type { IndexDBClient } from '@/api/indexdb'

import type { Ref, InjectionKey } from 'vue'

import { getDB } from '@/api/indexdb'
import { seedDatabaseIfEmpty } from '@/api/utils/seed-data'
import { ref } from 'vue'

const dbClient = ref<IndexDBClient | null>(null)
const isDbLoading = ref<boolean>(true)
const dbError = ref<Error | null>(null)

// 2. Define Injection Keys for type safety
export const IndexDBClientKey: InjectionKey<Ref<IndexDBClient | null>> = Symbol('IndexDBClient')
export const IndexDBLoadingKey: InjectionKey<Ref<boolean>> = Symbol('IndexDBLoading')
export const IndexDBErrorKey: InjectionKey<Ref<Error | null>> = Symbol('IndexDBError')

// 3. Initialization function
async function initializeDB() {
  isDbLoading.value = true
  dbClient.value = null
  dbError.value = null
  try {
    if (import.meta.env.MODE === 'test' || typeof indexedDB === 'undefined') {
      console.log('Skipping IndexedDB initialization in this environment.')
      isDbLoading.value = false
      return
    }
    const db = await getDB()
    // Ensure we have initial data in the database
    await seedDatabaseIfEmpty()
    dbClient.value = db
    console.log('IndexedDB initialized successfully in main.ts')
  } catch (err) {
    console.error('Failed to initialize IndexDB in main.ts:', err)
    dbError.value = err instanceof Error ? err : new Error('Failed to initialize IndexDB')
  } finally {
    isDbLoading.value = false
  }
}

export { initializeDB }
