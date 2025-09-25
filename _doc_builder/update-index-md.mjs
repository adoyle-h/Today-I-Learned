/* eslint-disable no-console */

import Path from 'node:path';
import FS from 'node:fs';
import { readFile, writeFile, stat } from 'node:fs/promises';
import pMap from 'p-map';

import json2md from './json2md.mjs'
import { run, scanDir, absPath, relativePath, projectDir, PKG, getDirNames } from './lib.mjs';
import { categoryNameMap } from '../build.config.mjs';

import _debug from 'debug';
const debug = _debug('update:index-md')

const toc = [];

async function createIndexForEachFolder() {
    for (const key in categoryNameMap) {
        const name = categoryNameMap[key];
        try {
            const s = await stat(absPath(key))
            const p2 = absPath(`${key}/README.md`)
            const s2 = await stat(p2)
            let c2 = ''
            if (s2.isFile()) {
                c2 = await readFile(p2)
            }

            if (s.isDirectory()) {
                const content = `---
title: ${name}
---

${c2}
`
                const path = absPath(`${key}/index.md`)
                await writeFile(path, content)
                console.log(`Created file: ${path}`)
            }
        } catch (err) {
            // ignore err
            // console.log(err.stack)
        }
    }
}

function handle(nodes, levelStd, structure) {
    nodes.forEach((node) => {
        if (node.level !== levelStd) { return; }

        const { name, level, intro, children } = node;
        const fileNodes = [];
        const dirNodes = [];

        children.forEach((node) => {
            if (node.isDir) {
                dirNodes.push(node);
            } else {
                if (node.isSymbolicLink) { return; }
                fileNodes.push(node);
            }
        });

        toc.push({ name: node.title, level });
        structure.push({ [`h${level}`]: node.title });
        if (intro) structure.push(intro.trim() + '\n');
        structure.push({ ul: fileNodes.map((n) => `[${n.title}](${relativePath(n.path)})`) });

        return handle(dirNodes, levelStd + 1, structure);
    })
}

run(async () => {
    const dirNames = await getDirNames(projectDir)
    const nodeMap = {};

    const rootNodes = await pMap(
        dirNames,
        (filename) => scanDir(filename, nodeMap, projectDir, null, 2)
    );

    const structure = [
        {
            frontmatter: {
                title: '今天我学了什么 (Today I Learned)',
                description: '博观而约取，厚积而薄发',
            }
        },
        { md: absPath('_docs/intro.md') },
        { md: absPath('_docs/issue.md') },
        // { hr: '' },
        // { h1: '目录' },
    ];

    debug('nodeMap=%O', nodeMap);
    debug('rootNodes=%O', rootNodes);
    // handle(rootNodes, 2, structure);

    const content = await json2md.async(structure);

    const file = absPath('index.md');
    await writeFile(file, content);
    console.log('File Updated: %s', file);

    await createIndexForEachFolder()
});
