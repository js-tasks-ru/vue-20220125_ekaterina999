<template>
  <div class="toasts">
    <template v-for="toast in toasts" :key="toast.message">
      <div v-if="toast.show && toast.type === 'success'" class="toast toast_success">
        <ui-icon class="toast__icon" icon="check-circle" />
        <span>{{ toast.message }}</span>
      </div>

      <div v-else-if="toast.show && toast.type === 'error'" class="toast toast_error">
        <ui-icon class="toast__icon" icon="alert-circle" />
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
        show: true,
      });
      setTimeout(this.setTime, 5000, this.id);
      this.id++;
    },

    success(message) {
      this.toasts.push({
        id: this.id,
        message: message,
        type: 'success',
        show: true,
      });
      setTimeout(this.setTime, 5000, this.id);
      this.id++;
    },

    setTime(toastId) {
      this.toasts[toastId].show = false;
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
