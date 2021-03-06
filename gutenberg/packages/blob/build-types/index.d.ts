/**
 * Create a blob URL from a file.
 *
 * @param {File} file The file to create a blob URL for.
 *
 * @return {string} The blob URL.
 */
export function createBlobURL(file: File): string;
/**
 * Retrieve a file based on a blob URL. The file must have been created by
 * `createBlobURL` and not removed by `revokeBlobURL`, otherwise it will return
 * `undefined`.
 *
 * @param {string} url The blob URL.
 *
 * @return {File|undefined} The file for the blob URL.
 */
export function getBlobByURL(url: string): File | undefined;
/**
 * Remove the resource and file cache from memory.
 *
 * @param {string} url The blob URL.
 */
export function revokeBlobURL(url: string): void;
/**
 * Check whether a url is a blob url.
 *
 * @param {string} url The URL.
 *
 * @return {boolean} Is the url a blob url?
 */
export function isBlobURL(url: string): boolean;
//# sourceMappingURL=index.d.ts.map