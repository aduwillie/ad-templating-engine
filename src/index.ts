import { IMatchReplace } from './interfaces';

declare const module: any;

const resolveReplace = (pattern: string, data: any) => {
    if (pattern.indexOf('.') < 0) {
        return data[pattern];
    } else {
        let returnValue: any;
        const splitDataParts = pattern.split('.')
            .forEach(val => {
                if(!returnValue) returnValue = data[val];
                else returnValue = returnValue[val];
            });
        return returnValue;
    }
};

const getTemplatePatternMatches = (template: string, data: any) => {
    const re = /{{([^{}]+)?}}/g;
    let matches: Array<IMatchReplace> = [];
    let match;
    while ((match = re.exec(template))) {
        matches.push({
            match: match[0],
            replace:  resolveReplace(match[1].trim(), data),
        });
    }
    return matches;
};

const templatingEngine = (template: string, data: Object) => {
    const templateMatches = getTemplatePatternMatches(template, data);
    let clonedTemplate = template;
    console.log('Template Matches', templateMatches);
    templateMatches.forEach(match => clonedTemplate = clonedTemplate.replace(match.match, match.replace));
    return clonedTemplate;
};

module.exports = {
    templatingEngine,
    getTemplatePatternMatches
};
