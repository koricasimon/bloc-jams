 // Example Album
 var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { name: 'Blue', length: '4:26' },
         { name: 'Green', length: '3:14' },
         { name: 'Red', length: '5:01' },
         { name: 'Pink', length: '3:21'},
         { name: 'Magenta', length: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', length: '1:01' },
         { name: 'Ring, ring, ring', length: '5:01' },
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?', length: '3:14' },
         { name: 'Wrong phone number', length: '2:15'}
     ]
 };

 // Third Example Album
 var albumWalking = {
     name: 'Walking on a Dream',
     artist: 'Empire of the Sun',
     label: 'EM',
     year: '2008',
     albumArtUrl: 'assets/images/album_covers/02.png',
     songs: [
         { name: 'Walking on a Dream', length: '3:28' },
         { name: 'Delta Bay', length: '2:01' },
         { name: 'We are the People', length: '4:21'},
         { name: 'Without You?', length: '2:14' },
         { name: 'Standing on the Shore', length: '3:16'}
     ]
 };

var createSongRow = function (songNumber, songName, songLength) {
     
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return $(template);
 
 };

     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

var setCurrentAlbum = function(album) {
    
     
     $albumTitle.text(album.name);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     
     $albumSongList.empty();
 
     
     for (i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
     }
 
 };

var child = document.getElementsByClassName('album-view-title')[0];
var noParent = document.querySelector('html');

var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    
    if (currentParent) {
         while (currentParent.className && currentParent.className != targetClass) {
            currentParent = currentParent.parentElement;
         }
        
        if (currentParent.className == targetClass) {
            return currentParent;
        } else {
            alert("No parent with that class found.");
        }
    } else {
        alert("No parent found.");
    }
};

findParentByClassName(child, 'album-view');

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

 var clickHandler = function(targetElement) {

     var songItem = getSongItem(targetElement);

     if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }

 };

//Elements to which we'll be adding listerners
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>'; 
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//Store state of playing songs
var currentlyPlayingSong = null;

 window.onload = function() {
   
     setCurrentAlbum(albumPicasso);
     
     songListContainer.addEventListener("mouseover", function(event) {
         if (event.target.parentElement.className === 'album-view-song-item') {
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             var songItem = getSongItem(event.target);

           if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
               songItem.innerHTML = playButtonTemplate;
           }
         }
     });
     
     for (i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener("mouseleave", function(event) {
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
         
         songRows[i].addEventListener("click", function(event) {
             clickHandler(event.target);
         });
     }
     
     var albums = [albumPicasso, albumMarconi, albumWalking]; 
     var index = 1;
     albumImage.addEventListener("click", function(event) {
         setCurrentAlbum(albums[index]);
         index++;
         if (index == albums.length) {
             index = 0;
         }
     });
 };