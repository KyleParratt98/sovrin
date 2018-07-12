// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyB68mpC9K_kN8JFsHQfcj3TU2lm728CrQk",
    authDomain: "sovrin-transfers.firebaseapp.com",
    databaseURL: "https://sovrin-transfers.firebaseio.com",
    projectId: "sovrin-transfers",
    storageBucket: "sovrin-transfers.appspot.com",
    messagingSenderId: "174927739254"
  }
};