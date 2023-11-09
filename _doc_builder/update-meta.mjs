/* eslint-disable no-console */

import {Buffer} from 'node:buffer';
import Path from 'node:path';
import FS from 'node:fs';
import FSP from 'node:fs/promises';
import {readFile, writeFile} from 'node:fs/promises';
import pMap from 'p-map';

import {run, scanDir, absPath, projectDir, PKG, getDirNames} from './lib.mjs';

import _debug from 'debug';
const debug = _debug('update:meta')

async function createIndexFileForJTD(node) {
    const indexFilepath = Path.join(node.path, 'index.md')

    const content = await readFile(Path.join(node.path, 'README.md')).catch((_err) => {
      return '';
    });

    await writeFile(indexFilepath, `---
layout: default
title: ${node.title}
has_children: true
${node.parent ? `parent: ${node.parent.title}` : ''}
---

${content}`)

  console.log(`Writed: ${indexFilepath}`)
}

const debugHandle = _debug('update:meta:handle');

const symlinkMap = {};

async function handleSymlinks(nodes) {
    await pMap(nodes, async (node) => {
        if (node.isDir) {
          return handleSymlinks(node.children);
        }
        if (!node.isSymbolicLink) { return ; }

        symlinkMap[node.path] = true;

        // https://just-the-docs.com/docs/navigation-structure/
        const ymlFrontRaw = [
          '---',
          'layout: default',
          'nav_exclude: true',  // symlink document should hide in nav_bar
        ]

        if (node.parent) {
          ymlFrontRaw.push(`parent: ${node.parent.title}`);
          if (node.parent.parent) {
            ymlFrontRaw.push(`grand_parent: ${node.parent.parent.title}`);
          }
        }

        ymlFrontRaw.push('---', '', '');

        let fh = await FSP.open(node.path, 'r+');  // why readfile with "w+" return empty?
        const buffer = await fh.readFile();
        await fh.close()
        await FSP.unlink(node.path);
        fh = await FSP.open(node.path, 'w+');

        try {
          const stream = fh.createWriteStream({start: 0});
          await new Promise((resolve) => {
              stream.write(ymlFrontRaw.join('\n'), 'utf8', resolve);
          })
          await new Promise((resolve) => {
              stream.write(buffer, 'utf8', resolve);
          })
        } finally {
          await fh.close();
        }

        console.log(`Added YAML front: ${node.path}`)
    })
}

async function handle(nodes) {
    debugHandle('nodes=%O', nodes)

    await pMap(nodes, async (node) => {
        if (node.isDir) {
          await createIndexFileForJTD(node)
          return handle(node.children);
        }

        if (symlinkMap[node.path]) { return ; }

        // https://just-the-docs.com/docs/navigation-structure/
        const ymlFrontRaw = [
          '---',
          'layout: default',
        ]

        if (node.parent) {
          ymlFrontRaw.push(`parent: ${node.parent.title}`);
          if (node.parent.parent) {
            ymlFrontRaw.push(`grand_parent: ${node.parent.parent.title}`);
          }
        }

        ymlFrontRaw.push('---', '', '');

        const fh = await FSP.open(node.path, 'r+');  // why readfile with "w+" return empty?

        try {
          const buffer = await fh.readFile();
          const stream = fh.createWriteStream({start: 0});
          await new Promise((resolve) => {
              stream.write(ymlFrontRaw.join('\n'), 'utf8', resolve);
          })
          await new Promise((resolve) => {
              stream.write(buffer, 'utf8', resolve);
          })
        } finally {
          await fh.close();
        }

        console.log(`Added YAML front: ${node.path}`)
    })
}

async function updateREADME() {
    const fh = await FSP.open(absPath('README.md'), 'r+');  // why readfile with "w+" return empty?

    const ymlFront = `---
title: Home
nav_order: 1
---

`;

    try {
      const buffer = await fh.readFile();
      const stream = fh.createWriteStream({start: 0});
      await new Promise((resolve) => {
          stream.write(ymlFront, 'utf8', resolve);
      })
      await new Promise((resolve) => {
          stream.write(buffer, 'utf8', resolve);
      })
    } finally {
      await fh.close();
    }
}

run(async () => {
    const dirNames = await getDirNames(projectDir)
		const nodeMap = {};

    const rootNodes = await pMap(
        dirNames,
        (filename) => scanDir(filename, nodeMap, projectDir, null, 2)
    );

    debug('nodeMap=%O', nodeMap);
    debug('rootNodes=%O', rootNodes);

    await handleSymlinks(rootNodes);
    await handle(rootNodes);
    await updateREADME();

    console.log('Metadata Updated');
});
