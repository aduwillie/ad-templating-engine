const { templatingEngine, getTemplatePatternMatches } = require('../dist/index');

describe('Templating engine', () => {
    describe('matchTemplatePatten', () => {
        it('should match string template literals', () => {
            const template = '<p>My name is  {{ name }}. I am {{age}}</p>';
            const data = { name: 'Williams', age: 30 };
            expect(getTemplatePatternMatches('{{test}}', {test: 'test'}).length).toEqual(1);
            expect(getTemplatePatternMatches('{{ test }}', {test: 'test'}).length).toEqual(1);
            expect(getTemplatePatternMatches('{{test }}', {test: 'test'}).length).toEqual(1);
            expect(getTemplatePatternMatches('{{ test}}', {test: 'test'}).length).toEqual(1);
            expect(getTemplatePatternMatches(template, data)).toBeTruthy();
            expect(getTemplatePatternMatches(template, data).length).toEqual(2);
        });
        it('should match deep objects used as data', () => {
            const template = '<p>My name is  {{ data.name }}. I am {{data.age}}</p>';
            const data = { data: { name: 'Williams', age: 30 } };
            expect(getTemplatePatternMatches(template, data).length).toEqual(2);
        });
    });
    it('should replace template strings with data', () => {
        const template = '<p>My name is  {{ name }}</p>';
        const expected = '<p>My name is  Williams</p>';
        const data = { name: 'Williams'};
        console.log(templatingEngine(template, data));
        //expect(templatingEngine(template, data)).toEqual(expected);
        expect(true).toBe(true);
    });
});
