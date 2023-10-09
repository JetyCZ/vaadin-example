import '@vaadin/app-layout';
import { AppLayout } from '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/avatar';
import '@vaadin/icon';
import '@vaadin/menu-bar';
import '@vaadin/scroller';
import '@vaadin/side-nav';
import '@vaadin/tabs';
import '@vaadin/tabs/vaadin-tab';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { router } from '../index.js';
import { appStore } from '../stores/app-store.js';
import { Layout } from './view.js';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <header slot="drawer">
          <h1 class="text-l m-0">${appStore.applicationName}</h1>
        </header>
        <vaadin-scroller slot="drawer" scroll-direction="vertical">
          <vaadin-side-nav aria-label="${appStore.applicationName}">
            ${this.getMenuRoutes().map(
              (viewRoute) => html`
                <vaadin-side-nav-item path=${router.urlForPath(viewRoute.path)}>
                  <span
                    class="navicon"
                    style="--mask-image: url('line-awesome/svg/${viewRoute.icon}.svg')"
                    slot="prefix"
                    aria-hidden="true"
                  ></span>
                  ${viewRoute.title}
                </vaadin-side-nav-item>
              `
            )}
          </vaadin-side-nav>
        </vaadin-scroller>

        <footer slot="drawer"></footer>

        <vaadin-drawer-toggle slot="navbar" aria-label="Menu toggle"></vaadin-drawer-toggle>
        <h2 slot="navbar" class="text-l m-0">${appStore.currentViewTitle}</h2>

        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full');
    this.reaction(
      () => appStore.location,
      () => {
        AppLayout.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  private getMenuRoutes(): RouteInfo[] {
    return [
      {
        path: 'contacts',
        title: 'Contacts',
        icon: 'address-book',
      },

      {
        path: 'custom',
        title: 'Custom',
        icon: 'hammer-solid',
      },

      {
        path: 'credit-card-form',
        title: 'Credit Card Form',
        icon: 'credit-card',
      },

      {
        path: 'chat',
        title: 'Chat',
        icon: 'comments',
      },

      {
        path: 'image-list',
        title: 'Image List',
        icon: 'th-list-solid',
      },

      {
        path: 'hello-world',
        title: 'Hello World',
        icon: 'globe-solid',
      },

      {
        path: 'hello-world2',
        title: 'Hello World for Designer',
        icon: 'globe-solid',
      },

      {
        path: 'hello-world-using-hilla',
        title: 'Hello World Using Hilla',
        icon: 'globe-solid',
      },

      {
        path: 'about',
        title: 'About',
        icon: 'file',
      },
    ];
  }
}
