# formsy-blueprintjs

This library is a wrapper for [BlueprintJS](http://blueprintjs.com/) form components to allow them to be used
with [formsy-react](https://github.com/christianalfoni/formsy-react), a form validation component for React forms.

## Installation

To and install formsy-blueprintjs and add it to your `package.json`, run:

```
$ npm install --save formsy-blueprintjs
```

You will also need to add formsy-react if not already installed:

```
$ npm install --save formsy-react
```

## Usage

### ES6 Imports

```js
import {FormsyCheckbox} from 'formsy-blueprintjs/lib/formsyCheckbox';
import {FormsyDateInput} from 'formsy-blueprintjs/lib/formsyDateInput';
import {FormsyDateInputPicker} from 'formsy-blueprintjs/lib/formsyDateInputPicker';
import {FormsySelect} from 'formsy-blueprintjs/lib/formsySelectField';
import {FormsyRadioGroup} from 'formsy-blueprintjs/lib/formsyRadioGroup';
import {FormsyText} from 'formsy-blueprintjs/lib/formsyTextField';
import {FormsySwitch} from 'formsy-blueprintjs/lib/formsySwitch';
```

OR:

```js
import { FormsyCheckbox, FormsyDateInput, FormsyDateInputPicker, FormsySelect, FormsyRadioGroup, FormsyText, FormsySwitch} from 'formsy-blueprintjs/lib';
```

### Examples
Short examples on how it can be used.

#### Checkbox
```jsx
import {FormsyCheckbox} from 'formsy-blueprintjs/lib/formsyCheckbox';

<FormsyCheckbox required name='isAdmin' label='Administrator' />
```

#### Date Input
```jsx
import {FormsyDateInput} from 'formsy-blueprintjs/lib/formsyDateInput';

<FormsyDateInput required name='expireDate' label='Expire Date' />
```

#### Selects
```jsx
import {FormsySelect} from 'formsy-blueprintjs/lib/formsySelectField';

const movies = [{title: 'Gladiator', value: 0}, {title: 'The Matrix', value: 1}];

<FormsySelect required initialValue={0} name='movieId' label='Movies'>
  {movies}
</FormsySelect>
```

#### Radio Groups
```jsx
import {FormsyRadioGroup} from 'formsy-blueprintjs/lib/formsyRadioGroup';

const movies = [{title: 'Gladiator', value: 0}, {title: 'The Matrix', value: 1}];

<FormsyRadioGroup required initialValue={1337} name='movieId' label='Movies'>
  {movies}
</FormsyRadioGroup>
```

#### Text Field Input
```jsx
import {FormsyText} from 'formsy-blueprintjs/lib/formsyTextField';

<FormsyText required name='email' validations='isEmail' validationError='This is not an email' placeholder='Example; test@test.com' label='Email' />
```

#### Switch
```jsx
import {FormsySwitch} from 'formsy-blueprintjs/lib/formsySwitch';

<FormsySwitch required name='updateMovies' label='Update Movies' />
```

### Available Props
Most of these components share props, these are available.

```
Common Props
  label:            string    The label/text of the component.
  inline:           bool      Controls if the input should be inline, or not.
  fill:             bool      The component tries to fill it's parent width.
  disabled:         bool      Controls if the component is disabled or not.
  name:             string    Used by formsy-react.
  value:            varies    For an controlled component.

FormsyCheckbox
  initialValue:     string    Controls if the checkbox is checked by default.

FormsyDateInput
  initialValue:     string    The default value of the component, should be a valid date.
  placeholder:      string    The placeholder text or value.
  maxDate:          string    The maxdate available for selection, should be a valid date.
  minDate:          string    The maxdate available for selection, should be a valid date.

FormsySelect
  initialValue:     number    The initial selected option in the select input.
  placeholder:      string    The placeholder text or value.
  leftIconName:     string    A valid BlueprintJS icon name.

FormsyRadioGroup
  initialValue:     number    The initial selected option in the radio group.
  placeholder:      string    The placeholder text or value.
  leftIconName:     string    A valid BlueprintJS icon name.
  style:            object

FormsyText
  initialValue:     number    The initial text of the component.
  type:             string    The input type, for example 'text' or 'password'.
  placeholder:      string    The placeholder text or value.
  leftIconName:     string    A valid BlueprintJS icon name.
  rightElement:     element   A valid component to display, for example an <Button />
  inputRef:         element 

FormsySwitch
  initialValue:     string    Controls if the switch is checked by default.

```

## Known Issues

See [issues](https://github.com/orecus/formsy-blueprintjs/issues).

## Release History

See [CHANGELOG.md](https://github.com/orecus/formsy-blueprintjs/blob/master/CHANGELOG.md)

## Acknowledgements

Based on [Formsy-Material-UI](https://github.com/mbrookes/formsy-material-ui).