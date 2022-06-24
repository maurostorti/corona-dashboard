# Corona Dashboard

## Description

This application was developed for an internship interview for Intel Netherlands.

The Application utilizes the [mathdroid/covid-19-api ](https://github.com/mathdroid/covid-19-api) to display new cases, recovered cases and deaths due to Covid-19.

It also features a searchbar to lookup statistics for a specific country and a graph to see the change in statistics through time.

## Running the project

This application utilizes yarn as package manager, if not installed, follow the guide here: https://yarnpkg.com/getting-started/install.

To run the project, first download the dependencies using the command `yarn`.

Once the dependencies are installed, use the command `yarn start` and open your browser.

The app will run on "http://localhost:3000/" per default.

## Testing

The libraries utilized for testing are: [react-testing-library](https://testing-library.com/) and [nock](https://github.com/nock/nock).

Currently all components have snapshots to make sure the UI does not change unexpectedly.

Because of some troubles in getting the nock library to work, which is needed to mock api responses, App.tsx, the hooks, and the CountrySearchBar component are currently not thoroughly tested.

Because of time constraints, the DOM of CountrySeachBar and GraphRangeDates are not currently tested

To run the tests use the command `yarn test`

## Linting

This project utilizes [eslint](https://eslint.org/) with the AirbnbConfigs as a preset. Further configuration can be done in the package.json.

To run eslint use the command `yarn lint`

## Author

| Name         | Email               |
| ------------ | ------------------- |
| Mauro Storti | maurostorti@live.it |
