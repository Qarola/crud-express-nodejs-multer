const { Customer, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Customer model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Customer.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Customer.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      }).timeout(2000);
      it('should work when its a valid name', () => {
        Customer.create({ name: 'Milanesa a la napolitana', email: 'milanesa@email.com' });
      });
    });
    describe('email', () => {
      it('should throw an error if email is null', (done) => {
        Customer.create({ name: 'Milanesa a la napolitana' })
        .then(() => done(new Error('It requires an email')))
        .catch(() => done())
      }).timeout(2000);
      it('should work when its a valid name and email', () => {
        Customer.create({ name: 'Milanesa a la napolitana', email: 'milanesa@email.com'})
      }).timeout(2000);
    });
  });
});

