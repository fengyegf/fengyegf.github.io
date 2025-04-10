<template>
  <div :class="alertClasses" role="alert">
    <svg
      v-if="showIcon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="h-6 w-6 shrink-0 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        :d="svgPath"
      />
    </svg>
    <span v-html="content"></span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
    validator: (value) =>
      ["info", "warning", "success", "error"].includes(value.toLowerCase()),
  },
  variant: {
    type: String,
    default: "",
    validator: (value) => ["", "soft", "dash"].includes(value),
  },
  content: {
    type: String,
    required: true,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
});

const alertClasses = computed(() => {
  const classes = ["alert", `alert-${props.type.toLowerCase()}`];

  if (props.variant) {
    classes.push(`alert-${props.variant}`);
  }

  return classes;
});

const svgPath = computed(() => {
  switch (props.type.toLowerCase()) {
    case "info":
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
    case "warning":
      return "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z";
    case "success":
      return "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
    case "error":
      return "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z";
    default:
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
  }
});
</script>
