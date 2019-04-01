addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

/*
 * Rewrites the request URL to match behaviour on Cloudfront
 * @param {Request} request
 */
async function handleRequest(request) {
  //console.log('Got request', request)

  let alternate_url = my_rewrite_function(request.url);
  
  let response = await fetch(alternate_url, request);

  // Copy the response so that we can modify headers.
  response = new Response(response.body, response)

  if (request.url !== alternate_url) {
    console.log('Original Request URL: ', request.url);
    console.log('Updated Request URL: ', alternate_url);
    response.headers.set("X-Debug", alternate_url);
  } else {
    response.headers.set("X-Debug", request.url + ' (NC)');
  }
  
  return response;
}

/**
 * Utility function with URL mappings.
 */
function my_rewrite_function(original_url)
{
  return original_url
    // -----------------------------
    // Stage site 
    // Stage blog with pre-production data links to Production Blog
    .replace('https://wpstage.deputec.com/haoran','http://wpblog_dev.deputec.com/blog')
    .replace('https://wpstage.deputec.com/blog','http://wpblog.deputec.com/blog')
    .replace('https://wpstage.deputec.com/customers','http://wpblog.deputec.com/customers')
    .replace('https://wpstage.deputec.com/author','http://wpblog.deputec.com/author')
    .replace('https://wpstage.deputec.com/press','http://wpblog.deputec.com/press')
    .replace('https://wpstage.deputec.com/s3assets/', 'http://deputy-www-assets.s3.amazonaws.com/')


    // // Hubspot fakery
    .replace('https://wpstage.deputec.com/cs/','https://deputy-3040938.hs-sites.com/')
    .replace('https://wpstage.deputec.com/hs/','https://deputy-3040938.hs-sites.com/')
    .replace('https://wpstage.deputec.com/hs-fs/','https://deputy-3040938.hs-sites.com/')
    .replace('https://wpstage.deputec.com/lp/','https://deputy-3040938.hs-sites.com/')
    .replace('https://wpstage.deputec.com/_hcms/','https://deputy-3040938.hs-sites.com/')

    // -----------------------------
    // Dev site links to Dev blog
    .replace('http://wordpress-dev.deputec.com/blog','http://wpblog_dev.deputec.com/blog')
    .replace('http://wordpress-dev.deputec.com/customers','http://wpblog_dev.deputec.com/customers')
    .replace('http://wordpress-dev.deputec.com/author','http://wpblog_dev.deputec.com/author')
    .replace('http://wordpress-dev.deputec.com/press','http://wpblog_dev.deputec.com/press')

    // // Hubspot fakery
    .replace('http://wordpress-dev.deputec.com/cs/','https://deputy-3040938.hs-sites.com/')
    .replace('http://wordpress-dev.deputec.com/hs/','https://deputy-3040938.hs-sites.com/')
    .replace('http://wordpress-dev.deputec.com/hs-fs/','https://deputy-3040938.hs-sites.com/')
    .replace('http://wordpress-dev.deputec.com/lp/','https://deputy-3040938.hs-sites.com/')
    .replace('http://wordpress-dev.deputec.com/_hcms/','https://deputy-3040938.hs-sites.com/')
    ;
}