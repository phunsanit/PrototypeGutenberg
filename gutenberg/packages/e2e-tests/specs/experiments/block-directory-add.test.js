/**
 * WordPress dependencies
 */
import {
	createNewPost,
	searchForBlock,
	setUpResponseMocking,
	getEditedPostContent,
	createJSONResponse,
} from '@wordpress/e2e-test-utils';
/**
 * Internal dependencies
 */
import { enableExperimentalFeatures } from '../../experimental-features';

// Urls to mock
const SEARCH_URLS = [
	'/__experimental/block-directory/search',
	`rest_route=${ encodeURIComponent(
		'/__experimental/block-directory/search'
	) }`,
];

const INSTALL_URLS = [
	'/__experimental/block-directory/install',
	`rest_route=${ encodeURIComponent(
		'/__experimental/block-directory/install'
	) }`,
];

// Example Blocks
const MOCK_BLOCK1 = {
	name: 'block-directory-test-block/main-block',
	title: 'Block Directory Test Block',
	description: 'This plugin is useful for the block.',
	id: 'block-directory-test-block',
	rating: 0,
	rating_count: 0,
	active_installs: 0,
	author_block_rating: 0,
	author_block_count: 1,
	author: 'No Author',
	icon: 'block-default',
	assets: [
		'fake_url.com/block.js', // we will mock this
	],
	humanized_updated: '5 months ago',
};

const MOCK_BLOCK2 = {
	...MOCK_BLOCK1,
	name: 'block-directory-test-block/secondary-block',
	title: 'Block Directory Test Block - Pt Deux',
	id: 'block-directory-test-secondary-block',
};

// Block that will be registered
const block = `( function() {
	var registerBlockType = wp.blocks.registerBlockType;
	var el = wp.element.createElement;

	registerBlockType( '${ MOCK_BLOCK1.name }', {
		title: 'Test Block for Block Directory',
		icon: 'hammer',
		category: 'common',
		attributes: {},
		edit: function( props ) {
			return el( 'p', null, 'Test Copy' );
		},
		save: function() {
			return null;
		},
	} );
} )();`;

const MOCK_EMPTY_RESPONSES = [
	{
		match: ( request ) => matchUrl( request.url(), SEARCH_URLS ),
		onRequestMatch: createJSONResponse( [] ),
	},
];

const MOCK_BLOCKS_RESPONSES = [
	{
		// Mock response for search with the block
		match: ( request ) => matchUrl( request.url(), SEARCH_URLS ),
		onRequestMatch: createJSONResponse( [ MOCK_BLOCK1, MOCK_BLOCK2 ] ),
	},
	{
		// Mock response for install
		match: ( request ) => matchUrl( request.url(), INSTALL_URLS ),
		onRequestMatch: createJSONResponse( { success: true } ),
	},
	{
		// Mock the response for the js asset once it gets injected
		match: ( request ) => request.url().includes( MOCK_BLOCK1.assets[ 0 ] ),
		onRequestMatch: createResponse(
			Buffer.from( block, 'utf8' ),
			'application/javascript; charset=utf-8'
		),
	},
];

function getResponseObject( obj, contentType ) {
	return {
		status: 200,
		contentType,
		body: obj,
	};
}

function createResponse( mockResponse, contentType ) {
	return async ( request ) =>
		request.respond( getResponseObject( mockResponse, contentType ) );
}

const matchUrl = ( reqUrl, urls ) => {
	return urls.some( ( el ) => reqUrl.indexOf( el ) >= 0 );
};

describe( 'adding blocks from block directory', () => {
	beforeEach( async () => {
		await enableExperimentalFeatures( [ '#gutenberg-block-directory' ] );
		await createNewPost();
	} );

	it( 'Should show an empty state when no plugin is found.', async () => {
		// Be super weird so there won't be a matching block installed
		const impossibleBlockName = '@#$@@Dsdsdfw2#$@';

		// Return an empty list of plugins
		await setUpResponseMocking( MOCK_EMPTY_RESPONSES );

		// Search for the block via the inserter
		await searchForBlock( impossibleBlockName );

		const selectorContent = await page.evaluate(
			() =>
				document.querySelector( '.block-editor-inserter__block-list' )
					.innerHTML
		);
		expect( selectorContent ).toContain( 'has-no-results' );
	} );

	it( 'Should be able to add (the first) block.', async () => {
		// Setup our mocks
		await setUpResponseMocking( MOCK_BLOCKS_RESPONSES );

		// Search for the block via the inserter
		await searchForBlock( MOCK_BLOCK1.title );

		// Grab the first block in the list -> Needs to be the first one, the mock response expects it.
		const addBtn = await page.waitForSelector(
			'.block-directory-downloadable-blocks-list li:first-child button'
		);

		// Add the block
		await addBtn.click();

		// Delay to let block script load
		await new Promise( ( resolve ) => setTimeout( resolve, 100 ) );

		// The block will auto select and get added, make sure we see it in the content
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
