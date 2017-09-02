import React from 'react';
import findDOMNode from 'react-dom';
import { shallow, mount } from 'enzyme';

import Stub from '../src/FormsyStub';
import FormsyDateInput from '../src/formsyDateInput';

describe('FormsyDateInput -> Props', () => {
  const component = mount(<Stub>{() => <FormsyDateInput required inline fill disabled name='closeDate' label='Close Date' minDate='2017-01-01' maxDate='2017-12-31' initialValue='2017-06-06' />}</Stub>);

  // console.log(component.find(FormsyDateInput).debug());

  it('label', () => {
    expect(component.find('.pt-label').text()).toEqual('Close Date');
  });

  it('required', () => {
    expect(component.find(FormsyDateInput).prop('required')).toEqual(true);
  });

  it('inline', () => {
    expect(component.find(FormsyDateInput).prop('inline')).toEqual(true);
  });

  it('fill', () => {
    expect(component.find(FormsyDateInput).prop('fill')).toEqual(true);
  });

  it('name', () => {
    expect(component.find(FormsyDateInput).prop('name')).toEqual('closeDate');
  });

  it('initialValue', () => {
    expect(component.find(FormsyDateInput).prop('initialValue')).toEqual('2017-06-06');
  });

  it('minDate', () => {
    expect(component.find(FormsyDateInput).prop('minDate')).toEqual('2017-01-01');
  });

  it('maxDate', () => {
    expect(component.find(FormsyDateInput).prop('maxDate')).toEqual('2017-12-31');
  });
});

describe('FormsyDateInput -> Classes', () => {
  const component = mount(<Stub>{() => <FormsyDateInput required fill name='closeDate' label='Close Date' minDate='2017-01-01' maxDate='2017-12-31' initialValue='2017-06-06' />}</Stub>);

  it('inline', () => {
    expect(component.find('.pt-label').hasClass('pt-inline')).toEqual(false);
  });

  it('fill', () => {
    expect(component.find('.pt-label').hasClass('pt-fill')).toEqual(true);
  });

  it('disabled', () => {
    expect(component.find('.pt-label').hasClass('pt-disabled')).toEqual(false);
  });
});
