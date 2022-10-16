<template>
  <div class="toasts">
    <template v-for="toast in toasts" :key="toast.id">
      <div :class="toast.type == 'success' ? 'toast toast_success' : 'toast toast_error'">
        <ui-icon class="toast__icon" :icon="toast.type == 'success' ? 'check-circle' : 'alert-circle'" />
        <span>{{ toast.message }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'TheToaster',

  components: { UiIcon },

  data() {
    return {
      toasts: [],
      id: 0,
    };
  },

  methods: {
    error(message) {
      this.toasts.push({
        id: this.id,
        message: message,
        type: 'error',
      });

      setTimeout(() => {
        this.toasts.shift();
      }, 5000);

      this.id++;
    },

    success(message) {
      this.toasts.push({
        id: this.id,
        message: message,
        type: 'success',
      });

      setTimeout(() => {
        this.toasts.shift();
      }, 5000);

      this.id++;
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
