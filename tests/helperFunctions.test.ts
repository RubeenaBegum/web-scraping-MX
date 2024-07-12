import { askQuestion } from '../scraper'; // Adjust the import path based on your project structure
import * as readline from 'readline';

jest.mock('readline');

describe('askQuestion', () => {
  it('should prompt the user and resolve the answer', async () => {
    const mockCreateInterface = readline.createInterface as jest.Mock;
    const mockQuestion = jest.fn().mockImplementation((query, callback) => callback('test answer'));
    mockCreateInterface.mockReturnValue({ question: mockQuestion, close: jest.fn() });

    const answer = await askQuestion('Test question: ');
    expect(answer).toBe('test answer');
  });
});
