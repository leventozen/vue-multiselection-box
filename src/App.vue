<template>
  <div id="app">
    <MultiSelectionBox
      :base-list="baseList"
      :selected-list="selectedList"
      @updateBase="baseList = $event"
      @updateSelected="selectedList = $event"
      :isSortable="false"
    />
  </div>
</template>

<script>
import MultiSelectionBox from "@/components/multi-selection-box";

export default {
  name: "app",
  components: {
    MultiSelectionBox
  },
  data: () => ({
    baseList: [
      { id: 1, name: "Person 1" },
      { id: 3, name: "Person 3" },
      { id: 4, name: "Person 4" },
      { id: 5, name: "Person 5" }
    ],
    selectedList: [
      { id: 2, name: "Person 2" },
      { id: 6, name: "Person 6" },
      { id: 7, name: "Person 7" }
    ]
  })
};
</script>

<style></style>
