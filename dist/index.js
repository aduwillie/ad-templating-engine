"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolveReplace = (pattern, data) => {
    if (pattern.indexOf('.') < 0) {
        return data[pattern];
    }
    else {
        let returnValue;
        const splitDataParts = pattern.split('.')
            .forEach(val => {
            if (!returnValue)
                returnValue = data[val];
            else
                returnValue = returnValue[val];
        });
        return returnValue;
    }
};
const getTemplatePatternMatches = (template, data) => {
    const re = /{{([^{}]+)?}}/g;
    let matches = [];
    let match;
    while ((match = re.exec(template))) {
        matches.push({
            match: match[0],
            replace: resolveReplace(match[1].trim(), data),
        });
    }
    return matches;
};
const templatingEngine = (template, data) => {
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
