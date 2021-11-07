/*
 * Test suite for articles
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;
let cookie;

describe('Validate Article functionality', () => {


    it('should give me three or more articles', (done) => {
        fetch(url('/articles'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(res => {
            if (res instanceof Array)
                expect(res.length).toBeGreaterThan(2);
            done();
        });
    });
});
