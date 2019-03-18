addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

/*
 * Rewrites the request URL to match behaviour on Cloudfront
 * @param {Request} request
 */
async function handleRequest(request) {
  //console.log('Got request', request)
  console.log('Original Request URL: ', request.url);

  const alternate_url = request.url
    // -----------------------------
    // Stage site 
    // Stage blog with pre-production data links to Production Blog
    .replace('https://wpstage.deputec.com/blog','http://wpblog.deputec.com/blog')
    .replace('https://wpstage.deputec.com/customers','http://wpblog.deputec.com/customers')
    .replace('https://wpstage.deputec.com/author','http://wpblog.deputec.com/author')
    .replace('https://wpstage.deputec.com/press','http://wpblog.deputec.com/press')

    // Hubspot fakery
    .replace('https://wpstage.deputec.com/cs/','https://deputy-3040938.hs-sites.com/')
    .replace('https://wpstage.deputec.com/hs/','https://deputy-3040938.hs-sites.com/')
    .replace('https://wpstage.deputec.com/hs-fs/','https://deputy-3040938.hs-sites.com/')
    .replace('https://wpstage.deputec.com/lp/','https://deputy-3040938.hs-sites.com/')
    .replace('https://wpstage.deputec.com/_hcms/','https://deputy-3040938.hs-sites.com/')

    // -----------------------------
    // Dev site links to Dev blog
    .replace('https://wordpress-dev.deputec.com/blog','http://wpblog_dev.deputec.com/blog')
    .replace('https://wordpress-dev.deputec.com/customers','http://wpblog_dev.deputec.com/customers')
    .replace('https://wordpress-dev.deputec.com/author','http://wpblog_dev.deputec.com/author')
    .replace('https://wordpress-dev.deputec.com/press','http://wpblog_dev.deputec.com/press');

  console.log('Updated Request URL: ', alternate_url);
  
  const response = await fetch(alternate_url, request);
  //console.log('Got response from URL: ', response)
  return response;
}
