import {App, mapStateToProps} from '../containers/App'
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('community', () => {
  let app;

  beforeEach(() => {

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({data: {}})
    }));
    app = mount(<App />);

  });

  it('matches snapshot', () => {
    expect(app).toMatchSnapshot();
  });

  describe('addTodosToState', () => {

    it('updates the state with the todos', async () => {
      app = mount(<App />);
      await app.instance().addTodosToState(['todo1', 'todo2']);
      expect(app.state().todos).toEqual(['todo1', 'todo2'])
    });
  });

});