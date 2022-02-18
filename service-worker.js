const { response } = require("express");

var cacheName = 'petstore-v1';
var cacheFiles = [
'index.html',
'product.js',
'petstore.webmanifest',
'images/catfood.png',
'images/yarn.jpg',
'images/litter.jpg',
'images/cat.jpg',
'images/icon-store-512.png'

];

self.addEventListener('install' ,(e) =>{
    console.log('[Service Worker] Install'); 
    e.waitUntil( 
        caches.open(cacheName).then((cache) =>{
        console.log('[Service Worker] Caching all the files');
        return cache.addAll(cacheFiles); 
    })
    );
 });

 self.addEventListener('fetch', function (e){
     e.respondWith(
         caches.match(e.request).then(function (r){
             console.log('[Service Worker] Fetching resource: ' + e.request.url);
             return r
         })
     );
 });

 self.addEventListener('fetch', function(e){
     e.respondWith(
         caches.match(e.request).then(function (r){
             return r || fetch(e.request).then(function (response){
                 return cache.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                 })
             })
         })
     )      
 })