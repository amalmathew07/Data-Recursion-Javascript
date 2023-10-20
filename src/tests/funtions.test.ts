import { Block, blocks } from '../blocks';
import { displayBlockStructure, findParentIds, getImageURLs, modifyBlocks, removeBlocksByType } from '../functions';
import { getTypes } from '../utils';

describe('Block Functions', () => {
  describe('Image Url Extraction', () => {
    it('should return list of imageUrls if the block or the children has image type and the url is present', () => {
      const imageURLs = getImageURLs(blocks);
      const expectedImageUrls = [
        'https://cdn.example.org/k.png',
        'https://cdn.example.org/a.jpg',
        'https://cdn.example.org/c.jpg',
        'https://cdn.example.org/t.png',
        'https://cdn.example.org/x.gif',
        'https://cdn.example.org/p.jpg',
        'https://cdn.example.org/z.jpg',
      ];
      expect(imageURLs).toEqual(expectedImageUrls);
    });
    it('should return empty array if no block with type image is present', () => {
      const mockBlockWithoutImage: Block = {
        type: 'Column',
        id: '5fprgzZ56EuHSb7m4Kk5tr',
        options: {},
        children: [
          {
            type: 'PlainText',
            id: 'ea3rb4fdUAjbeestD9bmKc',
            options: {},
            children: [],
            data: {
              text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam dictum felis id metus tristique sollicitudin eu commodo sapien. Sed ornare egestas justo, sollicitudin tristique ipsum lobortis at.\n',
            },
          },
        ],
      };
      const imageURLs = getImageURLs(mockBlockWithoutImage);
      expect(imageURLs.length).toEqual(0);
    });
  });

  describe('Modify block functionality', () => {
    const blocksToModify = JSON.parse(JSON.stringify(blocks));
    it('should return the modified list with block to be moved placed as the last child of the modified block', () => {
      const newBlock = modifyBlocks(blocksToModify, 'vKC8kvnPDsDSFYVEXRut2W-column1', '5fprgzZ56EuHSb7m4Kk5tr');
      expect(newBlock.children![newBlock.children?.length! - 1].id).toEqual('vKC8kvnPDsDSFYVEXRut2W-column1');
    });

    it('should throw an error if block to be moved cannot be found', () => {
      expect(() => modifyBlocks(blocksToModify, 'idToMove', 'idToModify')).toThrowError('Block to be moved cannot be found');
    });

    it('should throw an error if block to be modified cannot be found', () => {
      expect(() => modifyBlocks(blocksToModify, 'vKC8kvnPDsDSFYVEXRut2W-column1', 'idToModify')).toThrowError(
        'Block to be modified cannot be found'
      );
    });
  });

  describe('Extract parent Ids block functionality', () => {
    it('should return the parent ids from list of blocks when a target id passed in', () => {
      const parentIds = findParentIds(blocks, 'vKC8kvnPDsDSFYVEXRut2W-column1');
      expect(parentIds).toEqual(["5fprgzZ56EuHSb7m4Kk5tr", "vKC8kvnPDsDSFYVEXRut2W"]);
    });

    it('should return false if block cannot be found', () => {
      const parentIds = findParentIds(blocks, '12345');
      expect(parentIds).toBeFalsy();
    });
  });

  describe('Remove blocks by type', () => {
    const blocksToModify = JSON.parse(JSON.stringify(blocks));
    it('should return the blocks which have allowed types', () => {
      const modifiedBlocks = removeBlocksByType(blocksToModify, 'Image');
      const types = getTypes(modifiedBlocks!);
      expect(types).not.toContain('Image');
    });

    it('should return null if type matches root block', () => {
      const modifiedBlocks = removeBlocksByType(blocksToModify, 'Column');
      expect(modifiedBlocks).toBe(null);
    });
  });
  describe('displayBlockStructure', () => {
    it('should display block structure with correct spacing', () => {
      const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      displayBlockStructure(blocks);
      
      expect(consoleLogMock).toHaveBeenCalledWith('5fprgzZ56EuHSb7m4Kk5tr : Column');
      expect(consoleLogMock).toHaveBeenCalledWith('  2m4WRKVtwL5R9mmQDoQCNK-column0 : Column');
      expect(consoleLogMock).toHaveBeenCalledTimes(21);
    });
  });
});
