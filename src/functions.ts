import { Block } from './blocks';
import { findBlock, removeBlock, findBlockAndParents } from './utils';

export const getImageURLs = (block: Block): string[] => {
  let imageURLs: string[] = [];

  if (block.type === 'Image' && block.options && block.options.url && typeof block.options.url === 'string') {
    imageURLs.push(block.options.url);
  }

  if (block.children && block.children.length > 0) {
    block.children.forEach((child) => {
      imageURLs = imageURLs.concat(getImageURLs(child));
    });
  }
  return imageURLs;
};

export const modifyBlocks = (block: Block, idToMove: string, idToModify: string): Block => {
  const blockToMove = findBlock(idToMove, block);
  const blockToModify = findBlock(idToModify, block);

  block = removeBlock(idToMove, block);

  if (!blockToMove) throw new Error("Block to be moved cannot be found");
  if (!blockToModify) throw new Error("Block to be modified cannot be found");

    if (blockToModify.children) {
      blockToModify.children.push(blockToMove!);
    } else {
      blockToModify.children = [];
      blockToModify.children.push(blockToMove!);
    }

  return block;
};

export const findParentIds = (blocks: Block, id: string): string[] | boolean => {
  const parentIds: string[] = [];
  const found = findBlockAndParents(blocks, id, parentIds);
  return found ? parentIds.reverse() : false;
}

export const removeBlocksByType = (block: Block | null, typeToRemove: string): Block | null => {
  if (!block) {
    return null;
  }

  if (block.type === typeToRemove) {
    return null;
  }

  if (block.children && block.children.length > 0) {
    const filteredChildren = block.children
      .map(child => removeBlocksByType(child, typeToRemove)) as Block[];
    const finalChildrenList = filteredChildren.filter(child => child !== null) as Block[];

    return { ...block, children: finalChildrenList };
  }
  return block;
};

export const displayBlockStructure = (block: Block, spacing: number = 0) : void => {
  const spacingForDisplay = ' '.repeat(spacing);
  console.log(`${spacingForDisplay}${block.id} : ${block.type}`)
  if (block.children && block.children.length > 0) {
    for (const child of block.children) {
      displayBlockStructure(child, spacing + 1);
    }
  }
}