const expect = require('chai').expect;
const helper = require('../test-helper');

const endpointHelper = helper.serverEndpoint;

describe('Information', () => {
  before(() =>
    endpointHelper.visit()
  );

  it('should be successful', () =>
    expect(endpointHelper.browser.status).to.equal(200)
  );

  it('should return expected values in json response', () => {
    expect(endpointHelper.getJsonResponse().ip)
      .to.equal(endpointHelper.getOsHostname());
    expect(endpointHelper.getJsonResponse().connecturl)
      .to.equal(`${endpointHelper.getOsHostname()}:25565`);
    expect(endpointHelper.getJsonResponse().motd)
      .to.equal('A Minecraft Server');
  });
});