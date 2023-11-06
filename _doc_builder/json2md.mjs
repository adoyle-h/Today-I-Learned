import json2md from 'json2md';
import {readFile} from 'node:fs/promises';

json2md.converters.text = async (text) => {
    return text;
}

json2md.converters.ul = async (array) => {
    return `- ${array.join('\n- ')}`;
};

json2md.converters.md = async (filepath) => {
    return await readFile(filepath, {encoding: 'utf8'});
};

json2md.converters.toc = ({contents, type}) => {
    let tocStr;

    if (type === 'html') {
        const lastParent = {};

        const makeLink = (name) => `<a href="#${encodeURI(name.toLowerCase())}">${name}</a>`;

        const makeUI = () => ({
            children: [],
            toString(parentSpaces = '') {
                const {children} = this;
                const spaces = parentSpaces.repeat(2);
                const childStr = children.map((n) => n.toString(spaces)).join('\n');
                return `${parentSpaces}<ul>
${childStr}
${parentSpaces}</ul>`;
            },
        });

        const makeLI = ({name, level}) => ({
            name, level,
            children: [],
            toString(parentSpaces = '') {
                const {name, children} = this;
                const spaces = parentSpaces.repeat(2);

                if (children.length === 0) {
                    return `${parentSpaces}<li>${makeLink(name)}</li>`;
                } else {
                    const childStr = children.map((n) => n.toString(spaces)).join('\n');
                    return `${parentSpaces}<li>
${parentSpaces}  ${makeLink(name)}
${parentSpaces}  <ul>
${childStr}
${parentSpaces}  </ul>
${parentSpaces}</li>`;
                }
            },
        });

        const ui = makeUI();
        contents.forEach((c) => {
            const {level} = c;
            const li = makeLI(c);

            if (lastParent[level - 1]) {
                lastParent[level - 1].children.push(li);
            }
            lastParent[level] = li;

            if (level === 2) ui.children.push(li);
        });

        tocStr = ui.toString('  ');
    } else if (type === 'markdown') {
        const indent = 2;
        const ul = '-';
        const headers = [];
        const space = ' '.repeat(indent);
        const usedHeaders = {};
        contents.forEach((c) => {
            const {name, level} = c;
            let anchor = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/-+$/, '');
            const usedHeader = usedHeaders[anchor];
            if (usedHeader) {
                usedHeaders[anchor] = usedHeader + 1;
                anchor = `${anchor}-${usedHeader}`;
            } else {
                usedHeaders[anchor] = 1;
            }
            const header = `${space.repeat(level - 2)}${ul} [${name}](#${anchor})`;
            headers.push(header);
        });

        tocStr = headers.join('\n');
    }

    return `## TOC

<!-- toc -->
<!-- <details close> -->
<!-- <summary>点击展开/折叠目录</summary> -->

${tocStr}

<!-- </details> -->
<!-- tocstop -->`;
};

export default json2md;
