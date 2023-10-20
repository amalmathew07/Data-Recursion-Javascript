import { blocks } from "./blocks";
import { displayBlockStructure, findParentIds, getImageURLs, modifyBlocks, removeBlocksByType } from "./functions";

const blocksToModify = JSON.parse(JSON.stringify(blocks));
const blocksForTypeFilter = JSON.parse(JSON.stringify(blocks));

const imageURLs = getImageURLs(blocks);
console.log(imageURLs);

const modifiedBlock = modifyBlocks(blocksToModify, 'vKC8kvnPDsDSFYVEXRut2W-column1', '5fprgzZ56EuHSb7m4Kk5tr');
console.log(modifiedBlock);

const findParents = findParentIds(blocks,'vKC8kvnPDsDSFYVEXRut2W-column1');
console.log(findParents);

const typeFilter = removeBlocksByType(blocksForTypeFilter,'Image');
console.log(typeFilter);

displayBlockStructure(blocks);