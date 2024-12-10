/* eslint-disable */
// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const { Builder, Browser } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

const EXTENSION_PATH = '../test-extension';
const EXTENSION_ID = 'gjgkofgpcmpfpggbgjgdfaaifcmoklbl';

let driver;

beforeEach(async () => {
  driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(
      new Options()
        .addArguments([
          `--disable-extensions-except=${EXTENSION_PATH}`,
          `--load-extension=${EXTENSION_PATH}`
        ])
        .setBinaryPath(
          '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
        )
    )
    .build();
});

afterEach(async () => {
  await driver.quit();
  driver = undefined;
});

test('returns all window handles', async () => {
  await driver.get(`chrome-extension://${EXTENSION_ID}/page.html`);
  await driver.executeAsyncScript(`
    const callback = arguments[arguments.length - 1];
    chrome.tabs.create({url: 'manifest.json'}).then(callback);
  `);
  await driver.sleep(1000);

  const handles = await driver.getAllWindowHandles();

  if (handles.length !== 2) {
    throw new Error(`Expected 2 windows, got ${handles.length}`);
  }
});
