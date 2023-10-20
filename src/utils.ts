import { Block } from "./blocks";

export const findBlock = (id: string, block: Block): Block | undefined => {
    if (block.id === id) {
      return block;
    }
    if (block.children && block.children.length > 0) {
      for (const child of block.children) {
        const blockFound = findBlock(id, child);
        if (blockFound) {
          return blockFound;
        }
      }
    }
    return undefined;
  };
  
  export const removeBlock = (id: string, block: Block): Block => {
    if (block.children && block.children.length > 0) {
      block.children = block.children
        .filter((child) => child.id !== id)
        .map((child) => removeBlock(id, child));
    }
  
    return block;
  };
  
  export const findBlockAndParents = (block: Block, childId: string, parenIds: string[]): boolean => {
    if (block.id === childId) {
      return true;
    }
  
    if (block.children && block.children.length > 0) {
      for (const child of block.children) {
        if (findBlockAndParents(child, childId, parenIds)) {
          parenIds.push(block.id);
          return true;
        }
      }
    }
  
    return false;
  };
  
  export const getTypes = (block: Block): string[] => {
    let types: string[] = [];
    if (block && block.type) {
      types.push(block.type);
    }
  
    if (block.children && block.children.length > 0) {
      for (const child of block.children) {
        types = types.concat(getTypes(child));
      }
    }
    return types;
  }