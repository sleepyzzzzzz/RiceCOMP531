import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
global.fetch = require('jest-fetch-mock');
configure({ adapter: new Adapter() });