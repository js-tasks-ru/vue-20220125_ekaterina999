import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupDescription from './../02-MeetupDescription/MeetupDescription.js';
import MeetupCover from './../03-MeetupCover/MeetupCover.js';
import MeetupInfo from './../04-MeetupInfo/MeetupInfo.js';
import MeetupAgendaItem from './../05-MeetupAgenda/MeetupAgendaItem.js';
import MeetupAgenda from './../05-MeetupAgenda/MeetupAgenda.js';
import MeetupView from './../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  fetchMeetupById,

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgendaItem,
    MeetupAgenda,
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
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(newV) {
        this.meetup = null;
        fetchMeetupById(newV).then(
          (meetup) => {
            this.meetup = meetup;
          },
          (meetup) => {
            this.meetup = 'error';
          },
        );
      },
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <ui-container v-if="meetup === 'error'">
        <ui-alert>Test Error</ui-alert>
      </ui-container>
      <ui-container v-else-if="!meetup">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>
      <meetup-view v-else :meetup="meetup"></meetup-view>
    </div>
    `,
});
