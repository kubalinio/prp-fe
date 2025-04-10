<script setup lang="ts">
import { useGetTaskLists } from '@/libs/composables'
import { data } from './data'
import NavMain from './nav-main.vue'
import NavTaskLists from './nav-task-lists.vue'
import TeamSwitcher from './team-switcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  type SidebarProps,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = defineProps<SidebarProps>()

const { data: taskLists } = useGetTaskLists()
</script>

<template>
  <Sidebar class="border-r-0" v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
      <!-- <ProjectLogo /> -->
      <NavMain :items="data.navMain" />
    </SidebarHeader>

    <SidebarContent>
      <!-- <NavFavorites :favorites="data.favorites" /> -->
      <NavTaskLists :tasks="taskLists?.data ?? []" />
      <!-- <NavSecondary :items="data.navSecondary" class="mt-auto" /> -->
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
