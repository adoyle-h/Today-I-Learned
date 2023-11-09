/* eslint-disable no-console */

import Path from 'node:path';
import FS from 'node:fs';
import {readFile, writeFile} from 'node:fs/promises';
import pMap from 'p-map';

import json2md from './json2md.mjs'
import {run, scanDir, absPath, relativePath, projectDir, PKG, getDirNames} from './lib.mjs';

import _debug from 'debug';
const debug = _debug('update:readme')

const toc = [];

function handle(nodes, levelStd, structure) {
    nodes.forEach((node) => {
        if (node.level !== levelStd) { return; }

        const {name, level, intro, children} = node;
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

        toc.push({name: node.title, level});
        structure.push({[`h${level}`]: node.title});
        if (intro) structure.push(intro.trim() + '\n');
        structure.push({ul: fileNodes.map((n) => `[${n.title}](${relativePath(n.path)})`)});
        structure.push({text: '[`⬆ 返回目录`](#toc)'});

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
        {h1: '今天我学了什么 (Today I Learned)'},
        {blockquote: PKG.description},
        {md: absPath('_docs/intro.md')},
        {md: absPath('_docs/issue.md')},
        {md: absPath('_docs/license.md')},
        {toc: {contents: toc, type: 'markdown'}},
    ];

    debug('nodeMap=%O', nodeMap);
    debug('rootNodes=%O', rootNodes);
    handle(rootNodes, 2, structure);

    const content = await json2md.async(structure);

    const file = absPath('README.md');
    await writeFile(file, content);
    console.log('File Updated: %s', file);
});
