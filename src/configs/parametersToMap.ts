import { LOCATION } from '../types';

export type ExistenceChecker = (entity: HTMLAnchorElement[]) => boolean;
export type Wrapper = (links: HTMLAnchorElement) => HTMLAnchorElement[];

export interface ParameterToMap {
	locationName: LOCATION;
	selector: 'querySelectorAll' | 'querySelector' | void;
	pathToSelect: string | void;
	pathToInsert?: string ;
	existenceChecker: ExistenceChecker | void;
	wrapper: Wrapper | void;
}

const currentUserLocation = window.location.pathname.replace('/', '');

export const parametersToMap: ParameterToMap[] = [
	{
		/*
			for example: https://github.com/artem-solovev?tab=repositories
		*/
		locationName: LOCATION.USER,
		selector: 'querySelectorAll',
		pathToSelect: '.js-pinned-items-reorder-container ol li a.text-bold.flex-auto.min-width-0',
		pathToInsert: '.wb-break-all',
		existenceChecker: (entity: HTMLAnchorElement[]) => entity && entity.length > 0,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.ORGANIZATION,
		selector: 'querySelectorAll',
		pathToSelect: '.repo-list h3 a',
		existenceChecker: (entity: HTMLAnchorElement[]) => entity && entity.length > 0,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.SEARCH,
		selector: 'querySelectorAll',
		pathToSelect: '.codesearch-results ul li a.v-align-middle',
		existenceChecker: (entity: HTMLAnchorElement[]) => entity && entity.length > 0,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.SINGLE,
		selector: 'querySelector',
		pathToSelect: '.application-main h1 strong a',
		/*
			for example: https://github.com/artem-solovev/gloc
		*/
		pathToInsert: '.public',
		existenceChecker: (entity: HTMLAnchorElement[]) => Boolean(entity),
		wrapper: (entity: HTMLAnchorElement) => [entity],
	},
	{
		locationName: LOCATION.EXPLORE,
		selector: 'querySelectorAll',
		pathToSelect: 'article h1 a.text-bold',
		existenceChecker: (entity: HTMLAnchorElement[]) =>
			currentUserLocation === LOCATION.EXPLORE.toLowerCase() && entity && entity.length > 0,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.TRENDING,
		selector: 'querySelectorAll',
		pathToSelect: 'article h1 a',
		existenceChecker: (entity: HTMLAnchorElement[]) =>
			currentUserLocation === LOCATION.TRENDING.toLowerCase() && entity && entity.length > 0,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		/*
			for example: https://github.com/artem-solovev
		*/
		locationName: LOCATION.PINNED_REPOS,
		selector: 'querySelectorAll',
		pathToSelect: '#user-repositories-list ul li h3 a',
		existenceChecker: (entity: HTMLAnchorElement[]) => entity && entity.length > 0,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.LIKED_REPOS,
		selector: 'querySelectorAll',
		pathToSelect: '.page-profile h3 a',
		existenceChecker: (entity: HTMLAnchorElement[]) => entity && entity.length > 0,
		wrapper: (entity) => Array.prototype.slice.call(entity),
	},
	{
		locationName: LOCATION.UNKNOWN,
		selector: undefined,
		pathToSelect: undefined,
		existenceChecker: undefined,
		wrapper: undefined,
	},
];