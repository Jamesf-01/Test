// Copyright 2021 TestProject (https://testproject.io)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { By, Capabilities } from 'selenium-webdriver';

import logger from '../../src/logger/logger';
import AndroidDriver from '../../src/sdk/drivers/mobile/androidDriver';
import MobileBuilder from '../../src/sdk/drivers/mobileBuilder';

describe('Basic Android Test', () => {
  let driver: AndroidDriver;

  before(async () => {
    driver = await new MobileBuilder(AndroidDriver)
      .withReportName('androidTest')
      .withCapabilities(
        new Capabilities({
          udid: 'emulator-5554',
          app: 'https://github.com/testproject-io/android-demo-app/raw/master/APK/testproject-demo-app.apk',
        })
      )
      .build();
  });

  beforeEach(async () => {
    await driver?.resetApp();
  });

  after(async () => {
    await driver?.quit();
  });

  it('Simple Login', async () => {
    const name = await driver.findElement(By.id('name'));
    await name.sendKeys('John Smith');

    const pass = await driver.findElement(By.id('password'));
    await pass.sendKeys('12345');

    const login = await driver.findElement(By.id('login'));
    await login.click();
  });

  it('Login and Logout', async () => {
    const name = await driver.findElement(By.id('name'));
    await name.sendKeys('Some Name');
    await name.clear();
    await name.sendKeys('John Smith');

    const pass = await driver.findElement(By.id('password'));
    await pass.sendKeys('12345');

    const login = await driver.findElement(By.id('login'));
    logger.debug(`login button enabled: ${(await login.isEnabled()) ? 'true' : 'false'}`);
    await login.click();

    // Hide the keyboard
    await driver.hideKeyboard();

    const logout = await driver.findElement(By.id('logout'));
    await logout.click();
  });
});
