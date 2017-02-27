function upload() {
    // convert canvas to base64 data URL for imgur upload
	// var c = document.getElementById(canvas);
 //    try {
 //        img = c.toDataURL('image/png', 0.9).split(',')[1];
 //    } catch(e) {
 //        img = c.toDataURL().split(',')[1];
 //    }



    // create form data to send to imgur
    var fd = new FormData();
    fd.append("image", img);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader('Authorization', 'Client-ID '+ 'dfc319b2246b0d7');
    xhr.onload = function() {
    	// win!
        photo_url = JSON.parse(xhr.responseText).data.link;
        post_to_facebook(FB_access_token, photo_url);
    }
    xhr.send(fd);
}

// Publish an image to Facebook:
function post_to_facebook(at, img_url, text) {
	FB.api("/me/photos", 'post',  {message: text, access_token: at, url: img_url}, function (response) {
		$('#uploading').html("Done!");
	});
}