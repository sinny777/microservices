// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

// if (environment.production) {
// 	enableProdMode();
// }

// platformBrowserDynamic()
// 	.bootstrapModule(AppModule)
// 	.catch(err => console.log(err));
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { hmrBootstrap } from './hmr';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

console.log('HMR: >> ', environment.hmr);

if (environment.hmr && !environment.production) {
  if (module['hot']) {
    module['hot'].accept();
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
    bootstrap().catch(err => console.log(err));
  }
} else {
  bootstrap().catch(err => console.log(err));
}

