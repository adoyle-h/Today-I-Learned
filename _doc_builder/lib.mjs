import Path from 'node:path';

import {lstat as getStat, readFile, readdir, writeFile} from 'node:fs/promises';
import pMap from 'p-map';

import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
export const projectDir = Path.resolve(__filename, '../../');

// import PKG from '../package.json' with { type: 'json' };
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
export const PKG = require('../package.json' );


import {ignoreDirs, categoryNameMap} from '../build.config.mjs';

export const absPath = (...paths) => Path.resolve(projectDir, ...paths);
export const relativePath = (path) => Path.relative(projectDir, path);
export const toCamelCase = (str) => str
    .replace(/\s(.)/g, ($1) => $1.toUpperCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, ($1) => $1.toUpperCase());

async function getTitle(path) {
    const content = await readFile(path, {encoding: 'utf8'});
    const matched = content.match(/##? (.+)/);
    if (!matched) return '';

    let title = matched[1];
    title = title.replace(/\[(.*?)\]/g, (_m, p) => p);

    return title;
}

export async function scanDir(dirName, nodeMap, parentPath, _parent, level = 3) {
    const dirPath = absPath(parentPath, dirName);
    const filenames = await readdir(dirPath);
    const children = [];

    const curNode = nodeMap[dirPath] = nodeMap[dirPath] || {
        name: dirName,
        path: dirPath,
        title: categoryNameMap[dirName] || toCamelCase(dirName),
        isDir: true,
        intro: undefined,
        level, children,
        parent: undefined,
    };

    await pMap(filenames, async (filename, index) => {
        const curPath = absPath(dirPath, filename);
        const stats = await getStat(curPath)

        if (stats.isSymbolicLink()) {
          children[index] = {
            name: dirName,
            path: curPath,
            title: '',
            isDir: false,
            isSymbolicLink: true,
            intro: undefined,
            level,
            children: [],
            parent: curNode,
          };
          return;
        }

        if (stats.isFile()) {
            if (filename.toLowerCase() === 'readme.md') {
                curNode.intro = await readFile(curPath, {encoding: 'utf8'});
                return;
            }

            return getTitle(curPath).then((title) => {
                children[index] = {
                  name: dirName,
                  path: curPath,
                  title,
                  isDir: false,
                  intro: undefined,
                  level,
                  children: [],
                  parent: curNode,
                };
            });
        } else if (stats.isDirectory()) {
            const subNode = await scanDir(filename, nodeMap, dirPath, curNode, level + 1);
            subNode.parent = curNode;
            children[index] = subNode;
        } else {
            // ignore
        }
    });

    curNode.children = children.filter((n) => n)

    return curNode;
}

export async function getDirNames(dir) {
    const filenames = await readdir(dir);

    let dirNames = filenames.filter((name) =>
        !name.startsWith('_') && !name.startsWith('.')
        && (!ignoreDirs.includes(name)));

    dirNames = await pMap(dirNames, async (dirName) => {
        const stats = await getStat(absPath(dirName));
        return stats.isDirectory() ? dirName : null;
    })

    return dirNames.filter((name) => name);
}


export async function run(func) {
    try {
        await func();
    } catch(err) {
        console.error('[failed] Error stack: %s', err.stack);
        process.exit(1);
    }
}
