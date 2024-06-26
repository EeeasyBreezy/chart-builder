/// <reference types="@testing-library/cypress" />
/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/cypress/add-commands';
import { buttonValidateAndClick } from './commands/buttonValidateAndClick';
import { textShouldBeVisible } from './commands/textShouldBeVisible';
import { buttonShouldBeDisabled } from './commands/buttonShouldBeDisabled';
import { checkboxShouldBeChecked } from './commands/checkboxShouldBeChecked';
import { getByDataCy } from './commands/getByDataCy';
import { textInputShouldBeDisabled } from './commands/textInputShouldBeDisabled';
import { textInputShouldBeEnabled } from './commands/textInputShouldBeEnabled';
import { textInputShouldHaveValue } from './commands/textInputShouldHaveValue';
import { typeIntoInput } from './commands/typeIntoInput';
import { checkboxShouldNotBeChecked } from './commands/checkBoxShouldNotBeChecked';
import { clearInput } from './commands/clearInput';

Cypress.Commands.add('buttonValidateAndClick', buttonValidateAndClick);
Cypress.Commands.add('textShouldBeVisible', textShouldBeVisible);
Cypress.Commands.add('buttonShouldBeDisabled', buttonShouldBeDisabled);
Cypress.Commands.add('checkboxShouldBeChecked', checkboxShouldBeChecked);
Cypress.Commands.add('checkboxShouldNotBeChecked', checkboxShouldNotBeChecked);
Cypress.Commands.add('getByDataCy', getByDataCy);
Cypress.Commands.add('textInputShouldBeDisabled', textInputShouldBeDisabled);
Cypress.Commands.add('textInputShouldBeEnabled', textInputShouldBeEnabled);
Cypress.Commands.add('textInputShouldHaveValue', textInputShouldHaveValue);
Cypress.Commands.add('typeIntoInput', typeIntoInput);
Cypress.Commands.add('clearInput', clearInput);