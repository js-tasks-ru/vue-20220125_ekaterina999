import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  agendaItemDefaultTitles,
  agendaItemIcons,

  props: {
    agendaItem: {
      type: Object,
      requaired: true,
    },
  },

  computed: {
    agendaTitle() {
      return this.agendaItem.title ? this.agendaItem.title : agendaItemDefaultTitles[this.agendaItem.type];
    },

    agendaIcon() {
      return '/assets/icons/icon-' + agendaItemIcons[this.agendaItem.type] + '.svg';
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="agendaIcon" :alt="agendaIcon" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaTitle }}</h3>
        <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
