/**
 * @flow
 * @format
 */

import { END_FLAG } from '../shared/constants';
import invariant from 'fbjs/lib/invariant';
import renderApplication from './renderApplication';

const runnables = {};

export default {
  registerComponent(appKey,
                    componentProvider) {
    runnables[appKey] = {
      run: appParameters => {
        renderApplication(
          (componentProvider()),
          appParameters.initialProps,
          appParameters.rootTag,
          (appParameters),
        );
      },
    };
    postMessage(END_FLAG);
    return appKey;
  },

  runApplication(appKey, appParameters) {
    const msg =
      'Running application "' +
      appKey +
      '" with appParams: ' +
      JSON.stringify(appParameters);
    console.log(msg);
    invariant(
      runnables[appKey] && runnables[appKey].run,
      'Application ' +
      appKey +
      ' has not been registered.\n\n' +
      "Hint: This error often happens when you're running the packager " +
      '(local dev server) from a wrong folder. For example you have ' +
      'multiple apps and the packager is still running for the app you ' +
      'were working on before.\nIf this is the case, simply kill the old ' +
      'packager instance (e.g. close the packager terminal window) ' +
      'and start the packager in the correct app folder (e.g. cd into app ' +
      "folder and run 'npm start').\n\n" +
      'This error can also happen due to a require() error during ' +
      'initialization or failure to call AppRegistry.registerComponent.\n\n',
    );

    runnables[appKey].run(appParameters);
  },
};
