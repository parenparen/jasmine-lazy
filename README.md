# jasmine-lazy
Lazy load context variables for jasmine specs (similar to rspec let for ruby specs).

Forked from https://github.com/jthibeaux/jasmine-lazy and updated to support ES6 and npm.

## Usage

```
import lazy from 'jasmine-lazy';
import subject from './path/to/subject.js';

describe('lazy', function (){
  lazy('context', function () {
    return 'original';
  });

  it('sets context', function () {
    expect(context).toEqual('original')
  });

  describe('context changed', function () {
    lazy('context', function () {
      return 'new';
    });

    it('returns changed context', function () {
      expect(context).toEqual('new');
    });
  });

  describe('references another context', function () {
    lazy('otherContext', function () {
      return 'other';
    });

    lazy('context', function () {
      return otherContext;
    });

    it('returns context with referenced value', function () {
      expect(context).toEqual('other');
    });
  });
});
```
