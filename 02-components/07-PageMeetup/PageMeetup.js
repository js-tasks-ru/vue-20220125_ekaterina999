import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from './../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  fetchMeetupById,

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
      default: 1,
    },
  },

  data() {
    return {
      meetup: null,
      errorMes: '',
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(newV) {
        this.meetup = null;
        this.errorMes = null;
        fetchMeetupById(newV).then(
          (meetup) => {
            this.meetup = meetup;
          },
          (meetup) => {
            this.errorMes = meetup.message;
          },
        );
      },
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <ui-container v-if="errorMes">
        <ui-alert>{{ errorMes }}</ui-alert>
      </ui-container>
      <ui-container v-else-if="!meetup">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>
      <meetup-view v-else :meetup="meetup"></meetup-view>
    </div>
    `,
});
