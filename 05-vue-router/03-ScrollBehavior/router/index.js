import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/PageMeetupDescription'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/PageMeetupAgenda'),
        },
      ],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    } else if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
      return {};
    } else if (from.meta.saveScrollPosition) {
      return { top: 0, left: 0 };
    }

    return savedPosition || { top: 0, left: 0 };
  },
});
