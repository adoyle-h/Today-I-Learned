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

const debugHandle = _debug('update:meta:handle')

async function handle(nodes) {
    debugHandle('nodes=%O', nodes)

    await pMap(nodes, async (node) => {
        if (node.isDir) {
          await createIndexFileForJTD(node)
        } else {
            const fh = await FSP.open(node.path, 'r+');  // why readfile with "w+" return empty?

            // https://just-the-docs.com/docs/navigation-structure/
            const ymlFront = `---
layout: default
${node.parent ? `parent: ${node.parent.title}` : ''}
${node?.parent.parent ? `grand_parent: ${node.parent.parent.title}` : ''}
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

            console.log(`Added YAML front: ${node.path}`)
        }

        return handle(node.children);
    })
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

    await handle(rootNodes);

    console.log('Metadata Updated');
});
