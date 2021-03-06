const choose = require('./choose.js');
const messageStub = require('../stub/messageStub');


test('Returns the correct message when no arguments are passed', async () => {
	// Arrange
	const message = new messageStub();

	// Act
	const responseMessage = await choose.execute(null, message, []);

	// Assert
	const expectedResponse = 'Please specify the options I should choose from!\nHint: !choose option1, option2, ..., optionX';
	expect(responseMessage).toBe(expectedResponse);
});

test('Returns the correct message when partial input is passed', async () => {
	// Arrange
	const message = new messageStub();

	// Act
	const responseMessage = await choose.execute(null, message, [',', 'Knights']);

	// Assert
	const expectedResponse = 'Choices cannot be empty!';
	expect(responseMessage).toBe(expectedResponse);
});

test('Parses weird input correctly', async () => {
	// Arrange
	const message = new messageStub();
	const mockMath = Object.create(global.Math);
	mockMath.random = () => 0;

	global.Math = mockMath;

	// Act
	const responseMessage = await choose.execute(null, message, ['Knights',
		'of',
		'Academia,,,,,,,,,,',
		'Academia',
		'of',
		'Knights']
	);

	// Assert
	const expectedResponse = 'Horace says... Knights of Academia!';
	expect(responseMessage).toBe(expectedResponse);
});

test('Returns the correct choice at an index 0', async () => {
	// Arrange
	const message = new messageStub();
	const mockMath = Object.create(global.Math);
	mockMath.random = () => 0;

	global.Math = mockMath;

	// Act
	const responseMessage = await choose.execute(null, message, ['Knights', 'of', 'Academia,', 'Academia', 'of', 'Knights']);

	// Assert
	const expectedResponse = 'Horace says... Knights of Academia!';
	expect(responseMessage).toBe(expectedResponse);
});

test('Returns the correct choice at an index 1', async () => {
	// Arrange
	const message = new messageStub();
	const mockMath = Object.create(global.Math);
	mockMath.random = () => 0.5;

	global.Math = mockMath;

	// Act
	const responseMessage = await choose.execute(null, message, ['Knights', 'of', 'Academia,', 'Academia', 'of', 'Knights']);

	// Assert
	const expectedResponse = 'Horace says... Academia of Knights!';
	expect(responseMessage).toBe(expectedResponse);
});