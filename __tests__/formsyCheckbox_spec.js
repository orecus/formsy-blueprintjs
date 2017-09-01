import React from 'react';
import findDOMNode from 'react-dom';
import { shallow, mount } from 'enzyme';

import Stub from '../src/FormsyStub';
import FormsyCheckbox from '../src/formsyCheckbox';

describe('FormsyCheckbox -> Props', () => {
  const component = mount(<Stub>{ () => <FormsyCheckbox required inline fill disabled name='isAdmin' label='Administrator' defaultChecked /> }</Stub>);
  // console.log(checkbox.find(FormsyCheckbox).debug());

  it('label', () => {
    expect(component.find('.pt-checkbox').text()).toEqual('Administrator');
  });

  it('required', () => {
    expect(component.find(FormsyCheckbox).prop('required')).toEqual(true);
  });

  it('inline', () => {
    expect(component.find(FormsyCheckbox).prop('inline')).toEqual(true);
  });

  it('fill', () => {
    expect(component.find(FormsyCheckbox).prop('fill')).toEqual(true);
  });

  it('name', () => {
    expect(component.find(FormsyCheckbox).prop('name')).toEqual('isAdmin');
  });

  it('defaultChecked', () => {
    expect(component.find(FormsyCheckbox).prop('defaultChecked')).toEqual(true);
  });
});
